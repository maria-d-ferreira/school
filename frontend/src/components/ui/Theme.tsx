import { createTheme } from "@material-ui/core/styles";

const sBlue = "#1e1940";
const sGrey = "#889295";

export default createTheme({
  palette: {
    primary: {
      main: `${sBlue}`,
    },
    secondary: {
      main: `${sGrey}`,
    },
  },
  typography: {},
});
