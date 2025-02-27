import { getLayoutedElements } from "@/lib/elk";
import { create } from "xmlbuilder2";
import {
  selectEdges,
  selectFacts,
  selectNodes,
  selectQuestions,
  setEdges,
  setFacts,
  setNodes,
  setQuestions,
} from "../slices/flowSlice";
// import { getInitialState, setState } from "../slices/flowSlice";

// const indexFromId = (str) => Number(str.match(/\d+/)[0]) - 1;
// const keysFromIds = (str) => str.split(" ").map((item) => indexFromId(item));
// const getDependenciesFromStr = (dependencyStr) =>
//   dependencyStr
//     ? keysFromIds(dependencyStr).reduce((accum, item) => {
//         accum[item] = true;
//         return accum;
//       }, {})
//     : {};

function saveFile(filename, data) {
  const blob = new Blob([data], { type: "text/csv" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

export const exportQMLFile = () => async (_, getState) => {
  const {
    questions = [],
    facts = [],
    edges = [],
    fileDetails = {},
    constraints = {},
  } = getState()?.flow || {};
  const questionsMap =
    questions.reduce(
      (accum, question) => ({
        ...accum,
        [question.id]: {
          ...question.data,
          fullyDepends: "",
          partiallyDepends: "",
          facts: "",
        },
      }),
      {}
    ) || {};
  const factsMap =
    facts.reduce(
      (accum, fact) => ({
        ...accum,
        [fact.id]: { ...fact.data, fullyDepends: "", partiallyDepends: "" },
      }),
      {}
    ) || {};

  edges.forEach((edge) => {
    const isSourceQuestion = edge.source.startsWith("Q");
    const isTargetQuestion = edge.target.startsWith("Q");

    if (isSourceQuestion && isTargetQuestion) {
      if (edge.data?.type === "partial") {
        questionsMap[
          edge.source
        ].partiallyDepends += ` #${edge.target.toLowerCase()}`;
      } else {
        questionsMap[
          edge.source
        ].fullyDepends += ` #${edge.target.toLowerCase()}`;
      }
    } else if (!isSourceQuestion && !isTargetQuestion) {
      if (edge.data?.type === "partial") {
        factsMap[
          edge.source
        ].partiallyDepends += ` #${edge.target.toLowerCase()}`;
      } else {
        factsMap[edge.source].fullyDepends += ` #${edge.target.toLowerCase()}`;
      }
    } else if (isSourceQuestion && !isTargetQuestion) {
      console.log("Questions Map", questionsMap, edge.source);
      questionsMap[edge.source].facts += ` #${edge.target.toLowerCase()}`;
    }
  });

  console.log("EXPORT: ", questions, facts, edges, fileDetails, constraints);

  // Build XML object from state
  const XMLObj = {
    "qml:QML": {
      "@xmlns:qml": "http://www.processconfiguration.com/QML",
      "@author": fileDetails.author,
      "@name": fileDetails.name,
      "@reference": fileDetails.reference,
      Question: Object.keys(questionsMap).map((key) => {
        const {
          description,
          guidelines,
          fullyDepends,
          partiallyDepends,
          facts,
        } = questionsMap[key];
        return {
          "@id": key.toLowerCase(),
          description: description,
          ...(!!guidelines && { guidelines: guidelines }),
          ...(!!fullyDepends?.length && {
            "@fullyDepends": fullyDepends.trim(),
          }),
          ...(!!partiallyDepends?.length && {
            "@partiallyDepends": partiallyDepends.trim(),
          }),
          ...(!!facts?.length && {
            "@mapQF": facts.trim(),
          }),
        };
      }),
      Fact: Object.keys(factsMap).map((key) => {
        const {
          description,
          guidelines,
          mandatory: isMandatory,
          default: isDefault,
          fullyDepends,
          partiallyDepends,
        } = factsMap[key];
        return {
          "@id": key.toLowerCase(),
          description: description,
          mandatory: isMandatory,
          default: isDefault,
          ...(!!guidelines && { guidelines: guidelines }),
          ...(!!fullyDepends?.length && {
            "@fullyDepends": fullyDepends.trim(),
          }),
          ...(!!partiallyDepends?.length && {
            "@partiallyDepends": partiallyDepends.trim(),
          }),
        };
      }),
      Constraints: `(${constraints})`,
    },
  };

  // Generate XML string from object
  const XMLString = create(XMLObj, { encoding: "UTF-8" }).end({
    prettyPrint: true,
    allowEmptyTags: false,
  });

  // Export QML file
  saveFile(`${fileDetails.name}.qml`, XMLString);
};

// export const loadQMLFile = (file) => async (dispatch) => {
//   const doc = create(file);
//   const xmlObject = doc.end({ format: "object" });
//   const qmlObject = xmlObject["qml:QML"];
//   const qmlEditorState = getInitialState();

//   qmlObject.Question.forEach((question) => {
//     qmlEditorState.questions[indexFromId(question["@id"])] = {
//       description: question.description,
//       guidelines: question.guidelines,
//       fullyDepends: getDependenciesFromStr(question["@fullyDepends"]),
//       partiallyDepends: getDependenciesFromStr(question["@partiallyDepends"]),
//       facts: getDependenciesFromStr(question["@mapQF"]),
//     };
//   });
//   qmlObject.Fact.forEach((fact) => {
//     qmlEditorState.facts[indexFromId(fact["@id"])] = {
//       description: fact.description,
//       guidelines: fact.guidelines,
//       mandatory: Boolean(fact.mandatory),
//       default: Boolean(fact.default),
//       fullyDepends: getDependenciesFromStr(fact["@fullyDepends"]),
//       partiallyDepends: getDependenciesFromStr(fact["@partiallyDepends"]),
//     };
//   });
//   qmlEditorState.constraints = qmlObject.Constraints;
//   qmlEditorState.fileDetails = {
//     name: qmlObject["@name"],
//     reference: qmlObject["@reference"],
//     author: qmlObject["@author"],
//   };
//   dispatch(setState(qmlEditorState));
// };

export const flowLayout =
  (direction: "DOWN" | "RIGHT") => (dispatch, getState) => {
    const state = getState();
    const questions = selectQuestions(state);
    const facts = selectFacts(state);
    const edges = selectEdges(state);
    const opts = { "elk.direction": direction };
    console.log("FLOW LAYOUT", questions, facts, edges, opts);

    const clonedQuestions = JSON.parse(JSON.stringify(questions));
    const clonedFacts = JSON.parse(JSON.stringify(facts));
    const clonedEdges = JSON.parse(JSON.stringify(edges));

    getLayoutedElements(clonedQuestions, clonedFacts, clonedEdges, opts).then(
      ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        console.log("LAYOUTED", layoutedNodes, layoutedEdges);
        dispatch(setNodes(layoutedNodes));
        dispatch(setEdges(layoutedEdges));

        // window.requestAnimationFrame(() => fitView());
      }
    );
  };
