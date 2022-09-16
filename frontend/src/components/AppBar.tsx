import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import SignIn from "./auth/SignIn";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// const useStyles = makeStyles(theme => ({
//   toolbarMargin: {
//     ...theme.mixins.toolbar,
// marginBottom: "3em"
//   },
// }));

export default function AppBarComponent(props) {
  //const classes = useStyles();
  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Typography variant="h5">start:school</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <SignIn />
    </>
  );
}
