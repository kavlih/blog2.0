import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// MUI Components
import Box from '@mui/material/Box';

import { UserContext } from '../../context/UserContext';
import { postHelper, userHelper } from '../../helpers';
import PostList from "../../components/post/PostList";
import UserCard from '../../components/user/UserCard';

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
  const [ receiver, setReceiver ] = useState(null);
  useEffect(() => {
    if(user.username === username) {
      navigate("/profile");
    }

    let isMounted = true;

    const fetchPosts = async () => {
      const res = await userHelper.getUser(username);
      if (isMounted) {
        setReceiver(res.data.result);
      }
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [user.username, username, navigate]);

  return (
  <>
    {receiver &&
      <div>
        <UserCard receiver={receiver} isButton={false} />
        <Box component="section">
          <UserPosts username={receiver.username} />
        </Box>
      </div>
    }
  </>
  );
}
