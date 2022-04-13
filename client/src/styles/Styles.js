import { createTheme } from "@mui/material/styles";

const Colors = {
  primaryLight: "#1F2433",
  primary: "#171B26",
  primaryDark: "#0B0D12",
  secondary: "#646973",
  secondaryDark: "#32353c",
  green: "#58c255",
  red: "#da3849",
  blue: "#80B0f5",
  // Solid Colors
  white: "#f5f5f5",
  // black: "#000000"
};

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: Colors.primaryLight,
      main: Colors.primary,
      dark: Colors.primaryDark
    },
    secondary: {
      main: Colors.secondary,
      dark: Colors.secondaryDark
    },
    text: {
      primary: Colors.white,
      secondary: Colors.secondary,
      link: Colors.blue
    },
    success: {
      main: Colors.green
    },
    red: {
      main: Colors.red
    }
  }
})

theme = createTheme(theme, {
  typography: {
    h1: undefined,
    h2: undefined,
    h3: {
      fontFamily: "Roboto Mono",
      fontWeight: 400,
      color: theme.palette.primary.main
    },
    h4: {
      fontFamily: "Roboto Mono",
      fontWeight: 300,
      color: theme.palette.primary.main
    },
    // h5: undefined,
    // h6: undefined,
    // subtitle1: undefined,
    // subtitle2: undefined,
    body1: {
      fontFamily: "Roboto",
      fontSize: "1rem",
      fontWeight: 400
    },
    body2: {
      fontFamily: "Roboto Mono",
      fontSize: "1rem",
      fontWeight: 400,
      color: theme.palette.text.secondary,
    },
    // button: undefined,
    // caption: undefined,
    // overline: undefined,
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: Colors.white,
        }
      },
      variants: [
        {
          props: { variant: "post" },
          style: {
            padding:"6px",
            width:"28px",
            height:"28px",
            [theme.breakpoints.up("sm")]: {
              padding:"10px",
              width:"40px",
              height:"40px"
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${theme.palette.secondary.dark}`,
          boxShadow: "none",
          backgroundColor: "transparent",
          backgroundImage: "none"
        }
      }
    },
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
      },
      styleOverrides: {
        root: {
          color: theme.palette.secondary.main
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline:"none"
      },
    }
  }
})

export default theme;