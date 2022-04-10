import React, { useState, useEffect, useContext, useRef } from 'react';
// MUI Components
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { UserContext } from '../../context/UserContext';
import { postHelper } from '../../helpers';

export default function PostActions ({ post, setIsSubmit }) {
  const { user } = useContext(UserContext);

  // Popper
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

  // Like action
  const [likes, setLikes] = useState(post.likes.length);

  const [isliked, setIsLiked] = useState(false);
  useEffect(() => {
    setIsLiked(post.likes.includes(user.id));
  }, [user.id, post.likes]);

  const handleLike = async () => {
    const fields = new FormData();
    fields.append("userId", user.id)

    try {
      await postHelper.toggleLike(post.id, fields);
      setLikes(isliked ? likes - 1 : likes + 1);
      setIsLiked(!isliked);
      setIsSubmit(true);
    }
    catch(err) {
      // console.log(err.response.data.errors);
    }
  };

  // Delete action
  const handleDelete = () => {
    postHelper.deletePost(post.id)
    .then((res) => {
      setIsSubmit(true);
    })
    .catch((error) => {
    });
  };

  return (
    <Stack direction="row" spacing={0.5}>
      {/* Like */}
      <IconButton 
        aria-label="like"
        onClick={handleLike}
      >
        {likes > 0 && <Typography>
          {likes}
        </Typography>}
        {isliked ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
      </IconButton>
      {/* More */}
      <IconButton
        ref={anchorRef}
        aria-label="more"
        aria-controls={open ? 'menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MoreVertIcon />
      </IconButton>
      {/* Popper */}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
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
                  id="menu"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleDelete} disableRipple>
                    <DeleteIcon />
                    Delete Post
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}