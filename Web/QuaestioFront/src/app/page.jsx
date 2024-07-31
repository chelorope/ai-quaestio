"use client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import QuestionDetails from "@/components/QuestionDetails";
import QuestionnaireDetails from "@/components/QuestionnaireDetails";
import QuestionList from "@/components/QuestionList";
import FactList from "@/components/FactList";
import QuestionButton from "@/components/QuestionButton";
import FactButton from "@/components/FactButton";
import FactInspector from "@/components/FactInspector";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { useEffect } from "react";
import { loadQuestionarie } from "@/redux/thunks/questionnaireThunks";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        await dispatch(loadQuestionarie()).unwrap();
      } catch (e) {
        if (e.code === "ERR_BAD_REQUEST") {
          dispatch(openModal("file"));
        }
      }
    })();
  }, [dispatch]);
  return (
    <Container sx={{ my: "auto", height: "100%" }}>
      <QuestionnaireDetails sx={{ my: 3 }} />
      <Box
        sx={{
          width: 1,
          height: { lg: 0.7 },
          maxHeight: { md: "600px" },
          minWidth: "300px",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          flexWrap: { xs: "nowrap", md: "wrap", lg: "nowrap" },
        }}
      >
        <QuestionList type="valid" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            my: { xs: 2, md: 0, lg: 2 },
            mx: { lg: 3 },
            mt: { lg: 0 },
            order: { md: 3 },
            alignSelf: { xs: "flex-end", lg: "flex-start" },
            justifyContent: "center",
            width: { xs: 1, md: "49%", lg: "100%" },
          }}
        >
          <QuestionButton />
          <FactList sx={{ mt: { xs: 2 } }} />
          <FactButton sx={{ mt: 2 }} />
          <QuestionDetails sx={{ mt: 2 }} />
        </Box>
        <QuestionList
          sx={{ order: { md: 2, lg: 3 }, mt: { md: 1, lg: 0 } }}
          type="answered"
        />
      </Box>
      <FactInspector />
    </Container>
  );
}
