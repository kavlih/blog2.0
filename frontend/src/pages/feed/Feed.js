import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import { accountHelper, postHelper } from '../../helpers';
import { UserContext } from "../../context/UserContext";
import { Identicon } from "../../components/Identicon";
import Nav from '../../components/Nav';
import PostForm from "../../components/post/PostForm";
import PostContainer from "../../components/post/PostContainer";

const Feed = () => {
  const { user } = useContext(UserContext)
  const [ posts, setPosts ] = useState(null)

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getPosts(user.id);
      if (isMounted) setPosts(res.data.result);
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [user.id]);

  const navigate = useNavigate();  

  const handleLogout = () => {
    accountHelper.logout()
    navigate("/account/login")
  };

  return (
  <>
    <div className='d-none'>
      <div className='m-avatar'>
        <Identicon identicon={user.identicon} />
      </div>
      <p className='text-white'>{user.username}</p>
      {/* {user.role < 3 && <p>{user.role}</p>} */}
      <button onClick={handleLogout}>logout</button>
      <Link to="/settings">Settings</Link>
    </div>
    <Nav />
    <div className="main-container">
      <PostForm />
      <section>
        <h1 className="text-center mb-4">feed</h1>
        <PostContainer posts={posts} />
      </section>
    </div>
  </>
  );
}

export default Feed;
