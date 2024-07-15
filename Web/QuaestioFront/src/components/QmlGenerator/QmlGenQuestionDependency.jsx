import { useDispatch, useSelector } from "react-redux";
import SelectableCardList from "./SelectableCardList";
import { updateQuestionDependency } from "@/redux/qmlGeneratorSlice";

export default function QmlGenQuestionDependency({
  questionId,
  type = "partially",
}) {
  const dispatch = useDispatch();
  const dependencies = useSelector((state) =>
    type === "partially"
      ? state.qmlGenerator.questions[questionId].partiallyDepends
      : state.qmlGenerator.questions[questionId].fullyDepends
  );
  const questions = useSelector((state) =>
    state.qmlGenerator.questions.filter((_, index) => index < questionId)
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
  console.log("QmlGenQuestionDependency", questions, dependencies);
  return (
    <SelectableCardList
      items={questions}
      selected={dependencies}
      onSelectToggle={handleSelectToggle}
      itemPrefix="Q"
    />
  );
}
