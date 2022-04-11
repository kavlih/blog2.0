import { createTheme } from "@mui/material/styles";

const Colors = {
  primaryLight: "#1F2433",
  primary:      "#171B26",
  primaryDark:  "#0B0D12",
  grey:         "#646973",
  // greyMid:         "#41454E",
  greyDark:     "#32353c",
  green:        "#58c255",
  red:          "#da3849",
  // blue:         "#80b0f5",
  // Solid Colors
  white: "#f5f5f5",
  // black: "#000000"
};

const theme = createTheme({
  palette: {
    primary: {
      light: Colors.primaryLight,
      main: Colors.primary,
      dark: Colors.primaryDark
    },
    grey: {
      main: Colors.grey,
      dark: Colors.greyDark
    },
    green: {
      main: Colors.green
    },
    red: {
      main: Colors.red
    },
    text: {
      primary: Colors.white,
      secondary: Colors.grey
    }
    // secondary: {
    //   main: {
    //     main: Colors.secondary
    //   }
    // }
  },
  typography: {
    // h1: undefined,
    h2: {
      fontFamily: "Roboto Mono",
      fontWeight: 400
    },
    h3: {
      fontFamily: "Roboto Mono",
      fontWeight: 400
    },
    // h4: undefined,
    // h5: undefined,
    // h6: undefined,
    // subtitle1: undefined,
    // subtitle2: undefined,
    // body1: undefined,
    bodyMono: {
      fontFamily: "Roboto Mono",
      fontSize: "1rem",
      fontWeight: 400
    },
    // button: undefined,
    bodyMonoBold: {
      fontFamily: "Roboto Mono",
      fontSize: "1rem",
      fontWeight: 500
    },
    // caption: undefined,
    // overline: undefined,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // h1: "",
          // h2: "",
          // h3: "",
          // h4: "",
          // h5: "",
          // h6: "",
          // subtitle1: "",
          // subtitle2: "",
          // body1: "",
          // body2: "",
          // button: "",
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiLink: {
      defaultProps: {
        underline: "none"
      }
    }
  }
})

export default theme;