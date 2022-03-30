import React from 'react';

import Post from "./Post";

const PostContainer = ({ posts }) => {
  return (
  <>
  {posts 
    ? posts.map((post) => ( 
      <Post key={post.id} post={post} />
      ))
    : <p>no posts</p>}
  </>
  );
}

export default PostContainer;