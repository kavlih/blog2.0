import React from 'react';
// MUI Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';

import UserCard from './UserCard';
import { ReactComponent as SnoopySleep } from '../../assets/graphics/SnoopySleep.svg';

const Graphic = (props) => {
  return (
    <SvgIcon {...props}>
      <SnoopySleep />
    </SvgIcon>
  );
}

const EmptyList = () => {
  return (
    <Stack
      alignItems='center'
      alignSelf='center'
      margin='auto'
      sx={{
        width: '100%',
        maxWidth: '300px',
      }}
    >
      <Graphic 
        sx={{
          width: '50%',
          height: '100%',
          color: 'primary.light'
        }}  
      />
      <Typography variant='h4'>
        No Content
      </Typography>
    </Stack>
  );
}

export default function UserList({ users, itemWidth=6 }) {
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
      : <EmptyList />}
  </>
  );
}
