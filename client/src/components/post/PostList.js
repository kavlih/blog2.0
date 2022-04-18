import React from 'react';
// MUI Components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';

import Post from './Post';
import NoContent from '../NoContent';

const PostList = ({ posts }) => {
  return (
  <>
    {posts 
      ? <Stack 
          component={List} 
          spacing={2}
          sx={{ p: 0, '&> li': { p: 0 } }}
        >
          {posts.map(( post ) => ( 
            <ListItem key={post.id}>
              <Post post={post} />
            </ListItem>
          ))}
        </Stack>
      : <NoContent headline='No Posts' />}
  </>
  );
}

export default PostList;
