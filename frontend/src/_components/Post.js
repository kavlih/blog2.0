import React from 'react';
import { Link } from 'react-router-dom'

import { identiconService } from '../_services';

const Post = ({post}) => {
  return (
  <>
    <li className="m-post-container d-flex mb-4"> 
      <Link to="/" className="m-post-avatar">
          <img className="default-img w-100 h-100" src={identiconService.get(post.identicon)} alt="identicon"/>
      </Link>
  
      <div className="m-post-inner col d-flex flex-column">
        <div className="post-header d-flex justify-content-between">
          <div className="post-username">
            <Link to="/">{post.username}</Link>
          </div>
          <div className="post-date">
            <p>{post.timestamp}</p>
          </div>
        </div>

        <div className="post-message">
          <p>{post.message}</p>
        </div>
      </div>
    </li>
  </>
  );
}

export { Post };