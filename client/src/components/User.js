import React, { useState, useEffect } from 'react';
// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { postHelper } from '../helpers';
import PostForm from "./post/PostForm";
import PostList from "./post/PostList";

const User = ({ username }) => {
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
