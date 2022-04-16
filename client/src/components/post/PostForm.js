import React, { useState, useContext } from 'react';
// MUI Components
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';
// MUI Icons
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import { UserContext } from '../../context/UserContext';
import { SubmitContext } from '../../context/SubmitContext';
import { identiconService } from '../../services';
import { postHelper } from '../../helpers';

const useStyles = makeStyles(( theme ) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  },
  textarea: {
    padding: '22px 16px',
    outline: 'none',
    resize: 'none',
    width: '100%',
    minHeight: '16px',
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
  },
  btnCreate: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.success.main,
    padding: '4px',
    '&:hover': {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.success.dark,
    }
  }
}));

const PostForm = () => {
  const { user } = useContext(UserContext);
  const { isUpdatedPost, setIsUpdatedPost } = useContext(SubmitContext);
  const classes = useStyles();

  const [ messageValue, setMessageValue ] = useState('');
  const [ formErrors, setFormErrors ] = useState([]);

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
        aria-label='create post'
        onClick={handleSubmit} 
        className={classes.btnCreate}
      >
        <ArrowForwardRoundedIcon fontSize='large' />
      </IconButton>
    </Box>
  </>
  );
}

export default PostForm;