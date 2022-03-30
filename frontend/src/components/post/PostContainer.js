import React, { useState, useEffect, useContext } from 'react';

import { postHelper } from '../../helpers';
import Post from "./Post";
import { UserContext } from "../../context/UserContext";

const PostContainer = ({ username }) => {
  const [ posts, setPosts ] = useState(null)
  const { user } = useContext(UserContext)

  useEffect(() => {
    let isMounted = true;
    postHelper.getPosts(user.id)
    .then((res) => {
      if(isMounted) setPosts(res.data.result);
    })
    .catch((error) => {
      // console.log(error.response.data.errors);
    })
    return () => {
      isMounted = false;
      };
    // ?? how to achieve that without infinite loop (syncs post values automaticaly)
  // }, [posts]);
  }, []);

  return (
  <>
  {posts 
    ? posts.map((post) => ( 
      <Post 
        key={post.id} 
        post={post}
      />
      ))
    : <p>no posts</p>}
  </>
  );
}

export default PostContainer;