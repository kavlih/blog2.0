import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI Components
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

import { UserContext } from '../../context/UserContext';
import { SubmitContext } from '../../context/SubmitContext';
import { identiconService } from '../../services';
import { userHelper } from '../../helpers';

const StyledCard = styled(Card)(({ theme }) => ({ 
  width: '100%', 
  maxWidth:{sm: '450px'}, 
  backgroundColor: '#13161B', 

  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '& .MuiCardActions-root': {
    position: 'absolute',
    right: '16px',
    padding: '30px 0'
  },
  '& .MuiCardActionArea-root': {
    color: 'transparent',

    '&:hover .MuiCardHeader-title:before': {
      content: ''>'',
      marginRight: '4px'
    }
  },
}));

const useStyles = makeStyles(() => ({
  button: {
    width: '90px',
    '&> span': {
      display: 'none',
      marginRight: '4px'
    },
    '&:hover > span': {
      display: 'block'
    }
  }
})); 

const MyCardHeader = ({ receiver }) => {
  return (
    <CardHeader
      titleTypographyProps={{ 
        variant: 'body1',
        fontWeight: 500,
        fontSize: {sm: '1.125rem'},
        color: 'common.white'
      }}
      avatar={
        <Avatar 
          variant='post'
          src={identiconService(receiver.identicon)}
          alt={receiver.username}
        />
      }
      title={receiver.username}
      // subheader=''
    />
  );
};

export default function UserCard({ receiver, isButton=true }) {
  const { user } = useContext(UserContext);
  const { isUpdatedUser, setIsUpdatedUser } = useContext(SubmitContext);
  const classes = useStyles();

  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    setIsFollowing(receiver.followers.includes(user.id));
  }, [receiver.id, receiver.followers]);

  const navigate = useNavigate();  
  const handleClick = () => {
    navigate(`/users/${receiver.username}`);
  };

  const handleFollow = async () => {
    const fields = new FormData();
    fields.append('userId', user.id)
  
    try {
      await userHelper.follow(receiver.id, fields);
      setIsFollowing(!isFollowing);
      setIsUpdatedUser(!isUpdatedUser);
    }
    catch(err) {
      console.log(err);
    }
  };
  
  return (
  <>
  <StyledCard>
    {isButton 
      ? <CardActionArea onClick={handleClick}>
          <MyCardHeader receiver={receiver} />
        </CardActionArea>
      : <MyCardHeader receiver={receiver} />
    }
    {receiver.id !== user.id &&
      <CardActions>
      <Button 
        aria-label={isFollowing ? 'unfollow' : 'follow'}
        onClick={handleFollow}
        className={classes.button}
        sx={{
          color: isFollowing ? 'default' : 'success.main',
          '&:hover': {
            color: isFollowing ? 'error.main' : 'default'
          }
        }}
      >
        <span>{'>'}</span>{isFollowing ? 'unfollow' : 'follow'}
      </Button>
      </CardActions>
    }
  </StyledCard>
  </>
  );
};