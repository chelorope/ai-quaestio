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
      <Container fluid className="">
        <QuestionaireDetails />
        <Box
          fluid
          className="flex flex-col md:flex-wrap lg:flex-nowrap w-full justify-between md:h-[600px] lg:flex-row"
        >
          <QuestionList type="valid" className="lg:order-1" />
          <QuestionList type="answered" className="lg:order-3" />
          <Box className="flex flex-col min-w-[300px] md:self-end md:w-[49%] lg:self-auto lg:order-2 lg:mx-5 lg:w-full">
            <QuestionButton />
            <FactList />
            <QuestionDetails />
          </Box>
        </Box>
      </Container>
      <Modal />
    </main>
  );
}
