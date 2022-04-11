import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';

import Post from './Post';
import { ReactComponent as Snoopy } from '../../assets/graphics/Snoopy.svg';

const SnoopyGraphic = (props) => {
  return (
    <SvgIcon {...props}>
      <Snoopy />
    </SvgIcon>
  );
}

const NoContent = () => {
  return (
    <Stack
      alignItems= "center"
      sx={{
        width: "100%",
        maxWidth: "300px",
        margin: "auto"
      }}
    >
      <SnoopyGraphic 
        sx={{
          width: "50%",
          height: "100%",
          color: "primary.light"
        }}  
      />
      <Typography 
        variant= "h3" 
        align= "center"
        sx={{ color: "primary.main" }} 
      >
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
      : <NoContent />}
  </>
  );
}
