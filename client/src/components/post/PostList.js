import React from 'react';
// MUI Components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';

import Post from './Post';
import { ReactComponent as SnoopySleep } from '../../assets/graphics/SnoopySleep.svg';

const Graphic = (props) => {
  return (
    <SvgIcon {...props}>
      <SnoopySleep />
    </SvgIcon>
  );
}

const EmptyList = () => {
  return (
    <Stack
      alignItems= 'center'
      sx={{
        width: '100%',
        maxWidth: '300px',
        margin: 'auto'
      }}
    >
      <Graphic 
        sx={{
          width: '50%',
          height: '100%',
          color: 'primary.light'
        }}  
      />
      <Typography variant= 'h4' align= 'center'>
        No Content
      </Typography>
    </Stack>
  );
}

export default function PostList({ posts }) {
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
      : <EmptyList />}
  </>
  );
}
