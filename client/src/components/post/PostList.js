import React from 'react';

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
      alignItems= "center"
      sx={{
        width: "100%",
        maxWidth: "300px",
        margin: "auto"
      }}
    >
      <Graphic 
        sx={{
          width: "50%",
          height: "100%",
          color: "primary.light"
        }}  
      />
      <Typography variant= "h4" align= "center">
        No Content
      </Typography>
    </Stack>
  );
}

export default function PostList({ posts, setIsSubmit }) {
  return (
  <>
    {posts 
      ? <Stack 
          component={List} 
          spacing={2}
        >
          {posts.map(( post ) => ( 
            <ListItem key={post.id} sx={{ padding: 0 }} >
              <Post post={post} setIsSubmit={setIsSubmit} />
            </ListItem>
          ))}
        </Stack>
      : <EmptyList />}
  </>
  );
}
