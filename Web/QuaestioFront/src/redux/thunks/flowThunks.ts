import { getLayoutedElements } from "@/lib/elk";
import { create } from "xmlbuilder2";
import {
  getInitialState,
  selectEdges,
  selectFacts,
  selectQuestions,
  setEdges,
  setFacts,
  setQuestions,
  setState,
} from "../slices/flowSlice";
import { Position } from "@xyflow/react";

const getDependenciesFromStr = (dependencyStr = "") =>
  dependencyStr
    ? dependencyStr
        .split(" ")
        .map((item) => item.replace("#", "").toUpperCase())
    : [];

function saveFile(filename, data) {
  const blob = new Blob([data], { type: "text/csv" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob?.(blob, filename);
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
  const XMLString = create(XMLObj as object, { encoding: "UTF-8" }).end({
    prettyPrint: true,
    allowEmptyTags: false,
  });

  // Export QML file
  saveFile(`${fileDetails.name}.qml`, XMLString);
};

export const loadQMLFile = (file) => async (dispatch) => {
  const doc = create(file);
  const xmlObject = doc.end({ format: "object" });
  const qmlObject = xmlObject["qml:QML"];
  const qmlEditorState = getInitialState();

  qmlObject.Fact.forEach((fact) => {
    const factId = fact["@id"]?.toUpperCase();

    qmlEditorState.facts.push({
      id: factId,
      type: "fact",
      position: { x: 0, y: 0 },
      data: {
        title: fact.description,
        guidelines: fact.guidelines,
        mandatory: Boolean(fact.mandatory),
        default: Boolean(fact.default),
        targetHandles: [
          { id: `${factId}-top-target`, position: Position.Top },
          { id: `${factId}-left-target`, position: Position.Left },
        ],
        sourceHandles: [
          { id: `${factId}-bottom-source`, position: Position.Bottom },
        ],
      },
    });

    getDependenciesFromStr(fact["@fullyDepends"]).forEach((dependencyId) => {
      qmlEditorState.edges.push({
        id: `${dependencyId}-${factId}`,
        type: "dependency",
        sourceHandle: `${dependencyId}-bottom-source`,
        source: dependencyId,
        targetHandle: `${factId}-top-target`,
        target: factId,
        data: { type: "full" },
      });
    });

    getDependenciesFromStr(fact["@partiallyDepends"]).forEach(
      (dependencyId) => {
        qmlEditorState.edges.push({
          id: `${dependencyId}-${factId}`,
          type: "dependency",
          sourceHandle: `${dependencyId}-bottom-source`,
          source: dependencyId,
          targetHandle: `${factId}-top-target`,
          target: factId,
          data: { type: "partial" },
        });
      }
    );
  });

  qmlObject.Question.forEach((question) => {
    const questionId = question["@id"]?.toUpperCase();
    qmlEditorState.questions.push({
      id: questionId,
      type: "question",
      position: { x: 0, y: 0 },
      data: {
        title: question.description,
        guidelines: question.guidelines,
        targetHandles: [
          { id: `${questionId}-top-target`, position: Position.Top },
        ],
        sourceHandles: [
          { id: `${questionId}-bottom-source`, position: Position.Bottom },
          { id: `${questionId}-right-source`, position: Position.Right },
        ],
      },
    });

    getDependenciesFromStr(question["@fullyDepends"]).forEach(
      (dependencyId) => {
        qmlEditorState.edges.push({
          id: `${dependencyId}-${questionId}`,
          type: "dependency",
          sourceHandle: `${dependencyId}-bottom-source`,
          source: dependencyId,
          targetHandle: `${questionId}-top-target`,
          target: questionId,
          data: { type: "full" },
        });
      }
    );

    getDependenciesFromStr(question["@partiallyDepends"]).forEach(
      (dependencyId) => {
        qmlEditorState.edges.push({
          id: `${dependencyId}-${questionId}`,
          type: "dependency",
          sourceHandle: `${dependencyId}-bottom-source`,
          source: dependencyId,
          targetHandle: `${questionId}-top-target`,
          target: questionId,
          data: { type: "partial" },
        });
      }
    );

    getDependenciesFromStr(question["@mapQF"]).forEach((factId) => {
      qmlEditorState.edges.push({
        id: `${questionId}-${factId}`,
        sourceHandle: `${questionId}-right-source`,
        source: questionId,
        targetHandle: `${factId}-left-target`,
        target: factId,
      });

      const fact = qmlEditorState.facts.find((fact) => fact.id === factId);
      if (fact) {
        fact.parentId = questionId;
      }
    });
  });

  qmlEditorState.constraints = qmlObject.Constraints;
  qmlEditorState.fileDetails = {
    name: qmlObject["@name"],
    reference: qmlObject["@reference"],
    author: qmlObject["@author"],
  };

  console.log("LOAD: ", qmlEditorState);
  dispatch(setState(qmlEditorState));
};

export const flowLayout =
  (direction: "DOWN" | "RIGHT") => (dispatch, getState) => {
    const state = getState();
    const questions = selectQuestions(state);
    const facts = selectFacts(state);
    const edges = selectEdges(state);
    const opts = { "elk.direction": direction };

    const clonedQuestions = JSON.parse(JSON.stringify(questions));
    const clonedFacts = JSON.parse(JSON.stringify(facts));
    const clonedEdges = JSON.parse(JSON.stringify(edges));

    getLayoutedElements(clonedQuestions, clonedFacts, clonedEdges, opts).then(
      (graph) => {
        if (!graph) return;
        dispatch(setQuestions(graph.questions));
        dispatch(setFacts(graph.facts));
        dispatch(setEdges(graph.edges));

        // window.requestAnimationFrame(() => fitView());
      }
    );
  };
