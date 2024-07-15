import { Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import TabPanel from "@/components/TabPanel";
import QmlGenFacts from "./QmlGenFacts";
import TabsView from "./TabsView";
import QmlGenDetails from "./QmlGenDetails";
import { useSelector } from "react-redux";
import QmlGenFactDetails from "./QmlGenFactDetails";
import QmlGenFactDependency from "./QmlGenFactDependency";

export default function FactsTab() {
  const selectedFactId = useSelector(
    (state) => state.qmlGenerator.selectedFact
  );
  const selectedFact = useSelector(
    (state) => state.qmlGenerator.facts[selectedFactId] || {}
  );
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
    >
      <Paper
        sx={{
          p: 5,
          width: 1,
          minWidth: 0.5,
          mr: { md: 2 },
          mb: { xs: 2, md: 0 },
        }}
      >
        <QmlGenFacts />
      </Paper>
      <Paper sx={{ width: 1, minWidth: 0.5 }}>
        <TabsView
          type="buttons"
          tabs={[
            {
              label: "Details",
              content: selectedFactId !== undefined && (
                <QmlGenFactDetails
                  factId={selectedFactId}
                  isMandatory={selectedFact.mandatory}
                  isDefault={selectedFact.default}
                  guidelines={selectedFact.guidelines}
                />
              ),
            },
            {
              label: "Fully Depends",
              content: (
                <QmlGenFactDependency factId={selectedFactId} type="fully" />
              ),
            },
            {
              label: "Partially Depends",
              content: (
                <QmlGenFactDependency
                  factId={selectedFactId}
                  type="partially"
                />
              ),
            },
          ]}
        />
      </Paper>
    </Box>
  );
}
