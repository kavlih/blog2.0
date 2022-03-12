import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'

import { accountService, postsService } from '../_services';
import { UserContext, Post, CreatePost } from "../_components";

const Feed = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();  

  const [posts, setPosts] = useState(null)

  const handleLogout = () => {
    accountService.logout()
    navigate("/account/login")
  };

  

  useEffect(() => {
    const formData = new FormData();
    formData.append("user_id", user.id)
    
    postsService.getPosts(formData)
    .then((res) => {
      setPosts(res.data.result)
    })
    .catch((res) => {
      console.log(res);
    });
  }, []);
  // ?? console.log(item)
  // }, [handleSubmitPost]);

  return (
  <>
    {posts && <div className="m-main-section m-auto col">
        <button onClick={handleLogout}>logout</button>
        <CreatePost />
        {posts.map(item => {
          // console.log(item);
          return (
            <Post key={item.id} post={item} />
          );
        })}
      </div>}
    {!posts && <p>no posts</p>}
  </>
  );
}

export { Feed };
