import { createTheme } from '@mui/material/styles';

const Colors = {
  primaryLight: '#1F2433',
  primary: '#171B26',
  primaryDark: '#0B0D12',
  secondaryLight: '#646973',
  secondary: '#32353c',
  secondaryDark: '#13161B',
  // green: '#58c255',
  // red: '#da3849',
  blue: '#80B0f5',
  white: '#f5f5f5',
};

let theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: Colors.primaryDark
    },
    common: {
      white: Colors.white
    },
    primary: {
      light: Colors.primaryLight,
      main: Colors.primary,
      dark: Colors.primaryDark
    },
    secondary: {
      light: Colors.secondaryLight,
      main: Colors.secondary,
      dark: Colors.secondaryDark
    },
    text: {
      primary: Colors.white,
      secondary: Colors.secondaryLight,
      disabled: Colors.secondary,
      icon: Colors.secondaryLight,
      link: Colors.blue
    }
  }
})

theme = createTheme(theme, {
  typography: {
    h1: {
      fontFamily: 'Roboto Mono',
      fontWeight: 400,
    },
    h2: {
      fontFamily: 'Roboto Mono',
      fontWeight: 400,
    },
    h3: {
      fontFamily: 'Roboto Mono',
      fontWeight: 400,
    },
    h4: {
      fontFamily: 'Roboto Mono',
      fontWeight: 300,
    },
    h5: undefined,
    h6: {
      fontFamily: 'Roboto Mono',
      fontWeight: 400,
    },
    subtitle1: undefined,
    subtitle2: undefined,
    body2: {
      fontFamily: 'Roboto Mono',
      fontSize: '1rem',
      color: theme.palette.text.secondary,
    },
    button: {
      textTransform: 'none',
      // fontSize: '0.75rem',
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
          border:'none',
          background: Colors.white,
          padding:'6px',
          width:'40px',
          height:'40px',
          [theme.breakpoints.up('sm')]: {
            padding:'10px',
            width:'60px',
            height:'60px'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${theme.palette.secondary.main}`,
          boxShadow: 'none',
          backgroundColor: 'transparent',
          backgroundImage: 'none'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          border: '1px solid',
          color: theme.palette.secondary.light,
          '&:disabled': {
            color: theme.palette.secondary.light,
          }
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          backgroundColor: 'transparent',
          border: `1px solid ${theme.palette.secondary.main}`,
          borderRadius: theme.shape.borderRadius,

          '& input::placeholder': {
            fontFamily: 'Roboto Mono',
            color: theme.palette.text.secondary,
            opacity: '1',
          },
          '& input:focus::placeholder': {
            color: 'transparent',
          }
        }
      }
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          color: theme.palette.secondary.light
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline:'none',
        color: theme.palette.text.link
      }
    }
  }
})

export default theme;