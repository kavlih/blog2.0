import React from 'react';
import { useParams } from 'react-router-dom';

import User from "../../components/User";

const UserProfile = () => {
  const { username } = useParams();

  return (
    <User username={username} />
  );
}

export default UserProfile;
