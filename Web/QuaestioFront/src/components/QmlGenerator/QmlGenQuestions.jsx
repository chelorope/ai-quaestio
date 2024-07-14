import { useDispatch, useSelector } from "react-redux";
import EditableList from "./EditableList";
import {
  addQuestion,
  setSelectedQuestion,
  updateQuestionDescription,
} from "@/redux/qmlGeneratorSlice";

export default function QmlGenQuestions() {
  const dispatch = useDispatch();
  const questions = useSelector((state) =>
    state.qmlGenerator.questions.map((question) => question.description)
  );
  const selectedQuestion = useSelector(
    (state) => state.qmlGenerator.selectedQuestion
  );

  const handleItemChange = (value, index) => {
    dispatch(updateQuestionDescription({ value, index }));
  };

  const handleItemSelect = (index) => {
    dispatch(setSelectedQuestion(index));
  };

  const handleItemAdd = () => {
    dispatch(addQuestion());
  };
  return (
    <EditableList
      items={questions}
      itemPrefix="Q"
      selected={selectedQuestion}
      onItemChange={handleItemChange}
      onItemSelect={handleItemSelect}
      onItemAdd={handleItemAdd}
    />
  );
}
