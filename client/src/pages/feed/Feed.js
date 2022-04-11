import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import Container from '@mui/material/Container';

import { UserContext } from "../../context/UserContext";
import { postHelper } from '../../helpers';
import Nav from '../../components/Nav';
import PostForm from "../../components/post/PostForm";
import PostList from "../../components/post/PostList";

const Feed = () => {
  const { user } = useContext(UserContext)

  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    isSubmit && setIsSubmit(false);
  }, [isSubmit])
  
  const [ posts, setPosts ] = useState(null)
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getPosts(user.id);
      if (isMounted) {
        setPosts(res.data.result);
      }
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [user.id, isSubmit]);

  return (
  <>
    <Nav />
    <Container maxWidth="md" sx={{ minWidth: "350px" }} >
      <PostForm setIsSubmit={setIsSubmit} />
      <PostList posts={posts} setIsSubmit={setIsSubmit} />
    </Container>
  </>
  );
}

export default Feed;
