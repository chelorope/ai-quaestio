import { create } from "xmlbuilder2";

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
      Question: questions.map(
        (
          { description, guidelines, fullyDepends, partiallyDepends, facts },
          index
        ) => ({
          "@id": `q${index + 1}`,
          description: description,
          ...(!!guidelines && { guidelines: guidelines }),
          ...(!!Object.keys(fullyDepends)?.length && {
            "@fullyDepends": idsFromKeys(fullyDepends),
          }),
          ...(!!Object.keys(partiallyDepends)?.length && {
            "@partiallyDepends": idsFromKeys(partiallyDepends),
          }),
          ...(!!Object.keys(facts)?.length && {
            "@mapQF": idsFromKeys(facts, "f"),
          }),
        })
      ),
      Fact: facts.map(
        (
          {
            description,
            guidelines,
            mandatory,
            default: isDefault,
            fullyDepends,
            partiallyDepends,
          },
          index
        ) => ({
          "@id": `f${index + 1}`,
          description: description,
          mandatory: mandatory,
          default: isDefault,
          ...(!!guidelines && { guidelines: guidelines }),
          ...(!!Object.keys(fullyDepends)?.length && {
            "@fullyDepends": idsFromKeys(fullyDepends, "f"),
          }),
          ...(!!Object.keys(partiallyDepends)?.length && {
            "@partiallyDepends": idsFromKeys(partiallyDepends, "f"),
          }),
        })
      ),
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
