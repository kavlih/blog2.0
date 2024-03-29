import React, { useState, useEffect, useContext, useRef } from 'react';
// MUI Components
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';
// MUI Icons
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { UserContext } from '../../context/UserContext';
import { SubmitContext } from '../../context/SubmitContext';
import { identiconService } from '../../services';
import { postHelper } from '../../helpers';

const MESSAGE_MINLENGTH = 15;
const MESSAGE_MAXLENGTH = 400;

const useStyles = makeStyles(( theme ) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  },
  textarea: {
    width: '100%',
    padding: '22px 16px',
    minHeight: '16px',
    resize: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.shape.borderRadius,
    color: 'white',
    fontFamily: theme.typography.body1.fontFamily,
    
    '&::placeholder': {
      fontFamily: 'Roboto Mono',
      color: theme.palette.text.secondary,
      opacity: '1',
    }
  }
}));

const PostForm = () => {
  const { user } = useContext(UserContext);
  const { isUpdatedPost, setIsUpdatedPost } = useContext(SubmitContext);
  const classes = useStyles();

  const [ messageValue, setMessageValue ] = useState('');
  const [ formErrors, setFormErrors ] = useState([]);
  const [ isValid, setIsValid ] = useState(false);

  const handleChange = (e) => {
    const {value} = e.target;
    setMessageValue(value);
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('message', messageValue);

    try {
      await postHelper.createPost(user.id, formData);
      setMessageValue('');
      if(formErrors) setFormErrors([]);
      setIsUpdatedPost(!isUpdatedPost);
    }
    catch(err) {
      setFormErrors(err.response.data.errors);
    }
  }

  // validates messageValue on change
  useEffect(() => {
    setFormErrors([])
    let valid = false;

    if (messageValue.length >= MESSAGE_MINLENGTH && messageValue.length <= MESSAGE_MAXLENGTH) {
      valid = true;
    }
    else if (messageValue.length > MESSAGE_MAXLENGTH) {
      setFormErrors(['Message is too long'])
    }

    setIsValid(valid);

  }, [messageValue])

  return (
  <>
    <Box 
      component='form' 
      method='POST' 
      className={classes.box}
    >
      <Stack direction='row' spacing={{ xs: 1, sm: 2 }} width={'100%'}>
        {/* Avatar */}
        <Avatar 
          variant='post'
          src={identiconService(user.identicon)}
          alt={user.username}
        />
        {/* Textarea */}
        <TextareaAutosize 
          placeholder="what's on your mind?"
          value={messageValue}
          onChange={handleChange}
          required
          className={classes.textarea}
        />
      </Stack>
      {/* Form errors */}
      {formErrors.length > 0 && <Typography variant='body1' sx={{ color: 'error.main' }}>
        {formErrors}
      </Typography>}
      {/* Submit button */}
      <IconButton 
        variant='submit'
        type='submit'
        aria-label='create post'
        onClick={handleSubmit} 
        disabled={!isValid}
      >
        <ArrowForwardIosRoundedIcon />
      </IconButton>
    </Box>
  </>
  );
}

export default PostForm;