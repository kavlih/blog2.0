import React, { useState, useContext } from 'react';
// MUI Components
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { makeStyles } from '@mui/styles';
// MUI Icons
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import { UserContext } from '../../context/UserContext';
import { identiconService } from '../../services';
import { postHelper } from '../../helpers';

const useStyles = makeStyles(( theme ) => ({
  textarea: {
    padding: "22px 16px",
    outline: "none",
    resize: "none",
    width: "100%",
    minHeight: "16px",
    backgroundColor: "transparent",
    border: `1px solid ${theme.palette.secondary.dark}`,
    borderRadius: theme.shape.borderRadius,
    color: "white",
    fontFamily: theme.typography.body1.fontFamily,
    
    "&::placeholder": {
      fontFamily: 'Roboto Mono',
      color: theme.palette.text.secondary,
      opacity: "1",
    },
    "&:focus::placeholder": {
      color: "transparent",
    }
  },
  btnCreate: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.success.main,
    padding: "4px",
    "&:hover": {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.success.dark,
    }
  }
}));

const PostForm = ({ setIsSubmit }) => {
  const { user } = useContext(UserContext)
  const classes = useStyles();

  const [ messageValue, setMessageValue ] = useState("")
  const [ formErrors, setFormErrors ] = useState()

  const handleChange = (e) => {
    const {value} = e.target;
    setMessageValue(value);
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("message", messageValue);

    postHelper.createPost(user.id, formData)
    .then((res) => {
      console.log(res?.data);
      setIsSubmit(true);
      setFormErrors();
      setMessageValue("");
    })
    .catch((error) => {
      setFormErrors(error.response.data.errors);
    });
  }

  return (
  <>
    <Box 
      component="form" 
      method="POST" 
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: "50px"
      }}
    >
      <Stack direction="row" spacing={{ xs: 1, sm: 2 }} width={"100%"}>
        {/* Avatar */}
        <Avatar 
          variant="post"
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
      {formErrors && <Typography variant="body1" mt={2} sx={{ color: "red.main" }}>
        {formErrors}
      </Typography>}
      {/* Submit button */}
      <IconButton 
        aria-label="create post"
        onClick={handleSubmit} 
        className={classes.btnCreate}
        sx={{ marginTop: 2 }}
      >
        <ArrowForwardRoundedIcon fontSize="large" />
      </IconButton>
    </Box>
  </>
  );
}

export default PostForm;