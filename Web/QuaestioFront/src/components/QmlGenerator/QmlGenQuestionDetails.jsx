import { useDispatch } from "react-redux";
import QmlGenDetails from "./QmlGenDetails";
import { updateQuestionGuidelines } from "@/redux/slices/qmlGeneratorSlice";

export default function QmlGenQuestionDetails({ questionId, guidelines }) {
  const dispatch = useDispatch();
  const handleGuidelinesChange = (value) => {
    dispatch(updateQuestionGuidelines({ index: questionId, value }));
  };
  return (
    <QmlGenDetails
      guidelines={guidelines}
      onGuidelinesChange={handleGuidelinesChange}
    />
  );
}
