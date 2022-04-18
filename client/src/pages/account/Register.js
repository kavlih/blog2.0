// TODO Email verification
// TODO Alert on successful registration

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
// MUI Components
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// MUI Icons
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { accountHelper } from '../../helpers';
import StyledForm from '../../components/StyledForm';

const PASSWORD_MINLENGTH = 8;
const USERNAME_MINLENGTH = 3;
const USERNAME_MAXLENGTH = 16;

const REGEX_EMAIL    = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_USERNAME = /[^A-Za-z0-9]+/;

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow disableHoverListener classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor:theme.palette.common.black,
    boxShadow: theme.shadows[1],
    '& ul': {
      listStyle: 'none',
      margin: 0,
      padding: '5px',
      fontSize: 12,
      '& .valid': {
        color: theme.palette.success.main 
      }
    },
  },
}));

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };
  
  const [ formValues, setFormValues ] = useState(initialValues);
  const [ formErrors, setFormErrors ] = useState(initialValues);
  const [ stateVal, setStateVal ] = useState(initialValues);
  const [ isFocus, setIsFocus ] = useState({ username: false, email: false, password: false });

  const [ tooltipPwd, setTooltipPwd ] = useState({
    length:   false,
    letter:   false,
    number:   false,
    special:  false
  });

  const [ isSubmitDisabled, setIsSubmitDisabled ] = useState(true);
  const [ showPassword, setShowPassword ] = useState(false)

  // Sets isSubmitDisabled to false if all inputs are valid 
  useEffect(() => {
    setIsSubmitDisabled(stateVal.username && stateVal.email && stateVal.password ? false : true)
  }, [stateVal]);

  // Saves input value of target in formValues
  // Calls formValidate()
  // Saves errors in formErrors
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value}); 
    setFormErrors(formValidate(name, value));
  };
  // Sets isFocus of target to false
  const handleBlur = (e) => {
    setIsFocus({[e.target.name]: false});
  };
  
  // Sets isFocus of target to true
  const handleFocus = (e) => {
    const { name } = e.target;
    setIsFocus({[name]: true});
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Submits form and calls accountHelper.register()
  // Navigates to login on succes, else throws errors
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = new FormData();
    fields.append('username', formValues.username)
    fields.append('email', formValues.email)
    fields.append('password', formValues.password)
    
    try {
      await accountHelper.signUp(fields);
      navigate('/account/login');
    }
    catch(error) {
      let errors = error.response.data.errors
      console.log(errors);      
  
      // ?? doesn't work as expected
      // for (const [key, value] of Object.entries(errors)) {        
      //   setStateVal({...stateVal, [key]: false})
      //   setFormErrors({...formErrors, [key]: [value]});
      // }
    }
  };

  // Validates an input
  // Sets stateVal of input to true if value was valid, to false if not
  // Returns Errors
  const formValidate = (name, value) => { 
    let errors = {...formErrors, [name]: []};

    switch (name) {
      case 'username':
        if (!value) {
          errors[name] = 'Please type in a username';
        }
        else if (value.length < USERNAME_MINLENGTH) {
          errors[name] = `Username is too short`;
        }
        else if (value.length > USERNAME_MAXLENGTH) {
          errors[name] = `Username is too long`;
        }
        else if (REGEX_USERNAME.test(value)) {
          errors[name] = 'Use only letters or numbers';
        }
        break;

      case 'email':
        if (!value) {
          errors[name] = 'Please type in an email';
        } 
        else if (!REGEX_EMAIL.test(value)) {
          errors[name] = 'Email is invalid';
        }
        break;

      case 'password':
        if (!value) {
          errors[name] = 'Please type in a password';
        } 
        else if (
          value.length < PASSWORD_MINLENGTH ||
          !value.match(/\d/) ||
          !value.match(/\W/) ||
          !value.match(/[A-Z]/) || 
          !value.match(/[a-z]/)
        ) {
          errors[name] = 'Password is invalid';
        }
    
        setTooltipPwd({
          length: value.length >= PASSWORD_MINLENGTH,
          number: value.match(/\d/),
          special: value.match(/\W/),
          letter: value.match(/[A-Z]/) && value.match(/[a-z]/)
        });

        break;
      default:
        break;
    }

    if(value && errors[name].length === 0) {
      setStateVal({...stateVal, [name]: true})
    }
    else {
      setStateVal({...stateVal, [name]: false})
    }
    return errors;
  };

  return (
    <StyledForm component='form' >
      <Card>
        <FormLabel sx={{ alignSelf:'center' }}>Sign up</FormLabel>
        {/* Input username */}
        <FormControl error={formErrors.username ? true : false} >
          <Typography variant='body2'>Username</Typography>
          <StyledTooltip
            title={
              <ul>
                <li>• Use 3-16 characters</li>
                <li>• Only letters or numbers</li>
              </ul>
            }
          >
            <InputBase
              value={formValues.username}
              name='username'
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-describedby="username"
              autoFocus={true}
              autoComplete='off'
              required
            />
          </StyledTooltip>
          {/* <Tooltip fieldName='username' message={
            <p className='mb-0'>use 3-16 characters &<br />only letters or numbers</p>} 
          /> */}
          {formErrors.username && !isFocus.username && <FormHelperText>{formErrors.username}</FormHelperText>}
        </FormControl>
        {/* Input email */}
        <FormControl error={formErrors.email ? true : false} >
          <Typography variant='body2'>email</Typography>
          <InputBase
            value={formValues.email}
            name='email'
            type='email'
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-describedby="email"
            required
          />
          {formErrors.email && !isFocus.email && <FormHelperText>{formErrors.email}</FormHelperText>}
        </FormControl>
        {/* Input password */}
        <FormControl variant='password' error={formErrors.password ? true : false} >
          <Typography variant='body2'>Password</Typography>
          <StyledTooltip
            title={
              <ul>
                <li className={`${tooltipPwd.length   ? 'valid' : ''}`}>• Use 8 or more characters</li>
                <li className={`${tooltipPwd.letter   ? 'valid' : ''}`}>• Use upper and lower case characters</li>
                <li className={`${tooltipPwd.number   ? 'valid' : ''}`}>• Use a number</li>
                <li className={`${tooltipPwd.special  ? 'valid' : ''}`}>• Use a speacial character</li>
              </ul>
            }
          >
            <InputBase
              value={formValues.password}
              type={showPassword ? 'text' : 'password'}
              name='password'
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
          </StyledTooltip>
          {formErrors.password && !isFocus.password && <FormHelperText>{formErrors.password}</FormHelperText>}
          {/* {submitErrors && <FormHelperText>{submitErrors}</FormHelperText>} */}
        </FormControl>
        <Typography 
          variant='caption' 
          textAlign='center' 
        >
          By signing up you agree to our <br /><Link to='/'>Terms of Use</Link> & <Link to='/'>Privacy Policy</Link>.
        </Typography>
        <Typography 
          variant='caption' 
          textAlign='center' 
        >
          Already have an account? <Link to='/account/login'>Login!</Link>
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

export default Register;
