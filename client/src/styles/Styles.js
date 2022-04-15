import { createTheme } from "@mui/material/styles";

const Colors = {
  primaryLight: "#1F2433",
  primary: "#171B26",
  primaryDark: "#0B0D12",
  secondary: "#646973",
  secondaryDark: "#32353c",
  // green: "#58c255",
  // red: "#da3849",
  blue: "#80B0f5",
  white: "#f5f5f5",
};

let theme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      white: Colors.white
    },
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
      disabled: Colors.secondaryDark,
      icon: Colors.secondary,
      link: Colors.blue
    }
  }
})

theme = createTheme(theme, {
  typography: {
    h1: {
      fontFamily: "Roboto Mono",
      fontWeight: 400,
    },
    h2: {
      fontFamily: "Roboto Mono",
      fontWeight: 400,
    },
    h3: {
      fontFamily: "Roboto Mono",
      fontWeight: 400,
    },
    h4: {
      fontFamily: "Roboto Mono",
      fontWeight: 300,
    },
    h5: undefined,
    h6: undefined,
    subtitle1: undefined,
    subtitle2: undefined,
    body2: {
      fontFamily: "Roboto Mono",
      fontSize: "1rem",
      color: theme.palette.text.secondary,
    },
    button: {
      fontFamily: "Roboto Mono",
      textTransform: "none",
      // fontSize: "0.75rem",
      // color: theme.palette.text.secondary,
    },
    caption: undefined,
    overline: undefined,
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
          props: { 
            variant: "post" 
          },
          style: {
            padding:"6px",
            width:"28px",
            height:"28px",
            [theme.breakpoints.up("sm")]: {
              padding:"10px",
              width:"40px",
              height:"40px"
            }
          }
        }
      ]
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
    MuiButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          border: "1px solid",
          color: theme.palette.secondary.main,
        }
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
        underline:"none",
        color: theme.palette.text.link
      }
    }
  }
})

export default theme;