import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'

import { UserContext, Avatar } from '../_components';
import { postsService } from '../_services';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";

const Post = ({post}) => {

  const { user } = useContext(UserContext)

  const [likeStatus, setLikeStatus] = useState(false)
  const [likeCounter, setLikeCounter] = useState(0)
  const [timeSetter, setTimeSetter] = useState("")

  // Gets likes of post
  useEffect(() => {
    postsService.getLikes(post.id)
      .then((res) => {
        let likeArr = res.data.result;
        
        if (likeArr) {
          setLikeCounter(Object.keys(likeArr).length)
          setLikeStatus(likeExists(likeArr, user.id));
        }
      })
      .catch((errors) => {
        setLikeCounter(0)
      });
  }, [])

  // Prepares timestamp for client
  useEffect(() => {
    const currentTime = Math.floor(Date.now() / 1000);
    let setTime = currentTime - post.timestamp;

    switch(true) {
      // 0s - 1m
      case setTime < 60:
        setTimeSetter("now");
        break;
      // 1m - 2m
      case setTime < 120:
        setTimeSetter("1 minute ago");
        break;
      // 2m - 1h
      case setTime < 3600:
        setTime = Math.floor(setTime / 60);
        setTimeSetter(`${setTime} minutes ago`);
        break;
      // 1h - 2h
      case setTime < 7200:
        setTimeSetter("1 hour ago");
        break;                
      // 2h - 24h
      case setTime < 86400:
        setTime = Math.floor(setTime / 3600);
        setTimeSetter(`${setTime} hours ago`);
        break;
      // 1d - 2d
      case setTime < 172800:
        setTimeSetter("1 day ago");
        break;
      // 2d - 3d
      case setTime < 259200:
        setTime = Math.floor(setTime / 86400);
        setTimeSetter(`${setTime} days ago`);
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
          
        setTimeSetter(`${dd}.${mm}.${yy}`);
        break;
    }
  }, []);

  const handleDelete = () => {
    postsService.deletePost(post.id)
    .then((res) => {
    })
    .catch((error) => {
    });
  }
  
  const handleLike = () => {
    const fields = new FormData();
    fields.append("user_id", user.id)
    
    postsService.toggleLike(post.id, fields)
    .then((res) => {
      setLikeCounter(likeStatus ? likeCounter - 1 : likeCounter + 1);
      setLikeStatus(!likeStatus);
    })
    .catch((error) => {
      // console.log(error.response.data.errors);
    });
  };

  const likeExists = (array, user_id) => {
    return array.some((e) => {
      return Object.values(e).includes(user_id);
    }); 
  }

  return (
  <>
    <li className="m-post-container d-flex mb-4"> 
      <Link to={post.user_id === user.id ? "/profile" : `/users/${post.username}`} className="m-avatar">
        <Avatar identicon={post.identicon} />
      </Link>
      <div className="m-post-inner col d-flex flex-column">
        <section className="m-post-header d-flex justify-content-between">
          <div className="m-header-left d-flex">
            <Link to={post.user_id === user.id ? "/profile" : `/users/${post.username}`} className="m-post-username me-2">{post.username}</Link>
            <p className="m-post-date">{timeSetter}</p>
          </div>
          <div className="m-header-right">
          {post.user_id === user.id &&
          <button onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} /> 
          </button>}
          <button onClick={handleLike}>
            {likeCounter > 0 ? likeCounter : ""}
            <FontAwesomeIcon icon={likeStatus ? fasHeart : farHeart} /> 
          </button>
          </div>       
        </section>

        <section className="m-post-message">
          <p>{post.message}</p>
        </section>
      </div>
    </li>
  </>
  );
}

export { Post };