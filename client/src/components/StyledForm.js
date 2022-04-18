import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledForm = styled(Box)(({ theme }) => ({
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    '& .MuiPaper-root': {
      minWidth: '396px'
    }
  },

  '& .MuiPaper-root': {
    width: '100%',
    display: 'flex', 
    flexDirection: 'column', 
    gap: '10px',
    padding: '15px',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.secondary.dark,

    '& label': {
      fontSize: theme.typography.h6.fontSize,
      fontFamily: theme.typography.h6.fontFamily,
      fontWeight: theme.typography.h6.fontWeight,
      color: theme.palette.text.primary
    },
    
    '& a': {
      color: theme.palette.text.link, 
      textDecoration: 'none'
    },
    
  },

  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.primary.dark,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.secondary.main}`,
    paddingRight: '14px',

    '&:focus-within': {
      border: `1px solid ${theme.palette.secondary.light}`,
    },

    '& .MuiInputBase-input': {
      padding: '10px 12px',
    }
  },

  '& .MuiTypography-root': {
    marginBottom: '5px'
  },

  '& .MuiFormHelperText-root': {
    marginLeft: 0
  }
}));

export default StyledForm;