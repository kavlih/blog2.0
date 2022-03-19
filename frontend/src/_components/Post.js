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
      setLikeCounter(likeStatus ? likeCounter-1 : likeCounter+1);
      setLikeStatus(!likeStatus);
    })
    .catch((error) => {
      // setSubmitErrors("Something went wrong")
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
            <Link to="/" className="m-post-username me-2">{post.username}</Link>
            <p className="m-post-date">{post.timestamp}</p>
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