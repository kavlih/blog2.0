import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import { UserContext } from '../../context/UserContext';
import { SubmitContext } from '../../context/SubmitContext';
import { postHelper, userHelper } from '../../helpers';
import PostForm from '../../components/post/PostForm';
import PostList from '../../components/post/PostList';
import UserList from '../../components/user/UserList';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  justifyContent:'center',
  gap: '10px',

  '& .MuiToggleButtonGroup-grouped': {
      width: '115px',
      textTransform: 'uppercase',
      borderRadius: `${theme.shape.borderRadius}px !important`,
      border: 0,
      padding: '7px 14px',
      backgroundColor: 'rgba(255,255,255, 0.025)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255, 0.05)',
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.success.main,
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: theme.palette.success.light,
      },
      '& .MuiTypography-root': {
        opacity: 1,
        marginRight: '5px',
      }
    }
  },

  '& .MuiTypography-root': {
    color: theme.palette.text.primary,
    opacity: 0.25,
    marginRight: '5px',
  }
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
    <Stack>
      {/* Form */}
      <PostForm />
      {/* Navigation */}
      <Stack spacing={'10px'} mt={6} direction={{ xs:'column', sm:'row' }} justifyContent='center' >
        <StyledToggleButtonGroup
          size='small'
          value={nav}
          exclusive
          onChange={handleNav}
        >
          <ToggleButton value='posts' aria-label='posts' size='large'>
            <Typography component='span' variant='body2'>{posts && posts.length}</Typography>
            Posts
          </ToggleButton>
          <ToggleButton value='likes' aria-label='likes' size='large'>
            <Typography component='span' variant='body2'>{liked && liked.length}</Typography>
            Likes
          </ToggleButton>
        </StyledToggleButtonGroup>
        <StyledToggleButtonGroup
          size='small'
          value={nav}
          exclusive
          onChange={handleNav}
        >
          <ToggleButton value='followers' aria-label='followers' size='large'>
            <Typography component='span' variant='body2'>{followers && followers.length}</Typography>
            Followers
          </ToggleButton>
          <ToggleButton value='following' aria-label='following' size='large'>
            <Typography component='span' variant='body2'>{following && following.length}</Typography>
            Following
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Stack>
      {/* Content */}
      <Box component='section' mt={4}>
        {nav === 'posts' && <PostList posts={posts} />}
        {nav === 'likes' && <PostList posts={liked} />}
        {nav === 'followers' && <UserList users={followers} />}
        {nav === 'following' && <UserList users={following} />}
      </Box>
    </Stack>

      
  </>
  );
}