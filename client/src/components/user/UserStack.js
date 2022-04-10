import React, { useState, useEffect } from 'react';
// MUI Components
import Typography from '@mui/material/Typography';

import { postHelper } from '../../helpers';
import PostList from "../../components/post/PostList";

const UserStack = ({ username }) => {

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
    <section>
      <Typography>
        My posts
      </Typography>
      <PostList posts={posts} setIsSubmit={setIsSubmit} />
    </section>
    <section>
      <Typography>
        My Likes
      </Typography>
      <PostList posts={likes} setIsSubmit={setIsSubmit} />
    </section>
  </>
  );
}

export default UserStack;
