import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function Sidebar({ open, handleDrawerClose, item }) {
  const drawerWidth = "250px";
  const theme = useTheme();

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>

      {item ? (
        <List>
          <ListItem>
            <ListItemText
              primary={<Typography variant="h4">{item.name}</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h5">Host: {item.host_name}</Typography>
              }
              secondary={
                <Typography variant="body">id: {item.host_id}</Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="p">
                  <b>Room type:</b> {item.room_type}
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="p">
                  <b>Minimum night:</b> {item.minimum_nights}
                </Typography>
              }
            />
          </ListItem>
          <ListItem key={item.id}>
            <ListItemText
              primary={
                <Typography variant="p">
                  <b>Neighbourhood: </b>
                  {item.neighbourhood}, {item.neighbourhood_group}
                </Typography>
              }
            />
          </ListItem>
        </List>
      ) : (
        <List>
          <Typography variant="body-1" component="p" sx={{ padding: 2 }}>
            Click to point to see more details
          </Typography>
        </List>
      )}
    </Drawer>
  );
}
