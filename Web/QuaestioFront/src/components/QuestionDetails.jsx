import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

export default function QuestionsDetails({ sx }) {
  const questions = useSelector((state) => state.questionnaire.questions);

  const selectedQuestion = useSelector(
    (state) => state.questionnaire.selectedQuestion
  );
  return (
    questions[selectedQuestion]?.guidelines && (
      <Card sx={{ ...sx, width: 1 }}>
        <CardHeader
          title="Guidelines"
          titleTypographyProps={{ variant: "h6" }}
        />
        <Divider />
        <CardContent>{questions[selectedQuestion]?.guidelines}</CardContent>
      </Card>
    )
  );
}
