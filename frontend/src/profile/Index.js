import React, { useState, useEffect, useContext } from 'react';

import { postsService } from '../_services';
import { UserContext, Post } from "../_components";

const Profile = () => {
  const { user } = useContext(UserContext)

  const [posts, setPosts] = useState(null)
  const [likes, setLikes] = useState(null)

  useEffect(() => {
    postsService.getUserPosts(user.id)
    .then((res) => {
      setPosts(res.data.result)
    })
    .catch((error) => {
      // console.log(error.response.data.errors);
    });
  }, [posts]);

  // ?? On chaning page, because of [likes]:
  // ?? Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function. Profile@http://localhost:3000/static/js/main.chunk.js:2366:63
  useEffect(() => {
    postsService.getUserLikes(user.id)
    .then((res) => {
      setLikes(res.data.result)
    })
    .catch((error) => {
      // console.log(error.response.data.errors);
    });
  }, [likes]);

  return (
  <>
    <div className="m-main-section m-auto col">
      <h1 className="text-center mb-4">my posts</h1>
      {posts 
        ? posts.map(item => { return ( <Post key={item.id} post={item}/> )}) 
        : <p>no posts</p>
      }

      <h1 className="text-center mb-4">my likes</h1>
      {likes 
        ? likes.map(item => { return ( <Post key={item.id} post={item}/> )}) 
        : <p>no likes</p>
      }
    </div>
  </>
  );
}

export { Profile };
