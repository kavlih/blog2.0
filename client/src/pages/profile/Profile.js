import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import { UserContext } from '../../context/UserContext';
import { SubmitContext } from '../../context/SubmitContext';
import { postHelper, userHelper } from '../../helpers';
import PostForm from '../../components/post/PostForm';
import PostList from '../../components/post/PostList';
import UserCard from '../../components/user/UserCard';
import UserList from '../../components/user/UserList';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  justifyContent:'center',
  gap: '10px',
  '& .MuiToggleButtonGroup-grouped': {
    border: 0,
    padding: '7px 14px',
    '&:not(:first-of-type)': {
      borderRadius: 100,
    },
    '&:first-of-type': {
      borderRadius: 100,
    },
  },
}));

export default function Profile() {
  const { user } = useContext(UserContext);
  const { isUpdatedPost, isUpdatedUser } = useContext(SubmitContext);

  const [nav, setNav] = useState('posts');
  const handleNav = (event, newTab) => {
    if (newTab !== null) {
      setNav(newTab);
    }
  };
  
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState([]);
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getUserPosts(user.username);
      const res2 = await postHelper.getUserLikes(user.username);

      if (isMounted) {
        setPosts(res.data.result);
        setLiked(res2.data.result);
      }
    };
    fetchPosts()
      .catch(console.error);

    return () => isMounted = false;
  }, [user.username, isUpdatedPost]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      const res = await userHelper.followers(user.id);
      const res2 = await userHelper.following(user.id);

      if (isMounted) {
        setFollowers(res.data.result);
        setFollowing(res2.data.result);
      }
    };
    fetchUsers()
      .catch(console.error);

    return () => isMounted = false;
  }, [user.id, isUpdatedUser]);

  return (
  <>
    {/* <UserCard receiver={user} /> */}

    <PostForm />

    <Stack spacing={'10px'} direction={{ xs:'column', sm:'row' }} justifyContent='center' >
      <StyledToggleButtonGroup
        size='small'
        value={nav}
        exclusive
        onChange={handleNav}
      >
        <ToggleButton value='posts' aria-label='posts'>
          <Typography component='span' variant='body2'>{posts.length > 0 && posts.length}</Typography>
          Posts
        </ToggleButton>
        <ToggleButton value='likes' aria-label='likes'>
          <Typography component='span' variant='body2'>{liked.length > 0 && liked.length}</Typography>
          Likes
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        size='small'
        value={nav}
        exclusive
        onChange={handleNav}
      >
        <ToggleButton value='followers' aria-label='followers'>
          <Typography component='span' variant='body2'>{followers.length > 0 && followers.length}</Typography>
          Followers
        </ToggleButton>
        <ToggleButton value='following' aria-label='following'>
          <Typography component='span' variant='body2'>{following.length > 0 && following.length}</Typography>
          Following
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Stack>

    {/* Posts */}
    {nav === 'posts' &&
      <Box component='section'>
        <PostList posts={posts} />
      </Box>
    }

    {/* Likes */}
    {nav === 'likes' &&
      <Box component='section'>
        <PostList posts={liked} />
      </Box>
    }

    {/* Followers */}
    {nav === 'followers' &&
      <Box component='section'>
        <UserList users={followers} />
      </Box>
    }
    
    {nav === 'following' &&
      <Box component='section'>
        <UserList users={following} />
      </Box>
    }
      
  </>
  );
}