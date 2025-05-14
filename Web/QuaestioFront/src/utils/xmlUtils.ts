import { create } from "xmlbuilder2";
import {
  BINARY_OPERATORS,
  OPERATOR_MAP,
  FUNCTION_OPERATORS,
  LITERAL_REGEX,
} from "./xmlConstants";

export const replaceScapedCharacters = (str: string) =>
  str
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
    .replaceAll("&apos;", "'");

export const getDependenciesFromStr = (dependencyStr = "") =>
  dependencyStr
    ? dependencyStr
        .split(" ")
        .map((item) => item.replace("#", "").toUpperCase())
    : [];

export const getIndicesFromXmiStr = (dependencyStr = "") =>
  dependencyStr
    .split(" ")
    .map((item) => {
      const parts = item.split(".");
      return parts[1] ? Number(parts[1]) : null;
    })
    .filter((index) => index !== null);

export function findTopLevelOperator(
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

export function splitTopLevel(expr: string, delimiters: string[]): string[] {
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

export function parseConstraintExpression(
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

  // Check for top-level binary operators
  const opFound = findTopLevelOperator(expr, BINARY_OPERATORS);
  if (opFound) {
    const { index, op } = opFound;
    const left = expr.substring(0, index).trim();
    const right = expr.substring(index + op.length).trim();
    return {
      "@xsi:type": "qml:Op",
      "@operator": OPERATOR_MAP[op],
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

  // Handle function-like operators (xor, nor)
  for (const [fnName, fnOperator] of Object.entries(FUNCTION_OPERATORS)) {
    if (expr.startsWith(`${fnName}(`)) {
      const inner = expr.substring(fnName.length + 1, expr.length - 1).trim();
      const args = splitTopLevel(inner, [",", "."]);
      return {
        "@xsi:type": "qml:Op",
        "@operator": fnOperator,
        expression: args.map((arg) =>
          parseConstraintExpression(arg, factIndexMap)
        ),
      };
    }
  }

  // If no operator is found, assume it's a literal (e.g. "f1").
  if (LITERAL_REGEX.test(expr)) {
    const index =
      factIndexMap[expr] !== undefined ? factIndexMap[expr] : expr.substring(1);
    return { "@xsi:type": "qml:Literal", "@references": `//@fact.${index}` };
  }

  // Fallback: return the token as a literal.
  return { "@xsi:type": "qml:Literal", "@references": expr };
}

export const saveFile = (filename: string, data: string) => {
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
};

export const createXMLString = (obj: object) => {
  return create(obj, { encoding: "UTF-8" }).end({
    prettyPrint: true,
    allowEmptyTags: false,
  });
};
