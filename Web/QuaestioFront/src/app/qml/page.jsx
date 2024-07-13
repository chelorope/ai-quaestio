"use client";
import { QuestionsTab } from "@/components/QmlGenerator.jsx/QuestionsTab";
import TabPanel from "@/components/TabPanel";
import { Box, Paper, Tab, Tabs, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container sx={{ my: "auto", p: 5, height: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="fullWidth"
        >
          <Tab label="Questions" />
          <Tab label="Facts" />
          <Tab label="Conditions" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <QuestionsTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Container>
  );
}
