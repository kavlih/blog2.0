import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import { accountService, postsService } from '../_services';
import { UserContext, Post, CreatePost, Avatar } from "../_components";

const Feed = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();  

  const [posts, setPosts] = useState(null)

  const handleLogout = () => {
    accountService.logout()
    navigate("/account/login")
  };

  useEffect(() => {
    postsService.getPosts(user.id)
    .then((res) => {
      setPosts(res.data.result)
    })
    .catch((error) => {
      console.log(error.response.data.errors);
    });
  }, []);

  return (
  <>
    <div className="m-main-section m-auto col">
      <div className='d-flex'>
        <Avatar identicon={user.identicon} />
        <p className='text-white'>{user.username}</p>
        {/* {user.role < 3 && <p>{user.role}</p>} */}
        <button onClick={handleLogout}>logout</button>
        <Link to="/settings">Settings</Link>
      </div>
      <CreatePost />
      {posts 
        ? posts.map(item => {
          console.log(item);
          return (
            <Post key={item.id} post={item}/>
          );
        }) 
        : <p>no posts</p>}
    </div>
  </>
  );
}

export { Feed };
