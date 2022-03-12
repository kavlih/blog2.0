import React from 'react';
import { Link } from 'react-router-dom'

import { identiconService } from '../_services';

const Avatar = ({identicon}) => {
  return (
  <>
    <Link to="/" className="m-avatar">
      <img className="default-img w-100 h-100" src={identiconService.get(identicon)} alt="identicon"/>
    </Link>
  </>
  );
}

export { Avatar };