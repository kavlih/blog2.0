import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import { UserContext } from "../../context/UserContext";
import { SubmitContext } from "../../context/SubmitContext";
import { postHelper, userHelper } from '../../helpers';
import PostForm from "../../components/post/PostForm";
import PostList from "../../components/post/PostList";
import UserCard from "../../components/user/UserCard";
import UserList from "../../components/user/UserList";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  justifyContent:"center",
  gap: "10px",
  '& .MuiToggleButtonGroup-grouped': {
    border: 0,
    padding: "7px 14px",
    '&:not(:first-of-type)': {
      borderRadius: 100,
    },
    '&:first-of-type': {
      borderRadius: 100,
    },
  },
}));

export default function Profile() {
  console.log("profile got rendered");

  const { user } = useContext(UserContext);
  const { postSubmit, setPostSubmit, userSubmit, setUserSubmit } = useContext(SubmitContext);

  useEffect(() => {
    postSubmit && setPostSubmit(false);
    userSubmit && setUserSubmit(false);
  });

  // Counters
  const [postsCount, setPostsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // Handlers
  const [nav, setNav] = useState("posts");
  const handleNav = (event, newTab) => {
    if (newTab !== null) {
      setNav(newTab);
    }
  };
  
  // Fetches
  const [posts, setPosts] = useState(null);
  const [likes, setLikes] = useState(null);
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      let res = await postHelper.getUserPosts(user.username);
      let res2 = await postHelper.getUserLikes(user.username);
      res = res.data.result;
      res2 = res2.data.result;

      if (isMounted) {
        setPosts(res);
        res ? setPostsCount(res.length) : setPostsCount(0);
        setLikes(res2);
        res2 ? setLikesCount(res2.length) : setLikesCount(0);
      }
    };
    fetchPosts()
      .catch(console.error);

    return () => isMounted = false;
  }, [user.username, postSubmit]);

  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      let res = await userHelper.getFollowers(user.id);
      let res2 = await userHelper.getFollowing(user.id);
      res = res.data.result;
      res2 = res2.data.result;
      
      res.forEach(e => {
        e["isFollowing"] = false;
        
        res2.forEach(e2 => {
          if(e.id === e2.id) {
            e["isFollowing"] = true;
          }
        });
      });

      res2.forEach(e => {
        e["isFollowing"] = true;
      });

      if (isMounted) {
        setFollowers(res);
        res ? setFollowersCount(res.length) : setFollowersCount(0);
        
        setFollowing(res2);
        res2 ? setFollowingCount(res2.length) : setFollowingCount(0);
      }
    };
    fetchUsers()
      .catch(console.error);

    return () => isMounted = false;
  }, [user.id, userSubmit]);

  return (
  <>
    {/* <UserCard receiver={user} /> */}

    <PostForm />

    <Stack spacing={"10px"} direction={{ xs:"column", sm:"row" }} justifyContent="center" >
      <StyledToggleButtonGroup
        size="small"
        value={nav}
        exclusive
        onChange={handleNav}
      >
        <ToggleButton value="posts" aria-label="posts">
          <Typography component="span" variant="body2">{postsCount > 0 && postsCount}</Typography>
          Posts
        </ToggleButton>
        <ToggleButton value="likes" aria-label="likes">
          <Typography component="span" variant="body2">{likesCount > 0 && likesCount}</Typography>
          Likes
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        size="small"
        value={nav}
        exclusive
        onChange={handleNav}
      >
        <ToggleButton value="followers" aria-label="followers">
          <Typography component="span" variant="body2">{followersCount > 0 && followersCount}</Typography>
          Followers
        </ToggleButton>
        <ToggleButton value="following" aria-label="following">
          <Typography component="span" variant="body2">{followingCount > 0 && followingCount}</Typography>
          Following
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Stack>

    {/* Posts */}
    {nav === "posts" &&
      <Box component="section">
        <PostList posts={posts} />
      </Box>
    }

    {/* Likes */}
    {nav === "likes" &&
      <Box component="section">
        <PostList posts={likes} />
      </Box>
    }

    {/* Followers */}
    {nav === "followers" &&
      <Box component="section">
        <UserList users={followers} />
      </Box>
    }
    
    {nav === "following" &&
      <Box component="section">
        <UserList users={following} />
      </Box>
    }
      
  </>
  );
}