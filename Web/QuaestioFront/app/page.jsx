"use client";
import Container from "@mui/material/Container";
import NavBar from "@/components/NavBar";
import Modal from "@/components/Modal/Modal";
import QuestionList from "@/components/QuestionList";
import FactList from "@/components/FactList";
import AnswerButton from "@/components/AnswerButton";

import { useSelector } from "react-redux";

export default function Home() {
  const questionaireName = useSelector((state) => state.questionaire.name);
  return (
    <main className="">
      <NavBar />
      <Container className="flex">
        {questionaireName}
        <QuestionList type="valid" />
        <Container>
          <AnswerButton />
          <FactList />
        </Container>
        <QuestionList type="answered" />
      </Container>
      <Modal />
    </main>
  );
}
