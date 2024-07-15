import { createAsyncThunk } from "@reduxjs/toolkit";
import xmlBuilder from "xmlbuilder";

const idsFromKeys = (object) =>
  Object.keys(object)
    .filter((key) => object[key])
    .reduce((accum, item) => accum + ` #${item + 1}`, "")
    .trim();

export const exportQMLFile = createAsyncThunk(
  "qmlGenerator/exportQMLFile",
  async (_, { getState }) => {
    const questions = getState().questions;
    const facts = getState().facts;
    const XMLObj = {
      "qml:QML": {
        "@xmlns:qml": "http://www.processconfiguration.com/QML",
        "@author": "",
        "@name": "",
        "@reference": "",
      },
      Question: questions.map((question, index) => ({
        "@id": `q${index + 1}`,
        description: question.description,
        guidelines: question.guidelines,
        "@fullyDepends": idsFromKeys(question.fullyDepends),
        "@partiallyDepends": idsFromKeys(question.partiallyDepends),
        "@mapQF": idsFromKeys(question.facts),
      })),
      Fact: facts.map((fact, index) => ({
        "@id": `f${index + 1}`,
        description: fact.description,
        guidelines: fact.guidelines,
        mandatory: fact.mandatory,
        default: fact.default,
        "@fullyDepends": idsFromKeys(fact.fullyDepends),
        "@partiallyDepends": idsFromKeys(fact.partiallyDepends),
      })),
      Constraints: "",
    };
    const XMLString = xmlBuilder
      .create(XMLObj, { encoding: "utf-8" })
      .toString();
    console.log("XML: ", XMLString);
  }
);
