import React, { useContext } from 'react';
// MUI Components
import Container from '@mui/material/Container';

import { UserContext } from "../../context/UserContext";
import Nav from '../../components/Nav';
import PostForm from "../../components/post/PostForm";
import UserStack from "../../components/user/UserStack";

const Profile = () => {
  const { user } = useContext(UserContext)

  return (
  <>
    <Nav />
    <Container>
      <PostForm />
      <UserStack username={user.username} />
    </Container>
  </>
  );
}

export default Profile;
