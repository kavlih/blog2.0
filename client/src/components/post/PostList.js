import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import Post from "./Post";

const PostList = ({ posts, setIsSubmit }) => {
  return (
  <>
    {posts 
      ? <List>
          {posts.map((post) => ( 
            <ListItem key={post.id} >
              <Post post={post} setIsSubmit={setIsSubmit} />
            </ListItem>
          ))}
      </List>
      : <Typography variant="body" component="p">
        no posts
      </Typography>}
  </>
  );
}

export default PostList;