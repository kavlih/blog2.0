import React, { useState, useEffect, useContext } from 'react';

import Stack from '@mui/material/Stack';

import { UserContext } from '../../context/UserContext';
import { SubmitContext } from '../../context/SubmitContext';
import { postHelper } from '../../helpers';
import PostForm from '../../components/post/PostForm';
import PostList from '../../components/post/PostList';

const Feed = () => {
  const { user } = useContext(UserContext);
  const { isUpdatedPost } = useContext(SubmitContext);
  
  const [ posts, setPosts ] = useState([]);
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getPosts(user.id);
      if (isMounted) {
        setPosts(res.data.result);
      }
    };
    fetchPosts()
      .catch(console.error);

    return () => isMounted = false;
  }, [user.id, isUpdatedPost]);

  return (
  <>
    <Stack spacing={6}>
      <PostForm />
      <PostList posts={posts} />
    </Stack>
  </>
  );
}

export default Feed;
