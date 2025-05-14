import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { SxProps, Theme } from "@mui/material/styles";
import { useAppSelector } from "@/redux/hooks";

interface QuestionnaireDetailsProps {
  sx?: SxProps<Theme>;
}

export default function QuestionnaireDetails({
  sx,
}: QuestionnaireDetailsProps): JSX.Element {
  const questionnaireName = useAppSelector((state) => state.questionnaire.name);
  const questionnaireAuthor = useAppSelector(
    (state) => state.questionnaire.author
  );
  const questionnaireReference = useAppSelector(
    (state) => state.questionnaire.reference
  );

  return (
    <Box sx={sx} display="flex">
      <Paper
        sx={{
          p: 3,
          width: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex">Name: {questionnaireName}</Box>
        <Box display="flex">Author: {questionnaireAuthor}</Box>
        <Box display="flex">Reference: {questionnaireReference}</Box>
      </Paper>
    </Box>
  );
}
