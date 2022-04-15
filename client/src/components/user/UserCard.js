import React, { useState, useEffect, useContext } from 'react';
// MUI Components
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

import { UserContext } from '../../context/UserContext';
import { identiconService } from '../../services';
import { userHelper } from '../../helpers';

const StyledCard = styled(Card)(({ theme }) => ({ 
  width: "100%", 
  maxWidth:{sm: "450px"}, 
  backgroundColor: "#13161B", 

  position: "relative",
  display: "flex",
  alignItems: "center",
  "& .MuiCardActions-root": {
    position: "absolute",
    right: "16px",
    padding: 0
  },
  "&:hover": {
    backgroundColor: "default"
  }
}));

const UserCard = ({ receiver, setIsSubmit }) => {
  const { user } = useContext(UserContext);
  
  const [isFollowing, setIsFollowing] = useState();
  useEffect(() => {
    setIsFollowing(receiver.isFollowing);
  }, [user.id, receiver.isFollowing]);

  const handleFollow = async () => {
    const fields = new FormData();
    fields.append("userId", user.id)
  
    try {
      await userHelper.toggleFollow(receiver.id, fields);
      setIsFollowing(!isFollowing);
      setIsSubmit(true);
    }
    catch(err) {
      // console.log(err.response.data.errors);
    }
  };
  
  return (
  <>
  <StyledCard>
    <CardActionArea>
      <CardHeader
        titleTypographyProps={{ 
          variant: "body1",
          fontWeight: 500,
          fontSize: {sm: "1.125rem"}
        }}
        avatar={
          <Avatar 
            variant="post"
            src={identiconService(receiver.identicon)}
            alt={receiver.username}
          />
        }
        title={receiver.username}
        // subheader=""
      />
    </CardActionArea>
    {receiver.id !== user.id &&
      <CardActions>
      <Button 
        aria-label={isFollowing ? "unfollow" : "follow"}
        onClick={handleFollow}
        sx={{
          width: "85px",
          color: isFollowing ? "default" : "success.main",
          "&>span": {
            display: "none"
          },
          "&:hover": {
            color: isFollowing ? "error.main" : "default",
            "&>span": {
              display: "block"
            }
          }
        }}
      >
        <span>{">"}</span>{isFollowing ? "unfollow" : "follow"}
      </Button>
      </CardActions>
    }
  </StyledCard>
  </>
  );
}

export default UserCard;