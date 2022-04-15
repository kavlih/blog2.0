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
      alignItems= "center"
      sx={{
        width: "100%",
        maxWidth: "300px",
        margin: "auto"
      }}
    >
      <Graphic 
        sx={{
          width: "50%",
          height: "100%",
          color: "primary.light"
        }}  
      />
      <Typography variant= "h4" align= "center">
        No Content
      </Typography>
    </Stack>
  );
}

export default function UserList({ users, setIsSubmit }) {
  return (
  <>
    {users 
      ? <Grid 
          container
          spacing={2}
        >
          {users.map(( user ) => ( 
            <Grid item key={user.id} xs={12} sm={6} sx={{ padding: 0 }} >
              <UserCard receiver={user} setIsSubmit={setIsSubmit} />
            </Grid>
          ))}
        </Grid>
      : <EmptyList />}
  </>
  );
}
