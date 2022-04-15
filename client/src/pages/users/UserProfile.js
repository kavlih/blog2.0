import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// MUI Components
import Box from '@mui/material/Box';

import { UserContext } from '../../context/UserContext';
import { postHelper } from '../../helpers';
import PostList from "../../components/post/PostList";

const UserPosts = ({ username }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    isSubmit && setIsSubmit(false);
  }, [isSubmit])
  
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getUserPosts(username);
      if (isMounted) {
        setPosts(res.data.result);
      }
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [username, isSubmit]);

  return <PostList posts={posts} setIsSubmit={setIsSubmit} />;
}

export default function UserProfile() {
  const { username } = useParams();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    
    if(user.username === username) {
      navigate("/profile");
    }
  }, [user.username, username, navigate]);

  return (
  <>
    <Box component="section">
      <UserPosts username={username} />
    </Box>
  </>
  );
}
