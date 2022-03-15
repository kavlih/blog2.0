import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'

import { UserContext, Avatar } from '../_components';
import { postsService } from '../_services';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const Post = ({post}) => {

  const { user } = useContext(UserContext)

  const [likeStatus, setLikeStatus] = useState(false)
  const [likeCounter, setLikeCounter] = useState(0)

  useEffect(() => {
    postsService.getLikes(post.id)
      .then((res) => {
        let likeArr = res.data.result;
        console.log(likeArr);
        
        if (likeArr) {
          setLikeCounter(Object.keys(likeArr).length)
          setLikeStatus(likeExists(likeArr, user.id));
          console.log(Object.values(likeArr));
        }
        else {
          setLikeCounter(0)
        }
      })
  }, [likeStatus])
  
  const handleLike = () => {
    const fields = new FormData();
    fields.append("user_id", user.id)
    
    postsService.toggleLike(post.id, fields)
    .then((res) => {
      setLikeStatus(!likeStatus);
      console.log(res);      
    })
    .catch((error) => {
      // setSubmitErrors("Something went wrong")
      console.log(error);
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
      <Avatar identicon={post.identicon} />
      <div className="m-post-inner col d-flex flex-column">
        <section className="m-post-header d-flex justify-content-between">
          <div className="m-header-left d-flex">
            <Link to="/" className="me-2">{post.username}</Link>
            <p className="post-date">{post.timestamp}</p>
          </div>
          <div className="m-header-right">
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