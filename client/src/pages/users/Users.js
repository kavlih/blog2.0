import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

const useStyles = makeStyles(( theme ) => ({
  textarea: {
    // padding: '22px 16px',
    // minHeight: '16px',
    // resize: 'none',
    
    width: '100%',
    outline: 'none',
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.secondary.dark}`,
    borderRadius: theme.shape.borderRadius,
    color: 'white',
    fontFamily: theme.typography.body1.fontFamily,
    
    '&::placeholder': {
      fontFamily: 'Roboto Mono',
      color: theme.palette.text.secondary,
      opacity: '1',
    },
    '&:focus::placeholder': {
      color: 'transparent',
    }
  }
}));

const Users = () => {
  const classes = useStyles();

  return (
    <>
      <Box
        component='form'
        className={classes.textarea}
        sx={{ 
          p: '2px 4px', 
          display: 'flex', 
          alignItems: 'center', 
        }}
      >
        <InputBase
          inputProps={{ 
            'aria-label': 'search user' 
          }}
          placeholder='Search user'
          sx={{ ml: 1, flex: 1 }}
        />
        <IconButton 
          type='submit' 
          aria-label='search'
          sx={{ p: '10px' }} 
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </>
  );
}

export default Users;