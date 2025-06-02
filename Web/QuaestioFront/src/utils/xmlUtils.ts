import { convert, create } from "xmlbuilder2";
import {
  BINARY_OPERATORS,
  OPERATOR_MAP,
  FUNCTION_OPERATORS,
  LITERAL_REGEX,
} from "./xmlConstants";
import { XMLSerializedAsObject } from "xmlbuilder2/lib/interfaces";

interface DCLNode extends XMLSerializedAsObject {
  "@name": string;
  "@author": string;
  "@reference": string;
  Fact: Array<{
    "@id": string;
    description: string;
    value: string;
    deviates: string;
  }>;
}

interface DCLObject extends XMLSerializedAsObject {
  "ns2:DCL": DCLNode;
}

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

export const dclToXmi = (dcl: string) => {
  const obj = convert(dcl, { format: "object" }) as DCLObject;

  const dclNode = obj["ns2:DCL"];
  const facts = Array.isArray(dclNode.Fact) ? dclNode.Fact : [dclNode.Fact];

  facts.sort(
    (a, b) => parseInt(a["@id"].slice(1), 10) - parseInt(b["@id"].slice(1), 10)
  );

  const toggle = new Set(["f14", "f16", "f18"]);
  for (const f of facts) {
    if (f["@id"] === "f14") f.description = "Supplier";
    if (toggle.has(f["@id"]))
      f.deviates = f.deviates === "true" ? "false" : "true";
  }

  const root = create({ version: "1.0", encoding: "UTF-8" }).ele("dcl:DCL", {
    "xmi:version": "2.0",
    "xmlns:xmi": "http://www.omg.org/XMI",
    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
    "xmlns:dcl": "http://www.example.org/dcl",
    "xsi:schemaLocation": "http://www.example.org/dcl ../metamodel/dcl.ecore",
    name: dclNode["@name"],
    author: dclNode["@author"],
    reference: dclNode["@reference"],
  });

  for (const f of facts) {
    root
      .ele("fact", {
        id: f["@id"],
        description: f.description,
        value: f.value,
        deviates: f.deviates,
      })
      .up();
  }

  const outputXml = root.end({ prettyPrint: true });
  return outputXml;
};
