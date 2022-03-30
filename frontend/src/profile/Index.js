import React, { useState, useEffect, useContext } from 'react';

import { postService } from '../_services';
import { UserContext, Post } from "../_components";

const Profile = () => {
  const { user } = useContext(UserContext)

  const [posts, setPosts] = useState(null)
  const [likes, setLikes] = useState(null)

  useEffect(() => {
    let isMounted = true;
    postService.getUserPosts(user.id)
    .then((res) => {
      if(isMounted) setPosts(res.data.result)
    })
    .catch((error) => {
      // console.log(error.response.data.errors);
    })
    return () => {
      isMounted = false;
      };
  }, []);

  useEffect(() => {
    let isMounted = true;
    postService.getUserLikes(user.id)
    .then((res) => {
      if(isMounted) setLikes(res.data.result)
    })
    .catch((error) => {
      // console.log(error.response.data.errors);
    })
    return () => {
      isMounted = false;
      };
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
