import { createTheme } from "@mui/material/styles";

const Colors = {
  primaryLight: "#1F2433",
  primary:      "#171B26",
  primaryDark:  "#0B0D12",
  greyLight:    "#646973",
  grey:         "#41454E",
  greyDark:     "#32353c",
  green:        "#58c255",
  red:          "#da3849",
  // blue:         "#80b0f5",
  // Solid Colors
  // white: "#f5f5f5",
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
      light: Colors.greyLight,
      main: Colors.grey,
      dark: Colors.greyDark
    },
    green: {
      main: Colors.green
    },
    red: {
      main: Colors.red
    },
    // secondary: {
    //   main: {
    //     main: Colors.secondary
    //   }
    // }
  },
  components: {
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