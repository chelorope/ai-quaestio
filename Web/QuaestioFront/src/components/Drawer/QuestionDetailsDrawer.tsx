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
}) {
  const dispatch = useDispatch();
  const question = useAppSelector(selectQuestion(questionId));

  const handleTitleChange = (value: string) => {
    dispatch(updateQuestionTitle({ title: value, id: questionId }));
  };

  const handleGuidelinesChange = (value: string) => {
    dispatch(
      updateQuestionGuidelines({
        guidelines: value,
        id: questionId,
      })
    );
  };

  return (
    <DetailsDrawer
      id={questionId}
      onTitleChange={handleTitleChange}
      onGuidelinesChange={handleGuidelinesChange}
      title={question?.data?.title || ""}
      guidelines={question?.data?.guidelines || ""}
    />
  );
}
