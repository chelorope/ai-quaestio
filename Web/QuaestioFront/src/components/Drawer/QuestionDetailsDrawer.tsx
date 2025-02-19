import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  selectQuestion,
  updateQuestionTitle,
  updateQuestionGuidelines,
} from "@/redux/slices/flowSlice";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";

export default function QuestionDetailsDrawer({
  questionId,
  onClose,
}: {
  questionId?: string;
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

  const handleSubmit = async () => {
    onClose();
  };

  return (
    <Box
      sx={{
        width: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <TextField
        label="Nombre"
        value={question?.data?.title}
        onChange={handleTitleChange}
        size="small"
        sx={{ mt: 2, width: 300 }}
      />
      <TextField
        label="Guidelines"
        value={question?.data?.guidelines}
        onChange={handleGuidelinesChange}
        rows={4}
        multiline
        fullWidth
      />
      {JSON.stringify(question)}
      <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
        Guardar
      </Button>
    </Box>
  );
}
