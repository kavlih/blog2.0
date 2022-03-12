import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import { accountService, postsService } from '../_services';
import { UserContext } from "../_components";
// import { Post } from "../_components";

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
  }, [handleSubmitPost]);

  return (
  <>
    {posts && <div className="container-fluid h-100">
      <p>{JSON.stringify(user)}</p>
      <button onClick={handleSubmitPost}>create post</button>
      {posts.map(item => {
        return (
          <li key={item.id} className="m-post-container d-flex w-100 mb-4"> 
            <div className="d-flex">
              <div className="avatar-thumb">
                <Link to="/" className="d-flex justify-content-center align-items-center w-100 h-100">
                  <img className="default-img w-60" src="" alt="identicon"/>
                </Link>
              </div>
            </div>
        
            <div className="post-inner col d-flex">
              <div className="box">
                <div className="post-header d-flex justify-content-between">
                  <div className="post-username">
                    <Link to="/">{item.username}</Link>
                  </div>
                  <div className="post-date">
                    <p>{item.timestamp}</p>
                  </div>
                </div>
        
                <div className="post-message">
                  <p>{item.message}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
      <button onClick={handleLogout}>logout</button>
    </div>}
    {!posts && <p>no posts</p>}
  </>
  );
}

export { Feed };
