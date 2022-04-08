import React, { useState, useEffect, useContext } from 'react';

import { postHelper } from '../../helpers';
import { UserContext } from "../../context/UserContext";
import Nav from '../../components/Nav';
import PostForm from "../../components/post/PostForm";
import PostContainer from "../../components/post/PostContainer";

const Profile = () => {
  const { user } = useContext(UserContext)

  const [posts, setPosts] = useState(null)
  const [likes, setLikes] = useState(null)

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getUserPosts(user.id);
      if (isMounted) setPosts(res.data.result);
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [user.id]);

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      const res = await postHelper.getUserLikes(user.id);
      if (isMounted) setLikes(res.data.result);
    };
    fetchPosts()
      .catch(console.error);;

    return () => isMounted = false;
  }, [user.id]);

  return (
  <>
    <Nav />
    <div className="main-container">
      <PostForm />
      <section>
        <h1 className="text-center mb-4">my posts</h1>
        <PostContainer posts={posts} />
      </section>
      <section>
        <h1 className="text-center mb-4">my likes</h1>
        <PostContainer posts={likes} />
      </section>
    </div>
  </>
  );
}

export default Profile;
