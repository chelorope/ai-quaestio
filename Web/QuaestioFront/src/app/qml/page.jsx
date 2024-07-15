"use client";
import QuestionsTab from "@/components/QmlGenerator/QmlGenQuestionsTab";
import FactsTab from "@/components/QmlGenerator/QmlGenFactsTab";
import Container from "@mui/material/Container";
import TabsView from "@/components/QmlGenerator/TabsView";
import QmlGenExportTab from "@/components/QmlGenerator/QmlGenExportTab";
import QmlGenConstraintsTab from "@/components/QmlGenerator/QmlGenConstraintsTab";

export default function Home() {
  return (
    <Container sx={{ my: "auto", p: 5, height: 1 }}>
      <TabsView
        tabs={[
          { label: "Questions", content: <QuestionsTab /> },
          { label: "Facts", content: <FactsTab /> },
          { label: "Constraints", content: <QmlGenConstraintsTab /> },
          { label: "Export", content: <QmlGenExportTab /> },
        ]}
      />
    </Container>
  );
}
