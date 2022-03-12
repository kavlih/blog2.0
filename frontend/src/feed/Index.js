import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'

import { accountService, postsService } from '../_services';
import { UserContext, Post } from "../_components";

const Feed = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate();  

  const [posts, setPosts] = useState(null)

  const handleLogout = () => {
    accountService.logout()
    navigate("/account/login")
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('user_id', '1');
    formData.append('message', 'Post Content, for some reason i need to type some more letters...');

    postsService.createPost(formData)
    .then((res) => {
      console.log(res?.data);
    })
    .catch((res) => {
      console.log(res);
    });
  }

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
    {posts && <div className="container-fluid h-100">
      <p>{JSON.stringify(user)}</p>
      <button onClick={handleLogout}>logout</button>
      <button onClick={handleSubmitPost}>create post</button>
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
