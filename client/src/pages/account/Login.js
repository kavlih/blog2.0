import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'
// MUI Components
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
// MUI Icons
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { UserContext } from '../../context/UserContext';
import { accountHelper } from '../../helpers';
import StyledForm from '../../components/StyledForm';

const Login = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate();

  const [ formValues, setFormValues ] = useState({ user: '', password: '' });
  const [ stateVal, setStateVal ] = useState({user: false, password: false});
  const [ formError, setFormError ] = useState('');
  const [ isSubmitDisabled, setIsSubmitDisabled ] = useState(true);
  const [ showPassword, setShowPassword ] = useState(false);

  // Sets isSubmitDisabled to false if all inputs are valid 
  useEffect(() => {
    setIsSubmitDisabled(stateVal.user && stateVal.password ? false : true)
  }, [stateVal]);

  // Saves input value of target in formValues
  // Calls formValidate()
  // Saves errors in formErrors
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value}); 
    setStateVal({...stateVal, [name]: value ? true : false});
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setFormError(''); 
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  
  // Submits form and calls accountHelper.login()
  // Navigates to feed on succes, else throws errors
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = new FormData();
    fields.append('user', formValues.user)
    fields.append('password', formValues.password)
    
    try {
      const res = await accountHelper.login(fields);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate('/feed');
    } 
    catch {
      setFormError("This combination doesn't exist")
    }
  };

  return (
    <StyledForm component='form' >
      <Card>
        <FormLabel sx={{ alignSelf:'center' }}>Login</FormLabel>
        {/* Input user */}
        <FormControl error={formError ? true : false} >
          <Typography variant='body2'>Username or email</Typography>
          <InputBase
            value={formValues.user}
            name='user'
            onChange={handleChange}
            onFocus={handleFocus}
            aria-describedby="username or email"
            autoFocus={true}
          />
        </FormControl>
        {/* Input password */}
        <FormControl variant='password' error={formError ? true : false} >
          <Typography variant='body2'>Password</Typography>
          <InputBase
            value={formValues.password}
            type={showPassword ? 'text' : 'password'}
            name='password'
            onChange={handleChange}
            onFocus={handleFocus}
            aria-describedby="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formError && <FormHelperText>{formError}</FormHelperText>}
        </FormControl>
        <Typography variant='caption' textAlign='center' >
          New to Woosh? <Link to='/account/register'>Sign up!</Link>
        </Typography>
      </Card>
      <IconButton 
        variant='submit'
        type='submit'
        aria-label='submit change password'
        onClick={handleSubmit} 
        disabled={isSubmitDisabled}
      >
        <ArrowForwardRoundedIcon fontSize='large' />
      </IconButton>
    </StyledForm>
  );
};

export default Login;
