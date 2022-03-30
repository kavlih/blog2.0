import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import { accountService, postService } from '../_services';
import { UserContext, Post, PostForm, Avatar } from "../_components";

const Feed = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();  

  const [ posts, setPosts ] = useState(null)

  const handleLogout = () => {
    accountService.logout()
    navigate("/account/login")
  };

  useEffect(() => {
    let isMounted = true;
    postService.getPosts(user.id)
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
    <div className="m-main-section m-auto col">
      <div className='d-none'>
        <div className='m-avatar'>
          <Avatar identicon={user.identicon} />
        </div>
        <p className='text-white'>{user.username}</p>
        {/* {user.role < 3 && <p>{user.role}</p>} */}
        <button onClick={handleLogout}>logout</button>
        <Link to="/settings">Settings</Link>
      </div>
      <div className="mb-5">
        <PostForm />
      </div>
      {posts 
      ? posts.map((post) => ( 
        <Post 
          key={post.id} 
          post={post}
        />
        ))
      : <p>no posts</p>}
    </div>
  </>
  );
}

export { Feed };
