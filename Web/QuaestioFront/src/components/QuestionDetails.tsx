import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { SxProps, Theme } from "@mui/material/styles";
import { useAppSelector } from "@/redux/hooks";

interface QuestionDetailsProps {
  sx?: SxProps<Theme>;
}

export default function QuestionsDetails({
  sx,
}: QuestionDetailsProps): JSX.Element | null {
  const questions = useAppSelector((state) => state.questionnaire.questions);
  const selectedQuestion = useAppSelector(
    (state) => state.questionnaire.selectedQuestion
  );

  // Return null if no guidelines available
  if (!questions[selectedQuestion]?.guidelines) {
    return null;
  }

  return (
    <Card sx={{ ...sx, width: 1 }}>
      <CardHeader title="Guidelines" titleTypographyProps={{ variant: "h6" }} />
      <Divider />
      <CardContent>{questions[selectedQuestion]?.guidelines}</CardContent>
    </Card>
  );
}
