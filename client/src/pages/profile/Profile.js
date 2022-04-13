import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { UserContext } from "../../context/UserContext";
import { postHelper } from '../../helpers';
import PostForm from "../../components/post/PostForm";
import PostList from "../../components/post/PostList";

const Profile = () => {
  const { user } = useContext(UserContext);

  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    isSubmit && setIsSubmit(false);
  }, [isSubmit])
  
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getUserPosts(user.username);
      if (isMounted) {
        setPosts(res.data.result);
      }
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [user.username, isSubmit]);

  const [likes, setLikes] = useState(null)
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getUserLikes(user.username);
      if (isMounted) {
        setLikes(res.data.result);
      }
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [user.username, isSubmit]);

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

export default Profile;
