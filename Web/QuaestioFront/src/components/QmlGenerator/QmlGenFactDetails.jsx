import { useDispatch } from "react-redux";
import QmlGenDetails from "./QmlGenDetails";
import {
  updateFactDefault,
  updateFactGuidelines,
  updateFactMandatory,
} from "@/redux/qmlGeneratorSlice";

export default function QmlGenFactDetails({
  factId,
  guidelines,
  isMandatory,
  isDefault,
}) {
  console.log("isMandatory", isMandatory);
  const dispatch = useDispatch();
  const handleMandatoryChange = (value) => {
    console.log(value);
    dispatch(updateFactMandatory({ index: factId, value }));
  };
  const handleDefaultChange = (value) => {
    dispatch(updateFactDefault({ index: factId, value }));
  };
  const handleGuidelinesChange = (value) => {
    dispatch(updateFactGuidelines({ index: factId, value }));
  };
  return (
    <QmlGenDetails
      isMandatory={isMandatory}
      onMandatoryChange={handleMandatoryChange}
      isDefault={isDefault}
      onDefaultChange={handleDefaultChange}
      guidelines={guidelines}
      onGuidelinesChange={handleGuidelinesChange}
    />
  );
}
