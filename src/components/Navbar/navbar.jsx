// import { useState } from "react";
// import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

// eslint-disable-next-line react/prop-types
export default function Navbar({ handleDrawerOpen, open }) {
  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar position="fixed" open={open} sx={{ p: 0 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        ></IconButton>
        <Typography variant="h6" color="inherit" component="div">
          My React Map
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
