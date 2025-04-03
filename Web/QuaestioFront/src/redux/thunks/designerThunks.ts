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
import { Position } from "@xyflow/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deepClone } from "@/utils";

const getDependenciesFromStr = (dependencyStr = "") =>
  dependencyStr
    ? dependencyStr
        .split(" ")
        .map((item) => item.replace("#", "").toUpperCase())
    : [];

function findTopLevelOperator(
  expr: string,
  ops: string[]
): { index: number; op: string } | null {
  let level = 0;
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if (char === "(") level++;
    else if (char === ")") level--;
    if (level === 0) {
      for (const op of ops) {
        if (expr.substring(i, i + op.length) === op) {
          return { index: i, op };
        }
      }
    }
  }
  return null;
}

// Splits the expression by the provided delimiters at top level (ignoring those inside parentheses)
function splitTopLevel(expr: string, delimiters: string[]): string[] {
  const parts: string[] = [];
  let level = 0;
  let start = 0;
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if (char === "(") level++;
    else if (char === ")") level--;
    if (level === 0) {
      for (const delim of delimiters) {
        if (expr.substring(i, i + delim.length) === delim) {
          parts.push(expr.substring(start, i).trim());
          start = i + delim.length;
          i = start - 1;
          break;
        }
      }
    }
  }
  parts.push(expr.substring(start).trim());
  return parts;
}

function parseConstraintExpression(
  expr: string,
  factIndexMap: Record<string, number>
): object {
  expr = expr.trim();

  // Remove matching outer parentheses, if any.
  if (expr.startsWith("(") && expr.endsWith(")")) {
    let level = 0;
    let balanced = true;
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === "(") level++;
      else if (expr[i] === ")") level--;
      if (level === 0 && i < expr.length - 1) {
        balanced = false;
        break;
      }
    }
    if (balanced) {
      expr = expr.substring(1, expr.length - 1).trim();
    }
  }

  // Check for top-level binary operators: '=>' and '=' (order matters)
  const binaryOps = ["=>", "="];
  const opFound = findTopLevelOperator(expr, binaryOps);
  if (opFound) {
    const { index, op } = opFound;
    const left = expr.substring(0, index).trim();
    const right = expr.substring(index + op.length).trim();
    // Map to XMI operator attributes ("=" becomes IFF -> IFONLY, "=>" becomes THEN)
    const operatorMap: Record<string, string> = {
      "=": "IFONLY",
      "=>": "THEN",
    };
    return {
      "@xsi:type": "qml:Op",
      "@operator": operatorMap[op],
      expression: [
        parseConstraintExpression(left, factIndexMap),
        parseConstraintExpression(right, factIndexMap),
      ],
    };
  }

  // Handle unary NOT operator (e.g. "-f13" or "-(f9.-f7)")
  if (expr.startsWith("-")) {
    return {
      "@xsi:type": "qml:Op",
      "@operator": "NOT",
      expression: [parseConstraintExpression(expr.substring(1), factIndexMap)],
    };
  }

  // Check for function-like operators (xor( and nor()
  if (expr.startsWith("xor(") || expr.startsWith("nor(")) {
    const isXor = expr.startsWith("xor(");
    const operator = isXor ? "XOR" : "NOR";
    // Extract the inner argument string (assumes a trailing ")" exists)
    const inner = expr.substring(4, expr.length - 1).trim();
    // Split arguments by top-level comma or dot (both can separate arguments)
    const args = splitTopLevel(inner, [",", "."]);
    return {
      "@xsi:type": "qml:Op",
      "@operator": operator,
      expression: args.map((arg) =>
        parseConstraintExpression(arg, factIndexMap)
      ),
    };
  }

  // Look for operators '+' (OR) and '.' (AND)
  const infixOps = ["+", "."];
  const opFound2 = findTopLevelOperator(expr, infixOps);
  if (opFound2) {
    const { index, op } = opFound2;
    const left = expr.substring(0, index).trim();
    const right = expr.substring(index + op.length).trim();
    const operatorMap2: Record<string, string> = {
      "+": "OR",
      ".": "AND",
    };
    return {
      "@xsi:type": "qml:Op",
      "@operator": operatorMap2[op],
      expression: [
        parseConstraintExpression(left, factIndexMap),
        parseConstraintExpression(right, factIndexMap),
      ],
    };
  }

  // If no operator is found, assume it's a literal (e.g. "f1").
  if (/^f\d+/.test(expr)) {
    const index =
      factIndexMap[expr] !== undefined ? factIndexMap[expr] : expr.substring(1);
    return { "@xsi:type": "qml:Literal", "@references": `//@fact.${index}` };
  }

  // Fallback: return the token as a literal.
  return { "@xsi:type": "qml:Literal", "@references": expr };
}

