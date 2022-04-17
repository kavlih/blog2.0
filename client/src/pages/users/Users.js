import React, { useState } from 'react';
// MUI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
// MUI Icons
import SearchIcon from '@mui/icons-material/Search';

import { userHelper } from '../../helpers';
import UserList from '../../components/user/UserList';

const Users = () => {
  const [ inputValue, setInputValue ] = useState('');
  const [ searchResult, setSearchResult ] = useState([]);
  const [ isSubmit, setIsSubmit ] = useState(false);

  const handleChange = (e) => {
    const {value} = e.target;
    setInputValue(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userHelper.search(inputValue);
      setSearchResult(res.data.result);
      setIsSubmit(true);
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
          mb={6}
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
        {isSubmit && searchResult && <Typography variant='h6' textAlign='center' mb={2}>{searchResult.length} {searchResult.length > 1 ? 'users' : 'user'} found</Typography>}
        <Box component='section'>
          <UserList users={searchResult} itemWidth={12} />
        </Box>
      </Container>
    </>
  );
}

export default Users;