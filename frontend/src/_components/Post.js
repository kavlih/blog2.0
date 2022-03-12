import React from 'react';
import { Link } from 'react-router-dom'

const Post = (props) => {
  return (
  <>
    <li className="m-post-container d-flex w-100"> 
      <div className="d-flex">
        <div className="avatar-thumb">
          <Link to="/" className="d-flex justify-content-center align-items-center w-100 h-100">
            <img className="default-img w-60" src="" alt="identicon"/>
          </Link>
        </div>
      </div>

      <div className="post-inner col d-flex">
        <div className="box">
          <div className="post-header d-flex justify-content-between">
            <div className="post-username">
              <Link to="/">username</Link>
            </div>
            <div className="post-date">
              <p>0000000</p>
            </div>
          </div>

          <div className="post-message">
            <p>blablabla</p>
          </div>
        </div>
      </div>
    </li>
  </>
  );
}

export { Post };