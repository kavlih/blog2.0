import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// MUI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { UserContext } from '../../context/UserContext';
import { SubmitContext } from '../../context/SubmitContext';
import { postHelper, userHelper } from '../../helpers';
import PostList from '../../components/post/PostList';
import UserCard from '../../components/user/UserCard';

const UserPosts = ({ username }) => {
  const { isUpdatedPost } = useContext(SubmitContext);

  const [posts, setPosts] = useState(null)
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getUserPosts(username);
      if (isMounted) {
        setPosts(res.data.result);
      }
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [username, isUpdatedPost]);

  return <PostList posts={posts} />;
}

export default function UserProfile() {
  const { username } = useParams();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const [ receiver, setReceiver ] = useState(null);
  useEffect(() => {
    if(user.username === username) {
      navigate('/profile');
    }

    let isMounted = true;

    const fetchPosts = async () => {
      const res = await userHelper.get(username);
      if (isMounted) {
        setReceiver(res.data.result);
      }
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [user.username, username, navigate]);

  return (
  <>
    {receiver &&
      <Stack spacing={6}>
        <Container maxWidth='xs'>
          <UserCard receiver={receiver} isButton={false} />
        </Container>
        <Box component='section'>
          <UserPosts username={receiver.username} />
        </Box>
      </Stack>
    }
  </>
  );
}
