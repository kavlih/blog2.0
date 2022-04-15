import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// MUI Icons
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import { UserContext } from '../../context/UserContext';
import { SubmitContext } from '../../context/SubmitContext';
import { identiconService } from '../../services';
import PostActions from './PostActions';
import PostButton from './PostButton';

const useStyles = makeStyles(() => ({
  button: {
    marginTop: "-1px 0 0 0 !important",
    "&:hover": {
      marginLeft: "2px !important",
      marginRight: "-2px !important",
    },
    "& .MuiButton-startIcon>svg": {
      fontSize: "14px",
      marginTop: "1px !important"
    },
  }
}));

const PostAvatar = ({ post }) => {
  const { user } = useContext(UserContext);

  return (
    <Link 
      href={post.user_id === user.id ? "/profile" : `/users/${post.username}`}
      sx={{ mt:"7px", height: {xs: "40px", sm: "60px"} }}
    >
      <Avatar 
        variant="post"
        src={identiconService(post.identicon)}
        alt={user.username}
      />        
    </Link>
  );
}

const PostContent = ({ post }) => {
  const { user } = useContext(UserContext);
  const { setIsSubmit } = useContext(SubmitContext);

  const classes = useStyles();

  const [date, setDate] = useState("");
  useEffect(() => {
    const currentTime = Math.floor(Date.now() / 1000);
    let time = currentTime - post.timestamp;

    switch(true) {
      // 0s - 1m
      case time < 60:
        setDate("now");
        break;
      // 1m - 2m
      case time < 120:
        setDate("1 minute ago");
        break;
      // 2m - 1h
      case time < 3600:
        time = Math.floor(time / 60);
        setDate(`${time} minutes ago`);
        break;
      // 1h - 2h
      case time < 7200:
        setDate("1 hour ago");
        break;                
      // 2h - 24h
      case time < 86400:
        time = Math.floor(time / 3600);
        setDate(`${time} hours ago`);
        break;
      // 1d - 2d
      case time < 172800:
        setDate("1 day ago");
        break;
      // 2d - 3d
      case time < 259200:
        time = Math.floor(time / 86400);
        setDate(`${time} days ago`);
        break;
      // > 3d
      default:
        const timestamp = post.timestamp * 1000
        const date = new Date(timestamp);

        let dd = date.getDate()
        dd = dd < 10 ? "0" + dd : dd

        let mm = date.getMonth() + 1
        mm = mm < 10 ? "0" + mm : mm

        let yy = date.getFullYear()
        yy = yy.toString().substring(2)        
          
        setDate(`${dd}.${mm}.${yy}`);
        break;
    }
  }, [post]);

  return (
    <CardContent sx={{ "&:last-child": { pb:"16px" } }}>
      {/* Header */}
      <Stack 
        direction="row"
        justifyContent="space-between"
        sx={{ mt: "-10px" }}
      >
        <Stack 
          direction="row" 
          alignItems="center" 
          spacing={2} 
        >
          {/* Username */}
          <PostButton
            aria-label="user"
            href={post.user_id === user.id ? "/profile" : `/users/${post.username}`}
            size="small"
            className={classes.button}
            startIcon={<CircleOutlinedIcon />}
          >
            {post.username}
          </PostButton>
          {/* Date */}
          <Typography 
            variant="body2" 
            fontSize="small"
          >
            {date}
          </Typography>
        </Stack>
        {/* Header end */}
        <PostActions post={post} />
      </Stack>
      {/* Message */}
      <Typography variant="body1" >
        {post.message}
      </Typography>
    </CardContent>
  );
}

// const PostMedia = ({ post }) => {
//   return (
//     <CardMedia
//       component="img"
//       height="100%"
//       image="/static/images/cards/paella.jpg"
//       alt=""
//     />
//   );
// }

export default function Post({ post, setIsSubmit }) {
  return (
  <>
    <Box component={Stack} direction="row" spacing={{xs: 1, sm: 2}} width={"100%"}>
      <PostAvatar post={post} />
      <Card sx={{ width: "100%" }} >
        <PostContent post={post} setIsSubmit={setIsSubmit} />
        {/* <PostMedia post={post} /> */}
      </Card>
    </Box>
  </>
  );
}