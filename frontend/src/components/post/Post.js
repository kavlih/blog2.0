// ?? DropDownCard doen't close when triggering other action

import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom'

import { UserContext } from '../../context/UserContext';
import { Identicon } from '../Identicon';
import { postHelper } from '../../helpers';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";

const Post = ({post}) => {

  const { user } = useContext(UserContext)

  const [isliked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes.length)
  const [date, setDate] = useState("")

  useEffect(() => {
    setIsLiked(post.likes.includes(user.id));
  }, [user.id, post.likes]);

  // Prepares timestamp for post
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

  const handleDelete = () => {
    postHelper.deletePost(post.id)
    .then((res) => {
    })
    .catch((error) => {
    });
  }
  
  const handleLike = () => {
    const fields = new FormData();
    fields.append("user_id", user.id)
    
    postHelper.toggleLike(post.id, fields)
    .then((res) => {
      setLikes(isliked ? likes - 1 : likes + 1);
      setIsLiked(!isliked);
    })
    .catch((error) => {
      // console.log(error.response.data.errors);
    });
  };

  const toggleDropdown = () => {
    setOpen(open => !open);
  }

  const [open, setOpen] = useState(false);
  const drop = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  function handleClick(e) {
    if (!e.target.closest(`.${drop.current.className}`) && open) {
      setOpen(false);
    }
  }

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

              {/* Button Group */}
              <div className="btn-group">
                <button onClick={handleLike} className={`btn btn-like ${isliked ? "active" : ""}`}>
                  {likes > 0 && <div className="counter">
                    <p>{likes}</p>
                  </div>}
                  <div className="icon">
                    <FontAwesomeIcon icon={isliked ? fasHeart : farHeart} /> 
                  </div>
                </button>
              </div>

              {/* Button Group */}
              <div className="btn-group" ref={drop} >
                <button onClick={toggleDropdown} className={`btn btn-more ${open ? "active" : ""}`}>
                  <div className="icon">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </div>
                </button>
                {/* DropdownCard */}
                {open && <div className="dropdown">
                  <ul>
                    <li onClick={() => setOpen(false)}>
                      <button onClick={handleDelete} className="btn">
                        <FontAwesomeIcon icon={faTrashCan} />
                        <p>Delete Post</p>
                      </button>
                    </li>
                  </ul>
                </div>}
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