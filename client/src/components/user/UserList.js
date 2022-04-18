import React from 'react';
// MUI Components
import Grid from '@mui/material/Grid';

import UserCard from './UserCard';
import NoContent from '../NoContent';

const UserList = ({ users, itemWidth=6 }) => {
  return (
  <>
    {users 
      ? <Grid 
          container
          spacing={2}
        >
          {users.map(( user ) => ( 
            <Grid item key={user.id} xs={12} sm={itemWidth} sx={{ padding: 0 }} >
              <UserCard receiver={user} />
            </Grid>
          ))}
        </Grid>
      : <NoContent headline='No Users' />}
  </>
  );
}

export default UserList;
