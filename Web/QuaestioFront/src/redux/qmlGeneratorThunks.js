import xmlBuilder from "xmlbuilder";

const idsFromKeys = (object, prefix = "q") =>
  Object.keys(object)
    .filter((key) => object[key])
    .reduce((accum, item) => accum + ` #${prefix}${Number(item) + 1}`, "")
    .trim();

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
  const questions = getState()?.qmlGenerator?.questions || [];
  const facts = getState()?.qmlGenerator?.facts || [];
  const fileDetails = getState()?.qmlGenerator?.fileDetails || {};
  const constraints = getState()?.qmlGenerator?.constraints || {};

  // Build XML object from state
  const XMLObj = {
    "qml:QML": {
      "@xmlns:qml": "http://www.processconfiguration.com/QML",
      "@author": fileDetails.author,
      "@name": fileDetails.name,
      "@reference": fileDetails.reference,
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
        "@fullyDepends": idsFromKeys(fact.fullyDepends, "f"),
        "@partiallyDepends": idsFromKeys(fact.partiallyDepends, "f"),
      })),
      Constraints: constraints,
    },
  };

  // Generate XML string from object
  const XMLString = xmlBuilder.create(XMLObj, { encoding: "utf-8" }).toString();

  // Export QML file
  saveFile(`${fileDetails.name}.qml`, XMLString);
};
