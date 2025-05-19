export interface XMLQuestion {
  "@id": string;
  description: string;
  guidelines?: string;
  "@fullyDepends"?: string;
  "@partiallyDepends"?: string;
  "@mapQF"?: string;
}

export interface XMLFact {
  "@id": string;
  description: string;
  guidelines?: string;
  mandatory?: boolean;
  default?: boolean;
  "@fullyDepends"?: string;
  "@partiallyDepends"?: string;
}

export interface QMLObject {
  "qml:QML": {
    "@xmlns:qml": string;
    "@author"?: string;
    "@name": string;
    "@reference"?: string;
    Question: XMLQuestion[];
    Fact: XMLFact[];
    Constraints: string;
  };
}

export interface XMIQuestion {
  "@id": string;
  "@description": string;
  "@guidelines"?: string;
  "@fact"?: string;
  "@pDepends"?: string;
  "@fDepends"?: string;
  id?: string;
}

export interface XMIFact {
  "@id": string;
  "@description": string;
  "@guidelines"?: string;
  "@default"?: boolean;
  "@mandatory"?: boolean;
  "@pDepends"?: string;
  "@fDepends"?: string;
  id?: string;
}

export interface XMIConstraint {
  "@expressionText": string;
  expression: object;
}

export interface XMIObject {
  "qml:QML": {
    "@xmi:version": string;
    "@xmlns:xmi": string;
    "@xmlns:xsi": string;
    "@xmlns:qml": string;
    "@xsi:schemaLocation": string;
    "@name": string;
    "@author"?: string;
    "@reference"?: string;
    question: XMIQuestion[];
    fact: XMIFact[];
    constraint: XMIConstraint[];
  };
}
