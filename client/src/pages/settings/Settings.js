import React, { useState, useEffect, useContext } from "react";
// MUI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { UserContext } from "../../context/UserContext";
import { accountHelper } from "../../helpers";
import Nav from '../../components/Nav';

export default function Settings() {
  const { user } = useContext(UserContext)

  const [formValues, setFormValues] = useState({
    username: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value}); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = new FormData();
    fields.append("user_id", 1)
    
    try {
      const res = await accountHelper.updateIdenticon(fields);
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Nav />
      <Container maxWidth="md">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            error={false}
            id="outlined-error-helper-text"
            // label="Error"
            // defaultValue="Hello World"
            // helperText="Incorrect entry."
          />
        </Box>
      </Container>
    </>
  );
}