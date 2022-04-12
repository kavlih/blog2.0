import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// MUI Icons
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import { UserContext } from '../../context/UserContext';
import { identiconService } from '../../services';
import PostActions from './PostActions';

const Post = ({ post, setIsSubmit }) => {
  const { user } = useContext(UserContext);
  
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
    <Stack direction="row" spacing={{xs: 1, sm: 2}} width={"100%"}>
      {/* Avatar */}
      <Link 
        href={post.user_id === user.id ? "/profile" : `/users/${post.username}`}
        sx={{ height: {xs: "40px", sm: "60px"} }}
      >
        <Avatar 
          src={identiconService(post.identicon)}
          alt={user.username}
        />        
      </Link>
      {/* Post inner */}
      <Card sx={{ width: "100%" }} >
        {/* Content */}
        <CardContent>
          {/* Header */}
          <Stack 
            direction="row"
            justifyContent="space-between"
            sx={{ 
              marginTop: "-10px",
              marginBottom: "10px" 
            }}
            >
            {/* Header start */}
            <Stack 
              direction="row" 
              alignItems="center" 
              spacing={2} 
            >
              {/* Username */}
              <Stack 
                component={Link}
                direction="row"
                alignItems="center"
                href={post.user_id === user.id ? "/profile" : `/users/${post.username}`}
              >
                <CircleOutlinedIcon 
                  fontSize="4px" 
                  sx={{
                    marginRight: "5px",
                    color: "text.secondary"
                  }} 
                />
                <Typography 
                  variant="bodyMonoBold" 
                  fontSize="small"
                  sx={{ color: "text.primary" }}
                >
                  {post.username}
                </Typography>
              </Stack>
              {/* Date */}
              <Typography 
                variant="bodyMono" 
                fontSize="small"
                sx={{ color: "text.secondary" }}
              >
                {date}
              </Typography>
            </Stack>
            {/* Header end */}
            <PostActions post={post} setIsSubmit={setIsSubmit}/>
          </Stack>
          {/* Message */}
          <Typography variant="body1" >
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