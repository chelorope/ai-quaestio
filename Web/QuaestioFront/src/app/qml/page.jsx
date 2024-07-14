"use client";
import QuestionsTab from "@/components/QmlGenerator/QmlGenQuestionsTab";
import FactsTab from "@/components/QmlGenerator/QmlGenFactsTab";
import TabPanel from "@/components/TabPanel";
import { Box, Paper, Tab, Tabs, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
import TabsView from "@/components/QmlGenerator/TabsView";

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container sx={{ my: "auto", p: 5, height: 1 }}>
      <TabsView
        tabs={[
          { label: "Questions", content: <QuestionsTab /> },
          { label: "Facts", content: <FactsTab /> },
          { label: "Conditions", content: "Item Three" },
        ]}
      />
    </Container>
  );
}
