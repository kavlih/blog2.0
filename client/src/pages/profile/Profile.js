import React, { useContext } from 'react';

import { UserContext } from "../../context/UserContext";
import User from "../../components/User";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <User username={user.username} />
  );
}

export default Profile;
