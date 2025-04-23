import {
  selectQuestion,
  updateQuestionTitle,
  updateQuestionGuidelines,
} from "@/redux/slices/designerSlice";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import DetailsDrawer from "./DetailsDrawer";

export default function QuestionDetailsDrawer({
  questionId,
}: {
  questionId: string;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const question = useAppSelector(selectQuestion(questionId));

  const handleTitleChange = (event) => {
    dispatch(
      updateQuestionTitle({ title: event.target.value, id: questionId })
    );
  };

  const handleGuidelinesChange = (event) => {
    dispatch(
      updateQuestionGuidelines({
        guidelines: event.target.value,
        id: questionId,
      })
    );
  };

  return (
    <DetailsDrawer
      id={questionId}
      onTitleChange={handleTitleChange}
      onGuidelinesChange={handleGuidelinesChange}
      title={question?.data?.title}
      guidelines={question?.data?.guidelines}
    />
  );
}
