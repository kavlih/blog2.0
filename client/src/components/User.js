import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { UserContext } from "../context/UserContext";
import { postHelper } from '../helpers';
import Nav from './Nav';
import PostForm from "./post/PostForm";
import PostList from "./post/PostList";

const User = ({ username }) => {
  const { user } = useContext(UserContext);
  const [isProfile, setIsProfile] = useState(false);
  useEffect(() => {
    user.username === username && setIsProfile(true);
  }, [user.username, username])

  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    isSubmit && setIsSubmit(false);
  }, [isSubmit])
  
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
  }, [username, isSubmit]);

  const [likes, setLikes] = useState(null)
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getUserLikes(username);
      if (isMounted) {
        setLikes(res.data.result);
      }
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [username, isSubmit]);

  return (
  <>
    <Typography variant="body1" color="white">
      Username: {username}
    </Typography>
    <PostForm />
    <Box component="section">
      <Typography variant="h3" align="center" gutterBottom>
        My posts
      </Typography>
      <PostList posts={posts} setIsSubmit={setIsSubmit} />
    </Box>
    <Box component="section">
      <Typography variant="h3" align="center" gutterBottom>
        My Likes
      </Typography>
      <PostList posts={likes} setIsSubmit={setIsSubmit} />
    </Box>
  </>
  );
}

export default User;
