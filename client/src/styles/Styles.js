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
    h1: undefined,
    h2: undefined,
    h3: undefined,
    h4: {
      fontFamily: 'Roboto Mono',
      fontWeight: 300,
      color: theme.palette.primary.light,
    },
    h5: {
      fontWeight: 500
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: undefined,
    subtitle2: undefined,
    body2: {
      fontFamily: 'Roboto Mono',
      fontSize: '1rem',
      color: theme.palette.text.secondary,
    },
    button: {
      fontFamily: 'Roboto Mono',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.9rem',
      color: theme.palette.text.secondary,
    },
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
    ToggleButton: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.light,
          // backgroundColor: theme.palette.primary.light,
          '&:disabled': {
            // color: theme.palette.secondary.main,
          },
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
          }
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableArrow: false,
        fixedArrow: false
      },
      styleOverrides: {
        root: {
          padding: '5px',
          borderRadius: theme.shape.borderRadius,
          '&:disabled': {
            color: theme.palette.secondary.main,
          },
          '&:before': {
            content: "'>'",
            marginRight: '4%',
            display: 'none'
          },
          '&.active:before, &:hover:before': {
            display: 'inherit'
          }
        }
      },
      variants: [
        {
          props: { disableArrow: true },
          style: {
            '&:before': {
              content: "''",
              marginRight: 0,
            },
          },
        },
        {
          props: { fixedArrow: true },
          style: {
            '&:before': {
              display: 'inherit',
              opacity: 0,
            },
            '&.active:before, &:hover:before': {
              opacity: 1
            }
          },
        },
        {
          props: { variant: 'text' },
          style: {
            color: theme.palette.secondary.light,
            '& a, & p': {
              color: theme.palette.secondary.light,
            },
            borderRadius: 100,
            '&:hover': {
              backgroundColor: 'transparent',
            }
          }
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: theme.palette.secondary.light,
            border: `1px solid ${theme.palette.secondary.light}`,
            '&:hover': {
              borderColor: theme.palette.secondary.light,
              backgroundColor: 'inherit',
            }
          }
        },
        { 
          props: { color: 'success' }, 
          style: {
            color: theme.palette.success.main,
            borderColor: theme.palette.success.main,
            '&:hover': {
              borderColor: theme.palette.success.main,
            } 
          }
        },
        { 
          props: { color: 'error' }, 
          style: {
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
            '&:hover': {
              borderColor: theme.palette.success.main,
            } 
          }
        },
        { 
          props: { hoverColor: 'success' }, 
          style: {
            '&:hover': {
              color: theme.palette.success.main,
              borderColor: theme.palette.success.main,
            } 
          }
        },
        { 
          props: { hoverColor: 'error' }, 
          style: {
            '&:hover': {
              color: theme.palette.error.main,
              borderColor: theme.palette.error.main,
            } 
          }
        },
        // {
        //   props: { variant: 'card' },
        //   style: {
        //     border: `1px solid ${theme.palette.secondary.main}`,
        //     color: theme.palette.text.primary,
        //     backgroundColor: theme.palette.secondary.dark,
        //     '&:hover': {
        //       backgroundColor: theme.palette.secondary.main,
        //     },
        //   },
        // }
      ],
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
          '& input::placeholder': {
            fontFamily: 'Roboto Mono',
            color: theme.palette.text.secondary,
            opacity: '1',
          },
          '& input:focus::placeholder': {
            color: 'transparent',
          }
        }
      },
      variants: [
        {
          props: { variant: 'password' },
          style: {
            '& .MuiInputAdornment-root': {
              display: 'none',
              '& .MuiIconButton-root:hover': {
                color: theme.palette.secondary.light,
              }
            },
            '& .MuiInputBase-input:focus ~ .MuiInputAdornment-root': {
              display: 'flex'
            },
          }
        }
      ]
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          color: theme.palette.secondary.light,
          '&:hover': {
            color: theme.palette.text.primary,
          }
        }
      },
      variants: [
        {
          props: { variant: 'submit' },
          style: {
            width: '40px',
            height: '40px',
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.success.main,
            padding: '4px',
            '&:hover': {
              color: theme.palette.primary.dark,
              backgroundColor: theme.palette.success.dark,
            },
            '&.Mui-disabled': {
              opacity: 0.2,
              color: theme.palette.primary.dark,
              backgroundColor: theme.palette.success.dark,
            },
          },
        },
      ],
    },
    MuiLink: {
      defaultProps: {
        underline:'none',
        color: theme.palette.text.link
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.secondary.dark,
        }
      }
    },
  }
})

export default theme;