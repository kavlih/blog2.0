import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom'
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";
// MUI
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
// MUI Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { UserContext } from '../../context/UserContext';
import { Identicon } from '../Identicon';
import { postHelper } from '../../helpers';

const Post = ({ post, setIsSubmit }) => {
  const { user } = useContext(UserContext);
  const [isliked, setIsLiked] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    setIsLiked(post.likes.includes(user.id));
  }, [user.id, post.likes]);

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

  // Like
  const [likes, setLikes] = useState(post.likes.length);

  const handleLike = () => {
    const fields = new FormData();
    fields.append("userId", user.id)
    
    postHelper.toggleLike(post.id, fields)
    .then((res) => {
      setLikes(isliked ? likes - 1 : likes + 1);
      setIsLiked(!isliked);
      setIsSubmit(true);
    })
    .catch((error) => {
      // console.log(error.response.data.errors);
    });
  };

  // Settings
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

  // Settings Delete
  const handleDelete = () => {
    postHelper.deletePost(post.id)
    .then((res) => {
      setIsSubmit(true);
    })
    .catch((error) => {
    });
  };

  return (
  <>
    <li className="post-container"> 
      <Link to={post.user_id === user.id ? "/profile" : `/users/${post.username}`} className="avatar-container">
        <Identicon identicon={post.identicon} />
      </Link>
      <div className="content-container">
        <div className="post-header">
            {/* Header start */}
            <div className="header-start">

              <div className="post-username">
                <div className="icon-username"></div>
                <Link to={post.user_id === user.id ? "/profile" : `/users/${post.username}`}>{post.username}</Link>
              </div>
              <p className="post-date">{date}</p>

            </div>
            {/* Header end */}
            <div className="header-end">

              {/* Like */}
              <div className="btn-post-group">
                <button onClick={handleLike} className={`btn-post btn-like ${isliked ? "active" : ""}`}>
                  {likes > 0 && <div className="counter">
                    <p>{likes}</p>
                  </div>}
                  <div className="icon">
                    <FontAwesomeIcon icon={isliked ? fasHeart : farHeart} /> 
                  </div>
                </button>
              </div>
              {/* Settings */}
              <div className="post-settings">
                <IconButton
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <MoreVertIcon />
                </IconButton>
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
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleDelete}>
                              <FontAwesomeIcon icon={faTrashCan} />Delete Post
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>
        </div>

        <div className="post-body">
          <div className="post-message">
            <p>{post.message}</p>
          </div>
        </div>
      </div>
    </li>
  </>
  );
}

export default Post;