import { useDispatch, useSelector } from "react-redux";
import SelectableCardList from "./SelectableCardList";
import {
  selectFacts,
  selectSelectedQuestionObject,
  updateQuestionFacts,
} from "@/redux/slices/qmlGeneratorSlice";

export default function QmlGenQuestionFacts({ questionId }) {
  const dispatch = useDispatch();
  const facts = useSelector(selectFacts);
  const questionFacts = useSelector(
    (state) => selectSelectedQuestionObject(state)?.facts || []
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
      onSelect={handleSelectToggle}
    />
  );
}
