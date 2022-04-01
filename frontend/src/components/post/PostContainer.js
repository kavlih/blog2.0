import React from 'react';

import Post from "./Post";

const PostContainer = ({ posts }) => {
  return (
  <>
  <div className="posts-container">
    {posts 
      ? posts.map((post) => ( 
        <Post key={post.id} post={post} />
        ))
      : <p>no posts</p>}
  </div>
  </>
  );
}

export default PostContainer;