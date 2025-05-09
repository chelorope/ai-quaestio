import { useDispatch, useSelector } from "react-redux";
import SelectableCardList from "./SelectableCardList.tsx";
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

  return (
    <SelectableCardList
      items={questions}
      selected={dependencies}
      onSelect={handleSelectToggle}
      itemPrefix="Q"
    />
  );
}
