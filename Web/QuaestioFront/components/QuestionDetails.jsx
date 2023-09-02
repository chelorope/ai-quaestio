import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

export default function QuestionsList({ className }) {
  const questions = useSelector((state) => state.questionaire.questions);

  const selectedQuestion = useSelector(
    (state) => state.questionaire.selectedQuestion
  );
  return (
    questions[selectedQuestion]?.guidelines && (
      <Card className={`${className} w-full`}>
        <CardHeader
          className=""
          title="Guidelines"
          titleTypographyProps={{ variant: "h6" }}
        />
        <Divider />
        <CardContent>{questions[selectedQuestion]?.guidelines}</CardContent>
      </Card>
    )
  );
}
