import { useSelector } from "react-redux";
import EditableList from "./EditableList";

export default function QmlGenQuestions() {
  const questions = useSelector((state) => state.qmlGenerator.questions);
  console.log("questions", questions);
  return <EditableList items={questions} />;
}
