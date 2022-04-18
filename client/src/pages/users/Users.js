import React, { useState } from 'react';
// MUI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
// MUI Icons
import SearchIcon from '@mui/icons-material/Search';

import { userHelper } from '../../helpers';
import UserList from '../../components/user/UserList';
import StyledForm from '../../components/StyledForm';

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
        <StyledForm component='form' mb={6}>
          <FormControl>
            <InputBase
              value={inputValue}
              onChange={handleChange}
              aria-describedby="search user"
              placeholder='search user'
              sx={{ height:'60px' }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton 
                    aria-label='search'
                    type='submit' 
                    onClick={handleSubmit}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </StyledForm>
        {isSubmit && searchResult && <Typography variant='h6' textAlign='center' mb={2}>{searchResult.length} user{searchResult.length > 1 ? 's' : ''} found</Typography>}
        <Box component='section'>
          <UserList users={searchResult} itemWidth={12} />
        </Box>
      </Container>
    </>
  );
}

export default Users;