import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom'

import { accountHelper, postHelper } from '../../helpers';
import { UserContext } from "../../context/UserContext";
// import { Identicon } from "../../components/Identicon";
import Nav from '../../components/Nav';
import PostForm from "../../components/post/PostForm";
import PostContainer from "../../components/post/PostContainer";

const Feed = () => {
  const { user } = useContext(UserContext)
  const [ posts, setPosts ] = useState(null)

  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    isSubmit && setIsSubmit(false);
  }, [isSubmit])
  
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getPosts(user.id);
      if (isMounted) setPosts(res.data.result);
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [user.id, isSubmit]);

  // const navigate = useNavigate();  

  // const handleLogout = () => {
  //   accountHelper.logout()
  //   navigate("/account/login")
  // };

  return (
  <>
    {/* <div>
      <div className='avatar-container'>
        <Identicon identicon={user.identicon} />
      </div>
      <p>{user.username}</p>
      <button onClick={handleLogout}>logout</button>
      <Link to="/settings">Settings</Link>
    </div> */}
    <Nav />
    <div className="main-container">
      <PostForm setIsSubmit={setIsSubmit}/>
      <PostContainer posts={posts} setIsSubmit={setIsSubmit}/>
    </div>
  </>
  );
}

export default Feed;
