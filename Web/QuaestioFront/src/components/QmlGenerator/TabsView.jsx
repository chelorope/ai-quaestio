"use client";
import TabPanel from "@/components/TabPanel";
import { Box, Tab, Tabs, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useMemo, useState } from "react";

export default function TabsView({ tabs, type = "default" }) {
  const [currentTab, setCuttentTab] = useState(0);

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setCuttentTab(newValue);
    }
  };

  const TabsHeader = useMemo(() => {
    switch (type) {
      case "default":
        return (
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={currentTab}
              onChange={handleChange}
              centered
              variant="fullWidth"
            >
              {tabs.map((tab, index) => (
                <Tab label={tab.label} key={index} />
              ))}
            </Tabs>
          </Box>
        );
      case "buttons":
        return (
          <ToggleButtonGroup
            fullWidth
            value={currentTab}
            exclusive
            onChange={handleChange}
          >
            {tabs.map((tab, index) => (
              <ToggleButton
                value={index}
                key={index}
                sx={{
                  ...(index === 0 ? { borderBottomLeftRadius: 0 } : {}),
                  ...(index === tabs.length - 1
                    ? { borderBottomRightRadius: 0 }
                    : {}),
                }}
              >
                {tab.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        );
    }
  }, [tabs, currentTab]);

  return (
    <>
      {TabsHeader}
      {tabs.map((tab, index) => (
        <TabPanel value={currentTab} index={index} key={index}>
          {tab.content}
        </TabPanel>
      ))}
    </>
  );
}
