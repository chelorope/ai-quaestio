import {
  AppBar,
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import TabPanel from "@/components/TabPanel";
import EditableList from "./EditableList";
import QmlGenQuestions from "./QmlGenQuestions";

export function QuestionsTab() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box display="flex" justifyContent="space-between">
      <Paper sx={{ p: 5, flexGrow: 1, mr: 2 }}>
        <QmlGenQuestions />
      </Paper>
      <Paper sx={{ flexGrow: 1 }}>
        <ToggleButtonGroup
          fullWidth
          value={value}
          exclusive
          onChange={handleChange}
          aria-label="text alignment"
        >
          <ToggleButton value={0} sx={{ borderBottomLeftRadius: 0 }}>
            Details
          </ToggleButton>
          <ToggleButton value={1}>Facts</ToggleButton>
          <ToggleButton value={2}>Fully Depends</ToggleButton>
          <ToggleButton value={3} sx={{ borderBottomRightRadius: 0 }}>
            Partially Depends
          </ToggleButton>
        </ToggleButtonGroup>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </Paper>
    </Box>
  );
}
