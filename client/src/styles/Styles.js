import { createTheme } from '@mui/material/styles';

const Colors = {
  primaryLight: '#1F2433',
  primary: '#171B26',
  primaryDark: '#0B0D12',
  secondaryLight: '#646973',
  secondary: '#32353c',
  secondaryDark: '#13161B',
  green: '#58c255',
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
      link: Colors.green
    },
    success: {
      main: Colors.green,
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
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableArrow: false,
        fixedArrow: false
      },
      styleOverrides: {
        root: {
          color: theme.palette.secondary.light,
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
          },
          minHeight: '35px',
          padding: '5px',
          borderRadius: theme.shape.borderRadius,
          '&:disabled': {
            color: 'rgba(255,255,255, 0.1)',
          },
          '&:before': {
            content: "'>'",
            marginRight: '4px',
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
          props: { color: 'primary' }, 
          style: {
            borderColor: theme.palette.secondary.light,
          '&:hover': {
            borderColor: theme.palette.secondary.light,
          },
          }
        },
        { 
          props: { color: 'success' }, 
          style: {
            color: theme.palette.success.main,
            backgroundColor: theme.palette.success.main,
            '&:hover': {
              backgroundColor: theme.palette.success.light,
            }
          }
        },
        { 
          props: { color: 'error' }, 
          style: {
            color: theme.palette.error.main,
            backgroundColor: theme.palette.error.main,
            '&:hover': {
              backgroundColor: theme.palette.error.light,
            }
          }
        },        
        { 
          props: { hoverColor: true }, 
          style: {
            '&:not(:hover)': {
              color: theme.palette.secondary.light,
              borderColor: theme.palette.secondary.light,
            } 
          }
        },
        {
          props: { variant: 'text' },
          style: {
            minHeight: 'unset',
            borderRadius: 100,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            }
          }
        },
        {
          props: { variant: 'contained' },
          style: {
            color: theme.palette.text.primary,
            backgroundColor: 'rgba(255,255,255, 0.025)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.05)',
            },
          }
        },
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            }
          }
        },
      ],
    },
    MuiCard: {
      defaultProps: {
        elevation:0,
      },
      styleOverrides: {
        root: {
          border: `1px solid ${theme.palette.secondary.main}`,
          backgroundColor: theme.palette.secondary.dark,
          backgroundImage: 'none'
        }
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
          }
        }
      ]
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
            // width: '40px',
            // height: '40px',
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.success.main,
            // padding: '4px',
            '&:hover': {
              color: theme.palette.primary.dark,
              backgroundColor: theme.palette.success.light,
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
    MuiToggleButton: {
      defaultProps: {
        disableRipple: true
      },
    }
  }
})

export default theme;