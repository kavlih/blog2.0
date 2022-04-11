import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
// MUI Icons
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import { UserContext } from '../../context/UserContext';
import { identiconService } from '../../services';
import PostActions from './PostActions';

const useStyles = makeStyles({
  avatar: {
    background: "white",
    padding: "10px",
    width: "40px",
    height: "40px"
  }
})

const Post = ({ post, setIsSubmit }) => {
  const { user } = useContext(UserContext);
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
  <>
    {/* Post */}
    <Stack direction="row" spacing={2} width={"100%"}>
      {/* Avatar */}
      <Link to={post.user_id === user.id ? "/profile" : `/users/${post.username}`}>
        <Avatar 
          src={identiconService(post.identicon)}
          alt={user.username}
          className={classes.avatar}
        />        
      </Link>
      {/* Post inner */}
      <Card sx={{ width: "100%" }}>
        {/* Content */}
        <CardContent>
          {/* Header */}
          <Stack 
            direction="row"
            justifyContent="space-between"
            sx={{ marginTop: "-10px" }}
            >
            {/* Header start */}
            <Stack direction="row" spacing={1} alignItems="center">
              {/* Username */}
              <Stack 
                component={Link}
                direction="row"
                alignItems="center"
                href={post.user_id === user.id ? "/profile" : `/users/${post.username}`}
              >
                <CircleOutlinedIcon sx={{marginRight: "5px"}} fontSize="small" />
                {post.username}
              </Stack>
              {/* Date */}
              <Typography 
                variant="body" 
                component="p"
              >
                {date}
              </Typography>
            </Stack>
            {/* Header end */}
            <PostActions post={post} setIsSubmit={setIsSubmit}/>
          </Stack>
          {/* Message */}
          <Typography variant="body2" color="text.secondary">
            {post.message}
          </Typography>
        </CardContent>
        {/* Attachments */}
        {/* <CardMedia
          component="img"
          height="100%"
          image="/static/images/cards/paella.jpg"
          alt=""
        /> */}
      </Card>
    </Stack>
  </>
  );
}

export default Post;