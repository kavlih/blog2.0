import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import { accountHelper } from '../../helpers';
import { UserContext } from "../../context/UserContext";
import { Identicon } from "../../components/Identicon";
import Nav from '../../components/Nav';
import PostForm from "../../components/post/PostForm";
import PostContainer from "../../components/post/PostContainer";

const Feed = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();  

  const handleLogout = () => {
    accountHelper.logout()
    navigate("/account/login")
  };

  return (
  <>
    <div>
      <div className='d-none'>
        <div className='m-avatar'>
          <Identicon identicon={user.identicon} />
        </div>
        <p className='text-white'>{user.username}</p>
        {/* {user.role < 3 && <p>{user.role}</p>} */}
        <button onClick={handleLogout}>logout</button>
        <Link to="/settings">Settings</Link>
      </div>
      <Nav />
      <PostForm />
      <PostContainer />
    </div>
  </>
  );
}

export default Feed;
