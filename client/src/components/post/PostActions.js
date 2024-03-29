import React, { useState, useEffect, useContext, useRef } from 'react';
// MUI Components
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
// MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { UserContext } from '../../context/UserContext';
import { SubmitContext } from '../../context/SubmitContext';
import { postHelper } from '../../helpers';

const LikeButton = ({ post }) => {  
  const { user } = useContext(UserContext);
  const { isUpdatedPost, setIsUpdatedPost } = useContext(SubmitContext);

  // set if posts is liked
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    setIsLiked(post.likes.includes(user.id));
  }, [user.id, post.likes]);

  // toggle like
  const toggleLike = async () => {
    const fields = new FormData();
    fields.append('userId', user.id)

    try {
      await postHelper.toggleLike(post.id, fields);
      setIsLiked(!isLiked);
      setIsUpdatedPost(!isUpdatedPost);
    }
    catch(error) {
      console.log(error);
    }
  };

  return(
    <Button 
      aria-label='like'
      onClick={toggleLike}
      size='small'
      endIcon={isLiked ? <FavoriteRoundedIcon fontSize='small' /> : <FavoriteBorderRoundedIcon fontSize='small' />}
      hoverColor={isLiked ? 'inherit' : 'error'}
      color={isLiked ? 'error' : 'inherit'}
      disableArrow
      sx={{
        padding: 0,
        minWidth: 'unset',
        '& .MuiButton-endIcon': {
          ml: '2px'
        }
      }}
    >
      {post.likes.length > 0 && post.likes.length}
    </Button>
  );
}

const MoreButton = ({ post }) => {
  const { user } = useContext(UserContext);
  const { isUpdatedPost, setIsUpdatedPost } = useContext(SubmitContext);

  // popper
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  
  // handle delete post
  const handleDelete = async () => {
    try {
      await postHelper.deletePost(post.id);
      setIsUpdatedPost(!isUpdatedPost);
    }
    catch(error) {
      console.log(error);
    }
  };

  return(
    <>
      <IconButton
        ref={anchorRef}
        aria-label='more'
        aria-controls={open ? 'menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        size='small'
        sx={{ width: '20px' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='menu'
                  onKeyDown={handleListKeyDown}
                >
                  {user.id === post.user_id 
                    ? <MenuItem onClick={handleDelete} disableRipple>
                        <DeleteIcon />
                        Delete Post
                      </MenuItem>
                    : <MenuItem disabled>
                        Report Post
                      </MenuItem>
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

const PostActions = ({ post }) => {
  return (
    <Stack direction='row' spacing={1} sx={{ mr:'-5px' }} >
      <LikeButton post={post} />
      <MoreButton post={post} />      
    </Stack>
  );
}

export default PostActions;