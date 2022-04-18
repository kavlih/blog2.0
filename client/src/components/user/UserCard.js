import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI Components
import { styled } from '@mui/material/styles';
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
  backgroundColor: theme.palette.secondary.dark, 
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '& .MuiCardActions-root': {
    position: 'absolute',
    right: '16px',
    padding: '30px 0'
  },
  '& .MuiButton-root': {
    fontFamily: theme.typography.body2.fontFamily
  },
  '& .MuiCardActionArea-root': {
    color: 'transparent',
  },
  '& .MuiCardActionArea-root:hover .MuiCardHeader-title:before, & .MuiButton-root:hover span:before': {
    content: "'>'",
    marginRight: '4px'
  },
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

  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    user && setIsFollowing(receiver.followers.includes(user.id));
  }, [user, receiver.followers]);

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

  const [buttonValue, setButtonValue] = useState('');
  useEffect(() => {
    if(user && receiver.id === user.id){
     setButtonValue('you');
    }
    else if(isFollowing) {
     setButtonValue('unfollow');
    }
    else {
     setButtonValue('follow');
    }
  }, [receiver.id, user, isFollowing])
  
  return (
    <StyledCard>
      {isButton 
        ? <CardActionArea onClick={handleClick}>
            <MyCardHeader receiver={receiver} />
          </CardActionArea>
        : <MyCardHeader receiver={receiver} />
      }
      {user &&
        <CardActions>
          <Button 
            aria-label={isFollowing ? 'unfollow' : 'follow'}
            onClick={handleFollow}
            disabled={receiver.id === user.id && true}
            sx={{
              color: isFollowing ? 'default' : 'success.main',
              '&:hover': {
                color: isFollowing ? 'error.main' : 'default'
              }
            }}
          >
            <span>{buttonValue}</span>
          </Button>
        </CardActions>
      }
    </StyledCard>
  );
};