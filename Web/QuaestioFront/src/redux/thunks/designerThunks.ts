import { getLayoutedElements } from "@/lib/elk";
import { create } from "xmlbuilder2";
import {
  centerView,
  getInitialState,
  selectEdges,
  selectFacts,
  selectQuestions,
  setEdges,
  setNodes,
  setState,
} from "../slices/designerSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deepClone } from "@/utils";
import {
  createXMLString,
  getDependenciesFromStr,
  getIndicesFromXmiStr,
  parseConstraintExpression,
  replaceScapedCharacters,
  saveFile,
  splitTopLevel,
} from "@/utils/xmlUtils";
import {
  createDependencyEdge,
  createFactNode,
  createQuestionFactEdge,
  createQuestionNode,
} from "@/utils/designerUtils";
import {
  DesignerState,
  QMLObject,
  XMIObject,
  XMIQuestion,
  XMIFact,
} from "@/types/designer/DesignerTypes";
import { RootState } from "../store";
import { DEPENDENCY_TYPES } from "@/constants/designerConstants";

export const exportQMLFile =
  () => async (_: unknown, getState: () => { designer: DesignerState }) => {
    const {
      questions = [],
      facts = [],
      edges = [],
      fileDetails = {} as { name: string; reference?: string; author?: string },
      constraints = [],
    } = getState()?.designer || {};
    const questionsMap =
      questions.reduce(
        (accum, question) => ({
          ...accum,
          [question.id]: {
            title: question.data.title,
            guidelines: question.data.guidelines,
            fullyDepends: "",
            partiallyDepends: "",
            facts: "",
          },
        }),
        {} as Record<
          string,
          {
            title: string;
            guidelines?: string;
            fullyDepends: string;
            partiallyDepends: string;
            facts: string;
          }
        >
      ) || {};
    const factsMap =
      facts.reduce(
        (accum, fact) => ({
          ...accum,
          [fact.id]: {
            title: fact.data.title,
            guidelines: fact.data.guidelines,
            mandatory: fact.data.mandatory,
            default: fact.data.default,
            fullyDepends: "",
            partiallyDepends: "",
          },
        }),
        {} as Record<
          string,
          {
            title: string;
            guidelines?: string;
            mandatory: boolean;
            default: boolean;
            fullyDepends: string;
            partiallyDepends: string;
          }
        >
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
          factsMap[
            edge.source
          ].fullyDepends += ` #${edge.target.toLowerCase()}`;
        }
      } else if (isSourceQuestion && !isTargetQuestion) {
        questionsMap[edge.source].facts += ` #${edge.target.toLowerCase()}`;
      }
    });

    const XMLObj: QMLObject = {
      "qml:QML": {
        "@xmlns:qml": "http://www.processconfiguration.com/QML",
        "@author": fileDetails.author,
        "@name": fileDetails.name,
        "@reference": fileDetails.reference,
        Question: Object.keys(questionsMap).map((key) => {
          const { title, guidelines, fullyDepends, partiallyDepends, facts } =
            questionsMap[key];
          return {
            "@id": key.toLowerCase(),
            description: title,
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
            title,
            guidelines,
            mandatory: isMandatory,
            default: isDefault,
            fullyDepends,
            partiallyDepends,
          } = factsMap[key];
          return {
            "@id": key.toLowerCase(),
            description: title,
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
        Constraints: constraints.join(" . "),
      },
    };

    const XMLString = replaceScapedCharacters(createXMLString(XMLObj));
    saveFile(`${fileDetails.name}.qml`, XMLString);
  };

export const exportXMIFile =
  () => async (_: unknown, getState: () => { designer: DesignerState }) => {
    const {
      questions = [],
      facts = [],
      edges = [],
      fileDetails = {} as { name: string; reference?: string; author?: string },
      constraints = [],
    } = getState()?.designer || {};

    const questionsArr = questions.map((q, i) => ({
      ...q.data,
      id: `q${i}`,
      fullyDepends: "",
      partiallyDepends: "",
      facts: "",
    }));

    const factsArr = facts.map((f, i) => ({
      ...f.data,
      id: `f${i}`,
      fullyDepends: "",
      partiallyDepends: "",
    }));

    const questionIndexMap = questions.reduce(
      (acc, q, i) => ({
        ...acc,
        [q.id]: i,
      }),
      {} as Record<string, number>
    );

    const factIndexMap = facts.reduce((acc, f, i) => {
      return {
        ...acc,
        [f.id]: i,
      };
    }, {} as Record<string, number>);

    edges.forEach((edge) => {
      const isSourceQuestion = edge.source.startsWith("Q");
      const isTargetQuestion = edge.target.startsWith("Q");

      if (isSourceQuestion && isTargetQuestion) {
        if (edge.data?.type === "partial") {
          questionsArr[
            questionIndexMap[edge.target]
          ].partiallyDepends += ` //@question.${questionIndexMap[edge.source]}`;
        } else {
          questionsArr[
            questionIndexMap[edge.target]
          ].fullyDepends += ` //@question.${questionIndexMap[edge.source]}`;
        }
      } else if (!isSourceQuestion && !isTargetQuestion) {
        if (edge.data?.type === "partial") {
          factsArr[factIndexMap[edge.target]].partiallyDepends += ` //@fact.${
            factIndexMap[edge.source]
          }`;
        } else {
          factsArr[factIndexMap[edge.target]].fullyDepends += ` //@fact.${
            factIndexMap[edge.source]
          }`;
        }
      } else if (isSourceQuestion && !isTargetQuestion) {
        questionsArr[questionIndexMap[edge.source]].facts += ` //@fact.${
          factIndexMap[edge.target]
        }`;
      }
    });

    let positionalConstraints = constraints;
    facts.forEach((fact, fidx) => {
      positionalConstraints = positionalConstraints.map((constraint) =>
        constraint.replaceAll(
          new RegExp(`${fact.id.toLowerCase()}([^0-9])`, "g"),
          `f${fidx}$1`
        )
      );
    });

    const XMLObj: XMIObject = {
      "qml:QML": {
        "@xmi:version": "2.0",
        "@xmlns:xmi": "http://www.omg.org/XMI",
        "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "@xmlns:qml": "http://www.example.org/qml",
        "@xsi:schemaLocation":
          "http://www.example.org/qml ../metamodel/qml.ecore",
        "@name": fileDetails.name,
        "@author": fileDetails.author,
        "@reference": fileDetails.reference,
        question: questionsArr.map((q) => ({
          "@id": q.id.toLowerCase(),
          "@description": q.title,
          "@guidelines": q.guidelines || "",
          "@fact": q.facts.trim() || "",
          ...(q.partiallyDepends.trim() && {
            "@pDepends": q.partiallyDepends.trim(),
          }),
          ...(q.fullyDepends.trim() && { "@fDepends": q.fullyDepends.trim() }),
        })) as XMIQuestion[],
        fact: factsArr.map((f) => ({
          "@id": f.id.toLowerCase(),
          "@description": f.title,
          ...(f.guidelines && { "@guidelines": f.guidelines }),
          ...(f.default && { "@default": f.default }),
          ...(f.mandatory && { "@mandatory": f.mandatory }),
          ...(f.partiallyDepends &&
            f.partiallyDepends.trim() && {
              "@pDepends": f.partiallyDepends.trim(),
            }),
          ...(f.fullyDepends &&
            f.fullyDepends.trim() && { "@fDepends": f.fullyDepends.trim() }),
        })) as XMIFact[],
        constraint: positionalConstraints.map((constraint) => ({
          "@expressionText": constraint,
          expression: parseConstraintExpression(constraint, factIndexMap),
        })),
      },
    };

    const XMLString = replaceScapedCharacters(createXMLString(XMLObj));
    saveFile(`${fileDetails.name}.xmi`, XMLString);
  };

export const loadQMLFile =
  (file: string) => async (dispatch: (action: unknown) => void) => {
    const doc = create(file);
    const xmlObject = doc.end({ format: "object" }) as unknown as QMLObject;
    const qmlObject = xmlObject["qml:QML"];
    const designerState = getInitialState(true);

    qmlObject.Fact.forEach((fact) => {
      const factId = fact["@id"]?.toUpperCase();
      designerState.facts.push(
        createFactNode(
          factId,
          fact.description,
          fact.guidelines,
          Boolean(fact.mandatory),
          Boolean(fact.default)
        )
      );

      getDependenciesFromStr(fact["@fullyDepends"]).forEach((dependencyId) => {
        designerState.edges.push(
          createDependencyEdge(dependencyId, factId, DEPENDENCY_TYPES.FULL)
        );
      });

      getDependenciesFromStr(fact["@partiallyDepends"]).forEach(
        (dependencyId) => {
          designerState.edges.push(
            createDependencyEdge(dependencyId, factId, DEPENDENCY_TYPES.PARTIAL)
          );
        }
      );
    });

    qmlObject.Question.forEach((question) => {
      const questionId = question["@id"]?.toUpperCase();
      designerState.questions.push(
        createQuestionNode(
          questionId,
          question.description,
          question.guidelines
        )
      );

      getDependenciesFromStr(question["@fullyDepends"]).forEach(
        (dependencyId) => {
          designerState.edges.push(
            createDependencyEdge(
              dependencyId,
              questionId,
              DEPENDENCY_TYPES.FULL
            )
          );
        }
      );

      getDependenciesFromStr(question["@partiallyDepends"]).forEach(
        (dependencyId) => {
          designerState.edges.push(
            createDependencyEdge(
              dependencyId,
              questionId,
              DEPENDENCY_TYPES.PARTIAL
            )
          );
        }
      );

      getDependenciesFromStr(question["@mapQF"]).forEach((factId) => {
        designerState.edges.push(createQuestionFactEdge(questionId, factId));

        const fact = designerState.facts.find((fact) => fact.id === factId);
        if (fact) {
          fact.parentId = questionId;
        }
      });
    });

    const constraints =
      typeof qmlObject.Constraints === "string" ? qmlObject.Constraints : "";
    designerState.constraints = splitTopLevel(
      replaceScapedCharacters(constraints),
      ["."]
    );
    designerState.fileDetails = {
      name: qmlObject["@name"],
      reference: qmlObject["@reference"],
      author: qmlObject["@author"],
    };

    dispatch(setState(designerState));
  };

export const loadXMIFile =
  (file: string) => async (dispatch: (action: unknown) => void) => {
    const doc = create(file);
    const xmlObject = doc.end({ format: "object" }) as unknown as XMIObject;
    const qmlObject = xmlObject["qml:QML"];
    const designerState = getInitialState(true);

    const factElements = Array.isArray(qmlObject.fact)
      ? qmlObject.fact
      : [qmlObject.fact];
    const questionElements = Array.isArray(qmlObject.question)
      ? qmlObject.question
      : [qmlObject.question];

    const factIdMapping = factElements.map((fact) =>
      ((fact["@id"] || fact.id) as string).toUpperCase()
    );
    const questionIdMapping = questionElements.map((question) =>
      ((question["@id"] || question.id) as string).toUpperCase()
    );

    factElements.forEach((fact) => {
      const factId = (fact["@id"] as string).toUpperCase();
      designerState.facts.push(
        createFactNode(
          factId,
          fact["@description"],
          fact["@guidelines"],
          Boolean(fact["@mandatory"]),
          Boolean(fact["@default"])
        )
      );

      if (fact["@fDepends"]) {
        getIndicesFromXmiStr(fact["@fDepends"]).forEach((dependencyIndex) => {
          const dependencyId = factIdMapping[dependencyIndex];
          designerState.edges.push(
            createDependencyEdge(dependencyId, factId, DEPENDENCY_TYPES.FULL)
          );
        });
      }

      if (fact["@pDepends"]) {
        getIndicesFromXmiStr(fact["@pDepends"]).forEach((dependencyIndex) => {
          const dependencyId = factIdMapping[dependencyIndex];
          designerState.edges.push(
            createDependencyEdge(dependencyId, factId, DEPENDENCY_TYPES.PARTIAL)
          );
        });
      }
    });

    questionElements.forEach((question) => {
      const questionId = (question["@id"] as string).toUpperCase();
      designerState.questions.push(
        createQuestionNode(
          questionId,
          question["@description"],
          question["@guidelines"]
        )
      );

      if (question["@fact"]) {
        getIndicesFromXmiStr(question["@fact"]).forEach((factIndex) => {
          const factId = factIdMapping[factIndex];
          designerState.edges.push(createQuestionFactEdge(questionId, factId));
          const factNode = designerState.facts.find((f) => f.id === factId);
          if (factNode) {
            factNode.parentId = questionId;
          }
        });
      }

      if (question["@pDepends"]) {
        getIndicesFromXmiStr(question["@pDepends"]).forEach(
          (dependencyIndex) => {
            const dependencyId = questionIdMapping[dependencyIndex];
            designerState.edges.push(
              createDependencyEdge(
                dependencyId,
                questionId,
                DEPENDENCY_TYPES.PARTIAL
              )
            );
          }
        );
      }
      if (question["@fDepends"]) {
        getIndicesFromXmiStr(question["@fDepends"]).forEach(
          (dependencyIndex) => {
            const dependencyId = questionIdMapping[dependencyIndex];
            designerState.edges.push(
              createDependencyEdge(
                dependencyId,
                questionId,
                DEPENDENCY_TYPES.FULL
              )
            );
          }
        );
      }
    });

    if (qmlObject.constraint) {
      const constraintsArray = Array.isArray(qmlObject.constraint)
        ? qmlObject.constraint
        : [qmlObject.constraint];
      designerState.constraints = constraintsArray.map(
        (constraint) =>
          constraint["@expressionText"]?.replaceAll("&gt;", ">") || ""
      );
    }

    designerState.fileDetails = {
      name: qmlObject["@name"] as string,
      reference: qmlObject["@reference"] as string,
      author: qmlObject["@author"] as string,
    };

    dispatch(setState(designerState));
  };

export const flowLayout = createAsyncThunk(
  "designer/flowLayout",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const questions = selectQuestions(state);
    const facts = selectFacts(state);
    const edges = selectEdges(state);
    const opts = { "elk.direction": "DOWN" };

    const clonedQuestions = deepClone(questions);
    const clonedFacts = deepClone(facts);
    const clonedEdges = deepClone(edges);

    const graph = await getLayoutedElements(
      clonedQuestions,
      clonedFacts,
      clonedEdges,
      opts
    );

    if (!graph) return;
    dispatch(setNodes(graph.nodes));
    dispatch(setEdges(graph.edges));
    dispatch(centerView());
  }
);
