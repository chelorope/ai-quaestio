"use client";
import Container from "@mui/material/Container";
import NavBar from "@/components/NavBar";
import Modal from "@/components/Modal/Modal";
import QuestionList from "@/components/QuestionList";
import FactList from "@/components/FactList";

import { useSelector } from "react-redux";

export default function Home() {
  const questionaireName = useSelector((state) => state.questionaire.name);
  const answeredQuestions = useSelector(
    (state) => state.questionaire.answeredQuestions
  );
  const validQuestions = useSelector(
    (state) => state.questionaire.validQuestions
  );
  return (
    <main className="">
      <NavBar />
      <Container>
        {questionaireName}
        <QuestionList questions={answeredQuestions} />
        <QuestionList questions={validQuestions} />
        <FactList />
      </Container>
      <Modal />
    </main>
  );
}
