import React from 'react';
import { Link } from 'react-router-dom'

import { Avatar } from '../_components';

const Post = ({post}) => {
  return (
  <>
    <li className="m-post-container d-flex mb-4"> 
      <Avatar identicon={post.identicon} />
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