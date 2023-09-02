"use client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import QuestionDetails from "@/components/QuestionDetails";
import QuestionaireDetails from "@/components/QuestionaireDetails";
import NavBar from "@/components/NavBar";
import Modal from "@/components/Modal/Modal";
import QuestionList from "@/components/QuestionList";
import FactList from "@/components/FactList";
import QuestionButton from "@/components/QuestionButton";

import { useSelector } from "react-redux";

export default function Home() {
  return (
    <main className="h-screen">
      <NavBar />
      <Container fluid className="my-auto">
        <QuestionaireDetails />
        <Box className="flex flex-col md:flex-wrap lg:flex-nowrap w-full justify-between md:h-[600px] lg:flex-row">
          <QuestionList type="valid" />
          <Box className="flex flex-col min-w-[300px] my-5 md:my-0 md:order-3 md:self-end md:w-[49%] lg:self-auto lg:order-2 lg:mx-5 lg:w-full">
            <QuestionButton />
            <FactList className="md:my-3" />
            <QuestionDetails />
          </Box>
          <QuestionList type="answered" className="md:order-2 lg:order-3" />
        </Box>
      </Container>
      <Modal />
    </main>
  );
}
