import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import { UserContext } from "../../context/UserContext";
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

  const [isUserSubmit, setIsUserSubmit] = useState(false);
  const [isPostSubmit, setIsPostSubmit] = useState(false);
  useEffect(() => {
    isPostSubmit && setIsPostSubmit(false);
    isUserSubmit && setIsUserSubmit(false);
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
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getUserPosts(user.username);
      if (isMounted) {
        setPosts(res.data.result);
        setPostsCount(res.data.result.length)
      }
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [user.username, isPostSubmit]);

  const [likes, setLikes] = useState(null)
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getUserLikes(user.username);
      if (isMounted) {
        setLikes(res.data.result);
        setLikesCount(res.data.result.length);
      }
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [user.username, isPostSubmit]);

  const [followers, setFollowers] = useState(null)
  const [following, setFollowing] = useState(null)
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      if (isMounted) {
        let res = await userHelper.getFollowers(user.id);
        let res2 = await userHelper.getFollowing(user.id);
        res = res.data.result;
        res2 = res2.data.result;

        res.forEach(user => {
          user["isFollowing"] = false;
          
          res2.forEach(user2 => {
            if(user.id === user2.id) {
              user["isFollowing"] = true;
            }
          });
        });

        res2.forEach(user => {
          user["isFollowing"] = true;
        });

        // console.log(res);

        setFollowers(res);
        setFollowing(res2);
        setFollowersCount(res.length);
        setFollowingCount(res2.length);
      }
    };
    fetchUsers()
      .catch(console.error);

    return () => isMounted = false;
  }, [user.id, isUserSubmit]);

  return (
  <>
    <UserCard receiver={user} />

    <PostForm setIsSubmit={isPostSubmit} />

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
        <PostList posts={posts} setIsSubmit={setIsPostSubmit} />
      </Box>
    }

    {/* Likes */}
    {nav === "likes" &&
      <Box component="section">
        <PostList posts={likes} setIsSubmit={setIsPostSubmit} />
      </Box>
    }

    {/* Followers */}
    {nav === "followers" &&
      <Box component="section">
        <UserList users={followers} setIsSubmit={setIsUserSubmit} />
      </Box>
    }
    
    {nav === "following" &&
      <Box component="section">
        <UserList users={following} setIsSubmit={setIsUserSubmit} />
      </Box>
    }
      
  </>
  );
}