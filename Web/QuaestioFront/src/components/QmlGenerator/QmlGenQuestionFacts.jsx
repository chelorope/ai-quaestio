import { useDispatch, useSelector } from "react-redux";
import SelectableCardList from "./SelectableCardList";
import { updateQuestionFacts } from "@/redux/qmlGeneratorSlice";

export default function QmlGenQuestionFacts({ questionId }) {
  const dispatch = useDispatch();
  const facts = useSelector((state) => state.qmlGenerator.facts);
  const questionFacts = useSelector(
    (state) =>
      state.qmlGenerator.questions[state.qmlGenerator.selectedQuestion].facts
  );
  const handleSelectToggle = (factId) => {
    dispatch(
      updateQuestionFacts({
        index: questionId,
        value: factId,
      })
    );
  };
  return (
    <SelectableCardList
      items={facts}
      selected={questionFacts}
      onSelectToggle={handleSelectToggle}
    />
  );
}
