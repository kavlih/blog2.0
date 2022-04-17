import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
// MUI Icons
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import { UserContext } from '../../context/UserContext';
import { accountHelper } from '../../helpers';

const useStyles = makeStyles(( theme ) => ({
  box: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    gap: '20px',
    
    padding: '15px',
    border: '1px solid',
  }
}));

export default function Settings() {
  const { user, setUser } = useContext(UserContext)
  const classes = useStyles();

  const initialValues = {
    email: [],
    username: [],
    passwordOld: [],
    passwordNew: [],
    passwordNewRepeat: [],
    delete: [],
  }

  const [ formErrors, setFormErrors ] = useState(initialValues);
  const [ formValues, setFormValues ] = useState(initialValues);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value}); 
  };

  const handleFocus = (e) => {
    setFormErrors({...formErrors, [e.target.name]: initialValues.username});
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
  
  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    const fields = new FormData();
    fields.append('email', formValues.email);

    try {
      await accountHelper.updateEmail(user.id, fields);
      setUser({...user, 'email': formValues.email});
      setFormErrors({...formErrors, 'email': initialValues.email});
      setFormValues({...formValues, 'email': initialValues.email});
    }
    catch(error) {
      setFormErrors({...formErrors, 'email': error.response.data.errors.email})
    }
  }
 
  return (
    <>
      <Container maxWidth='xs'>
        <Box
          component='form'
          autoComplete="off"
          className={classes.box}
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
              onFocus={handleFocus}
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
        <Box
          component='form'
          autoComplete="off"
          className={classes.box}
        >
          <FormControl 
            error={formErrors.email.length ? true : false}
          >
            <FormLabel>Change email</FormLabel>
            <Typography variant='body2'>Current email: {user.email}</Typography>
            <OutlinedInput
              value={formValues.email}
              name='email'
              onChange={handleChange}
              onFocus={handleFocus}
              aria-describedby="input change email"
            />
            {formErrors.email.map((error) => (
              <FormHelperText key={error}>{error}</FormHelperText>
            ))}
          </FormControl>
          <IconButton 
            variant='submit'
            type='submit'
            aria-label='submit change email'
            onClick={handleSubmitEmail} 
          >
            <ArrowForwardRoundedIcon fontSize='large' />
          </IconButton>
        </Box>
      </Container>
    </>
  );
}