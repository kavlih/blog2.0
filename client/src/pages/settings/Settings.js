import React, { useState, useContext } from 'react';
// MUI Components
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// MUI Icons
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { UserContext } from '../../context/UserContext';
import { accountHelper } from '../../helpers';
import StyledForm from '../../components/StyledForm';

export default function Settings() {
  const { user, setUser } = useContext(UserContext)

  const initialValues = {
    email: [],
    username: [],
    password: [],
    passwordNew: [],
    passwordNewRepeat: [],
    delete: [],
  }

  const [ formErrors, setFormErrors ] = useState(initialValues);
  const [ formValues, setFormValues ] = useState(initialValues);

  const [ isFocus, setIsFocus ] = useState('');
  const [ showPassword, setShowPassword ] = useState({
    password: false,
    passwordNew: false,
    passwordNewRepeat: false,
  });


  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value}); 
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setIsFocus(name);
    setFormErrors({...formErrors, [name]: initialValues.username});
  };

  const handleBlur = () => {
    setIsFocus('');
  };

  const handleClickShowPassword = () => {
    setShowPassword({...showPassword, [isFocus]: !showPassword[isFocus]});
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
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
  
  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    const fields = new FormData();
    fields.append('password', formValues.password)
    fields.append('passwordNew', formValues.passwordNew)
    fields.append('passwordNewRepeat', formValues.passwordNewRepeat)

    try {
      await accountHelper.updatePassword(user.id, fields);
      setFormErrors({...formErrors, 
        'password': initialValues.password,
        'passwordNew': initialValues.passwordNew,
        'passwordNewRepeat': initialValues.passwordNewRepeat
      });
      setFormValues({...formValues, 
        'password': initialValues.password,
        'passwordNew': initialValues.passwordNew,
        'passwordNewRepeat': initialValues.passwordNewRepeat
      });
    }
    catch(error) {
      setFormErrors({...formErrors, 
        'password': error.response.data.errors.password || [],
        'passwordNew': error.response.data.errors.passwordNew || [],
        'passwordNewRepeat': error.response.data.errors.passwordNewRepeat || []
      });
    }
  }
 
  return (
    <>
      <Container maxWidth='xs'>
        <Stack spacing={4}>
          {/* Update username form */}
          <StyledForm
            component='form'
            autoComplete="off"
          >
            <Card>
              <FormLabel>Change username</FormLabel>
              <FormControl error={formErrors.username.length ? true : false} >
                <Typography variant='body2'>Current username: {user.username}</Typography>
                <InputBase
                  value={formValues.username}
                  name='username'
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  aria-describedby="username"
                />
                {formErrors.username.map((error) => (
                  <FormHelperText key={error}>{error}</FormHelperText>
                ))}
              </FormControl>
            </Card>
            <IconButton 
              variant='submit'
              type='submit'
              aria-label='submit username'
              onClick={handleSubmitUsername} 
            >
              <ArrowForwardRoundedIcon fontSize='large' />
            </IconButton>
          </StyledForm>
          {/* Update email form */}
          <StyledForm
            component='form'
            autoComplete="off"
          >
            <Card>
              <FormLabel>Change email</FormLabel>
              <FormControl error={formErrors.email.length ? true : false} >
                <Typography variant='body2'>Current email: {user.email}</Typography>
                <InputBase
                  value={formValues.email}
                  name='email'
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  aria-describedby="email"
                />
                {formErrors.email.map((error) => (
                  <FormHelperText key={error}>{error}</FormHelperText>
                ))}
              </FormControl>
            </Card>
            <IconButton 
              variant='submit'
              type='submit'
              aria-label='submit email'
              onClick={handleSubmitEmail} 
            >
              <ArrowForwardRoundedIcon fontSize='large' />
            </IconButton>
          </StyledForm>
          {/* Update password form */}
          <StyledForm
            component='form'
            autoComplete="off"
          >
            <Card>
              <FormLabel>Change password</FormLabel>
              {/* Input password */}
              <FormControl variant='password' error={formErrors.password.length ? true : false} >
                <Typography variant='body2'>Current password</Typography>
                <InputBase
                  value={formValues.password}
                  type={showPassword.password ? 'text' : 'password'}
                  name='password'
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  aria-describedby="current password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword.password ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formErrors.password.map((error) => (
                  <FormHelperText key={error}>{error}</FormHelperText>
                ))}
              </FormControl>
              {/* Input passwordNew */}
              <FormControl variant='password' error={formErrors.passwordNew.length ? true : false} >
                <Typography variant='body2'>New password</Typography>
                <InputBase
                  value={formValues.passwordNew}
                  type={showPassword.passwordNew ? 'text' : 'password'}
                  name='passwordNew'
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  aria-describedby="new password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword.passwordNew ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formErrors.passwordNew.map((error) => (
                  <FormHelperText key={error}>{error}</FormHelperText>
                ))}
              </FormControl>
              {/* Input passwordNewRepeat */}
              <FormControl variant='password' error={formErrors.passwordNewRepeat.length ? true : false} >
                <Typography variant='body2'>New password repeat</Typography>
                <InputBase
                  value={formValues.passwordNewRepeat}
                  type={showPassword.passwordNewRepeat ? 'text' : 'password'}
                  name='passwordNewRepeat'
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  aria-describedby="new password repeat"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword.passwordNewRepeat ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formErrors.passwordNewRepeat.map((error) => (
                  <FormHelperText key={error}>{error}</FormHelperText>
                ))}
              </FormControl>
            </Card>
            <IconButton 
              variant='submit'
              type='submit'
              aria-label='submit change password'
              onClick={handleSubmitPassword} 
            >
              <ArrowForwardRoundedIcon fontSize='large' />
            </IconButton>
          </StyledForm>
        </Stack>
      </Container>
    </>
  );
}