// Helper function to extract dependency indices from a string.
// Expects a space-delimited string like "//@fact.0 //@fact.1" or "//@question.2"
const getIndicesFromXmiStr = (dependencyStr = "") =>
  dependencyStr
    .split(" ")
    .map((item) => {
      // Split on the dot to extract the index (e.g., "fact.0" => 0).
      const parts = item.split(".");
      return parts[1] ? Number(parts[1]) : null;
    })
    .filter((index) => index !== null);

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
    constraints = [],
  } = getState()?.designer || {};
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
      Constraints: `(${constraints.join(" . ")})`,
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

export const exportXMIFile = () => async (_, getState) => {
  // Extract state from Redux (with defaults)
  const {
    questions = [],
    facts = [],
    edges = [],
    fileDetails = {},
    constraints = [],
  } = getState()?.designer || {};

  // Build arrays with additional dependency properties
  const questionsArr = questions.map((q) => ({
    ...q.data,
    id: q.id,
    fullyDepends: "",
    partiallyDepends: "",
    facts: "",
  }));

  const factsArr = facts.map((f) => ({
    ...f.data,
    id: f.id,
    fullyDepends: "",
    partiallyDepends: "",
  }));

  // Create lookup maps so we can generate references based on order
  const questionIndexMap = questionsArr.reduce((acc, q, i) => {
    acc[q.id] = i;
    return acc;
  }, {} as Record<string, number>);

  const factIndexMap = factsArr.reduce((acc, f, i) => {
    acc[f.id] = i;
    return acc;
  }, {} as Record<string, number>);

  // Process each edge to update dependency properties
  edges.forEach((edge) => {
    const isSourceQuestion = edge.source.startsWith("Q");
    const isTargetQuestion = edge.target.startsWith("Q");

    if (isSourceQuestion && isTargetQuestion) {
      // Question-to-question dependency
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
      // Fact-to-fact dependency
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
      // Mapping from a question to a fact
      questionsArr[questionIndexMap[edge.source]].facts += ` //@fact.${
        factIndexMap[edge.target]
      }`;
    }
  });

  // Build the XML object following the XMI format
  const XMLObj = {
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
      question: questionsArr.map((q) => {
        // Build attributes for each question element.
        const attrs: Record<string, string> = {
          "@id": q.id.toLowerCase(),
          "@description": q.title,
          "@guidelines": q.guidelines,
          "@fact": q.facts.trim() || undefined,
        };
        if (q.partiallyDepends.trim()) {
          attrs["@pDepends"] = q.partiallyDepends.trim();
        }
        if (q.fullyDepends.trim()) {
          attrs["@fDepends"] = q.fullyDepends.trim();
        }
        return attrs;
      }),
      fact: factsArr.map((f) => {
        // Build attributes for each fact element.
        const attrs: Record<string, string> = {
          "@id": f.id.toLowerCase(),
          "@description": f.title,
        };
        if (f.guidelines) {
          attrs["@guidelines"] = f.guidelines;
        }
        if (f.default) {
          attrs["@default"] = f.default;
        }
        if (f.mandatory) {
          attrs["@mandatory"] = f.mandatory;
        }
        if (f.partiallyDepends && f.partiallyDepends.trim()) {
          attrs["@pDepends"] = f.partiallyDepends.trim();
        }
        if (f.fullyDepends && f.fullyDepends.trim()) {
          attrs["@fDepends"] = f.fullyDepends.trim();
        }
        return attrs;
      }),
      constraint: constraints.map((constraint) => ({
        "@expressionText": constraint,
        expression: parseConstraintExpression(constraint, factIndexMap),
      })),
    },
  };

  // Generate the XML string using an XML builder (e.g. xmlbuilder2)
  const XMLString = create(XMLObj as object, { encoding: "UTF-8" }).end({
    prettyPrint: true,
    allowEmptyTags: false,
  });

  // Export the file with a .xmi extension
  saveFile(`${fileDetails.name}.xmi`, XMLString);
};

