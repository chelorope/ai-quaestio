import { useDispatch, useSelector } from "react-redux";
import SelectableCardList from "./SelectableCardList";
import {
  selectRestQuestions,
  selectQuestionDependencies,
  updateQuestionDependency,
} from "@/redux/slices/qmlGeneratorSlice";

export default function QmlGenQuestionDependency({
  questionId,
  type = "partially",
}) {
  const dispatch = useDispatch();
  const dependencies = useSelector((state) =>
    selectQuestionDependencies(state, questionId, type)
  );
  const questions = useSelector((state) =>
    selectRestQuestions(state, questionId)
  );
  const handleSelectToggle = (factId) => {
    dispatch(
      updateQuestionDependency({
        index: questionId,
        value: factId,
        type,
      })
    );
  };
  type === "partially" && console.log("QUESTIONS", questions, dependencies);
  return (
    <SelectableCardList
      items={questions}
      selected={dependencies}
      onSelect={handleSelectToggle}
      itemPrefix="Q"
    />
  );
}
