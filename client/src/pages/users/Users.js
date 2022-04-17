import React, { useState } from 'react';
// MUI Components
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputBase from '@mui/material/InputBase';
// MUI Icons
import SearchIcon from '@mui/icons-material/Search';

import { userHelper } from '../../helpers';
import UserList from '../../components/user/UserList';

// const useStyles = makeStyles(( theme ) => ({
// }));

const Users = () => {
  // const classes = useStyles();

  const [ inputValue, setInputValue ] = useState('');
  const [ searchResult, setSearchResult ] = useState([]);

  const handleChange = (e) => {
    const {value} = e.target;
    setInputValue(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userHelper.search(inputValue);
      setSearchResult(res.data.result);
      setInputValue('');
    }
    catch(error) {
      // console.log(error);
    }
  }

  return (
    <>
      <Container maxWidth='xs'>
        <Box
          component='form'
          sx={{ 
            display: 'flex', 
            gap: '20px',
            flexDirection: 'column', 
          }}
        >
          <FormControl>
            <InputBase
              value={inputValue}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'search user' }}
              placeholder='Search user'
              sx={{ ml: 1, flex: 1 }}
            />
            <IconButton 
              type='submit' 
              onClick={handleSubmit}
              aria-label='search'
              sx={{ p: '10px' }} 
            >
              <SearchIcon />
            </IconButton>
          </FormControl>
        </Box>
        <Box component='section'>
          <UserList users={searchResult} itemWidth={12} />
        </Box>
      </Container>
    </>
  );
}

export default Users;