export const loadQMLFile = (file: string) => async (dispatch) => {
  const doc = create(file);
  const xmlObject = doc.end({ format: "object" });
  const qmlObject = xmlObject["qml:QML"];
  const designerState = getInitialState(true);

  qmlObject.Fact.forEach((fact) => {
    const factId = fact["@id"]?.toUpperCase();

    designerState.facts.push({
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
      designerState.edges.push({
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
        designerState.edges.push({
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
    designerState.questions.push({
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
        designerState.edges.push({
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
        designerState.edges.push({
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
      designerState.edges.push({
        id: `${questionId}-${factId}`,
        sourceHandle: `${questionId}-right-source`,
        source: questionId,
        targetHandle: `${factId}-left-target`,
        target: factId,
      });

      const fact = designerState.facts.find((fact) => fact.id === factId);
      if (fact) {
        fact.parentId = questionId;
      }
    });
  });
  const constraints =
    typeof qmlObject.Constraints === "string" ? qmlObject.Constraints : "";
  designerState.constraints = constraints.replaceAll("&gt;", ">").split(".");
  designerState.fileDetails = {
    name: qmlObject["@name"],
    reference: qmlObject["@reference"],
    author: qmlObject["@author"],
  };

  dispatch(setState(designerState));
};

export const loadXMIFile = (file: string) => async (dispatch) => {
  console.log("LOAD XMI");
  const doc = create(file);
  const xmlObject = doc.end({ format: "object" });
  const qmlObject = xmlObject["qml:QML"];
  const designerState = getInitialState(true);
  console.log("XMI file loaded", qmlObject);
  // Normalize fact and question elements to arrays
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
    designerState.facts.push({
      id: factId,
      type: "fact",
      position: { x: 0, y: 0 },
      data: {
        title: fact["@description"],
        guidelines: fact["@guidelines"],
        mandatory: Boolean(fact["@mandatory"]),
        default: Boolean(fact["@default"]),
        targetHandles: [
          { id: `${factId}-top-target`, position: Position.Top },
          { id: `${factId}-left-target`, position: Position.Left },
        ],
        sourceHandles: [
          { id: `${factId}-bottom-source`, position: Position.Bottom },
        ],
      },
    });

    if (fact["@fDepends"]) {
      getIndicesFromXmiStr(fact["@fDepends"]).forEach((dependencyIndex) => {
        const dependencyId = factIdMapping[dependencyIndex];
        designerState.edges.push({
          id: `${dependencyId}-${factId}`,
          type: "dependency",
          sourceHandle: `${dependencyId}-bottom-source`,
          source: dependencyId,
          targetHandle: `${factId}-top-target`,
          target: factId,
          data: { type: "full" },
        });
      });
    }

    if (fact["@pDepends"]) {
      getIndicesFromXmiStr(fact["@pDepends"]).forEach((dependencyIndex) => {
        const dependencyId = factIdMapping[dependencyIndex];
        designerState.edges.push({
          id: `${dependencyId}-${factId}`,
          type: "dependency",
          sourceHandle: `${dependencyId}-bottom-source`,
          source: dependencyId,
          targetHandle: `${factId}-top-target`,
          target: factId,
          data: { type: "partial" },
        });
      });
    }
  });

  questionElements.forEach((question) => {
    const questionId = (question["@id"] as string).toUpperCase();
    designerState.questions.push({
      id: questionId,
      type: "question",
      position: { x: 0, y: 0 },
      data: {
        title: question["@description"],
        guidelines: question["@guidelines"],
        targetHandles: [
          { id: `${questionId}-top-target`, position: Position.Top },
        ],
        sourceHandles: [
          { id: `${questionId}-bottom-source`, position: Position.Bottom },
          { id: `${questionId}-right-source`, position: Position.Right },
        ],
      },
    });

    // Process "fact" attribute to create edges from question to fact.
    if (question["@fact"]) {
      getIndicesFromXmiStr(question["@fact"]).forEach((factIndex) => {
        const factId = factIdMapping[factIndex];
        designerState.edges.push({
          id: `${questionId}-${factId}`,
          sourceHandle: `${questionId}-right-source`,
          source: questionId,
          targetHandle: `${factId}-left-target`,
          target: factId,
        });
        // Set the fact's parentId to the question id.
        const factNode = designerState.facts.find((f) => f.id === factId);
        if (factNode) {
          factNode.parentId = questionId;
        }
      });
    }

    // Process question dependencies:
    // pDepends (assumed partial dependency)
    if (question["@pDepends"]) {
      getIndicesFromXmiStr(question["@pDepends"]).forEach((dependencyIndex) => {
        const dependencyId = questionIdMapping[dependencyIndex];
        designerState.edges.push({
          id: `${dependencyId}-${questionId}`,
          type: "dependency",
          sourceHandle: `${dependencyId}-bottom-source`,
          source: dependencyId,
          targetHandle: `${questionId}-top-target`,
          target: questionId,
          data: { type: "partial" },
        });
      });
    }
    // fDepends (assumed full dependency)
    if (question["@fDepends"]) {
      getIndicesFromXmiStr(question["@fDepends"]).forEach((dependencyIndex) => {
        const dependencyId = questionIdMapping[dependencyIndex];
        designerState.edges.push({
          id: `${dependencyId}-${questionId}`,
          type: "dependency",
          sourceHandle: `${dependencyId}-bottom-source`,
          source: dependencyId,
          targetHandle: `${questionId}-top-target`,
          target: questionId,
          data: { type: "full" },
        });
      });
    }
  });

  // Process constraints
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
  "flow/layout",
  async (direction: "DOWN" | "RIGHT", { dispatch, getState }) => {
    const state = getState();
    const questions = selectQuestions(state);
    const facts = selectFacts(state);
    const edges = selectEdges(state);
    const opts = { "elk.direction": direction };

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
