"use client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import QuestionaireDetails from "@/components/QuestionaireDetails";
import NavBar from "@/components/NavBar";
import Modal from "@/components/Modal/Modal";
import QuestionList from "@/components/QuestionList";
import FactList from "@/components/FactList";
import AnswerButton from "@/components/AnswerButton";

import { useSelector } from "react-redux";

export default function Home() {
  return (
    <main className="h-screen">
      <NavBar />
      <Container fluid>
        <QuestionaireDetails />
        <Box fluid className="flex w-full justify-between">
          <QuestionList type="valid" />
          <Box className="flex flex-col w-full mx-20">
            <AnswerButton />
            <FactList />
          </Box>
          <QuestionList type="answered" />
        </Box>
      </Container>
      <Modal />
    </main>
  );
}
