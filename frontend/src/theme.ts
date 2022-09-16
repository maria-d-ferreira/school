import { createTheme } from "@mui/material/styles";
import * as color from "./appColors";

export const theme = createTheme({
  palette: {
    common: {
      black: color.BLACK,
      white: color.WHITE,
    },

    primary: {
      // main: color.GREEN,
      main: "#3b79a3",
    },
    secondary: {
      main: color.ORANGE,
      light: color.ORANGE_LIGHT,
      dark: color.ORANGE_DARK,
      contrastText: color.WHITE,
    },
    error: {
      main: color.RED_DARK,
      light: color.RED_LIGHT,
      dark: color.RED_DARK,
      contrastText: color.WHITE,
    },
    grey: {
      50: color.LIGHT_GREY_1,
      100: color.LIGHT_GREY_2,
      200: color.DARK_GREY_3,
      300: color.MEDIUM_GREY_1,
      400: color.MEDIUM_GREY_2,
      500: color.MEDIUM_GREY_3,
      600: color.DARK_GREY_1,
      700: color.DARK_GREY_2,
      800: color.DARK_GREY_3,
      900: color.DARK_GREY_4,
    },
    text: {
      primary: color.DARK_GREY_4,
      secondary: color.DARK_GREY_3,
      disabled: color.MEDIUM_GREY_1,
    },

    // background: {
    //   paper: color.WHITE,
    //   default: color.GREEN_LIGHT_BACK,
    // },

    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: 30,
        },
      },
    },
  },
});
