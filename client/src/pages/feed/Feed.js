import React, { useState, useEffect, useContext } from 'react';

import { UserContext } from "../../context/UserContext";
import { SubmitContext } from "../../context/SubmitContext";
import { postHelper } from '../../helpers';
import PostForm from "../../components/post/PostForm";
import PostList from "../../components/post/PostList";

const Feed = () => {
  console.log("feed got rendered");

  const { user } = useContext(UserContext);
  const { isSubmit, setIsSubmit } = useContext(SubmitContext);

  useEffect(() => {
    isSubmit && setIsSubmit(false);
  });
  
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
    <PostForm />
    <PostList posts={posts} />
  </>
  );
}

export default Feed;
