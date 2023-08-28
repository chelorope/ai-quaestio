"use client";
import Container from "@mui/material/Container";
import NavBar from "@/components/NavBar";
import Modal from "@/components/Modal/Modal";

import { useSelector, shallowEqual } from "react-redux";

export default function Home() {
  const questionaireName = useSelector(
    (state) => state.questionaire.name,
    shallowEqual
  );
  return (
    <main className="">
      <NavBar />
      <Container>{questionaireName}</Container>
      <Modal />
    </main>
  );
}
