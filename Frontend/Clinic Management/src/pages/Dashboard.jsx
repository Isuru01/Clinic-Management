import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Divider,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  DoctorSlide,
  PatientSlide,
  OverviewSlide,
  SessionSlide,
  SpecializationSlide,
} from "../components/slides/index.mjs";
import { useParams, useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const { type, action } = useParams();

  const naviagte = useNavigate();

  const handleClick = (endpoint) => naviagte(`/dashboard/${endpoint}`);

  const menuItems = [
    "overview",
    "doctor",
    "session",
    "specialization",
    "patient",
  ].map((text, index) => (
    <ListItem key={text} disablePadding onClick={() => handleClick(text)}>
      <ListItemButton>
        <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>{menuItems}</List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {type === "overview" && <OverviewSlide action={action} />}
        {type === "doctor" && <DoctorSlide action={action} />}
        {type === "session" && <SessionSlide action={action} />}
        {type === "specialization" && <SpecializationSlide action={action} />}
        {type === "patient" && <PatientSlide action={action} />}
      </Box>
    </Box>
  );
}
