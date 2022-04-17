import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';

import InputAdornment from '@mui/material/InputAdornment';

import FormHelperText from '@mui/material/FormHelperText';
// MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import { UserContext } from '../../context/UserContext';
import { accountHelper } from '../../helpers';

export default function Settings() {
  const { user, setUser } = useContext(UserContext)

  const initialValues = {
    email: [],
    username: [],
    password: {
      old: '',
      new: '',
      newRepeat: '',
    },
    delete: [],
  }

  const [ formErrors, setFormErrors ] = useState(initialValues);
  const [ formValues, setFormValues ] = useState(initialValues);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value}); 
  };

  const handleSubmitUsername = async (e) => {
    e.preventDefault();

    const fields = new FormData();
    fields.append('username', formValues.username);

    try {
      await accountHelper.updateUsername(user.id, fields);
      setUser({...user, 'username': formValues.username});
      setFormErrors({...formErrors, 'username': initialValues.username});
      setFormValues({...formValues, 'username': initialValues.username});
    }
    catch(error) {
      setFormErrors({...formErrors, 'username': error.response.data.errors.username})
    }
  }
 
  return (
    <>
      <Container maxWidth='xs'>
        <Box
          component='form'
          autoComplete="off"
          mb={6}
          sx={{ 
            display: 'flex', 
            gap: '20px',
            flexDirection: 'column', 
            padding: '15px',
            border: '1px solid'
          }}
        >
          <FormControl 
            error={formErrors.username.length ? true : false}
          >
            <FormLabel>Change username</FormLabel>
            <Typography variant='body2'>Current username: {user.username}</Typography>
            <OutlinedInput
              value={formValues.username}
              name='username'
              onChange={handleChange}
              aria-describedby="input change username"
            />
            {formErrors.username.map((error) => (
              <FormHelperText key={error}>{error}</FormHelperText>
            ))}
          </FormControl>
          <IconButton 
            variant='submit'
            type='submit'
            aria-label='submit change username'
            onClick={handleSubmitUsername} 
          >
            <ArrowForwardRoundedIcon fontSize='large' />
          </IconButton>
        </Box>
      </Container>
    </>
  );
}