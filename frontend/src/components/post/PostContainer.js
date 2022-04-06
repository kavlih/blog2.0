import React from 'react';

import Post from "./Post";

const PostContainer = ({ posts, setIsSubmit }) => {
  return (
  <>
  <div className="posts-container">
    {posts 
      ? posts.map((post) => ( 
        <Post key={post.id} post={post} setIsSubmit={setIsSubmit} />
        ))
      : <p>no posts</p>}
  </div>
  </>
  );
}

export default PostContainer;