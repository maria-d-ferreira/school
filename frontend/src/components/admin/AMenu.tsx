import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ATeacher from "./ATeacher";
import AStudent from "./AStudent";
import AClasses from "./AClasses";
import { style } from "@mui/system/Stack/createStack";
import Grid from "@mui/material/Grid";

const list = [
  { name: "teachers", activeIndex: 0 },
  { name: "students", activeIndex: 1 },
  { name: "classes", activeIndex: 2 },
];

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [title, setTitle] = useState("teachers");
  const [value, setValue] = useState(0);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {list.map(route => (
          <ListItem
            key={route.activeIndex}
            selected={value === route.activeIndex}
            onClick={() => {
              setValue(route.activeIndex);
              setTitle(route.name);
            }}
          >
            <ListItemText
              disableTypography
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {route.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const rendering = () => {
    switch (value) {
      case 0:
        return <ATeacher />;
      case 1:
        return <AStudent />;
      case 2:
        return <AClasses />;
      default:
        return <ATeacher />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: "flex",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Grid container sx={{ display: "flex" }}>
            <Grid item xs={3}>
              <Typography variant="h5" noWrap component="div">
                start:school
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" noWrap component="div">
                /admin
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" noWrap component="div" color="#9acbed">
                {`--${title}`}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        bgcolor="primary.main"
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "grey.50",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {rendering()}
      </Box>
    </Box>
  );
}
