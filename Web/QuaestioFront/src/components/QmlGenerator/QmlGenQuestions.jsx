import { useDispatch, useSelector } from "react-redux";
import EditableList from "./EditableList";
import {
  addQuestion,
  removeQuestion,
  selectQuestionDescriptions,
  selectQuestions,
  setSelectedQuestion,
  updateQuestionDescription,
} from "@/redux/slices/qmlGeneratorSlice";

export default function QmlGenQuestions() {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
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

  const handleItemRemove = (index) => {
    dispatch(removeQuestion(index));
  };

  return (
    <EditableList
      items={questions}
      itemPrefix="Q"
      selected={selectedQuestion}
      onItemChange={handleItemChange}
      onItemSelect={handleItemSelect}
      onItemAdd={handleItemAdd}
      onItemRemove={handleItemRemove}
    />
  );
}
