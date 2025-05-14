export const BINARY_OPERATORS: string[] = ["=>", "=", "+", "."];
export const OPERATOR_MAP: Record<string, string> = {
  "=": "IFONLY",
  "=>": "THEN",
  "+": "OR",
  ".": "AND",
};

export const FUNCTION_OPERATORS: Record<string, string> = {
  xor: "XOR",
  nor: "NOR",
};

export const LITERAL_REGEX = /^f\d+/;
