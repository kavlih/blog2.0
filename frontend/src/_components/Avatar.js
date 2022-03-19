import React from 'react';

import { identiconService } from '../_services';

const Avatar = ({identicon}) => {
  return (
    <img className="default-img w-100 h-100" src={identiconService.get(identicon)} alt="identicon"/>
  );
}

export { Avatar };