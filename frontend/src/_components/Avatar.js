import React from 'react';

import { identiconHelper } from '../_helpers';

const Avatar = ({identicon}) => {
  return (
    <img className="default-img w-100 h-100" src={identiconHelper.get(identicon)} alt="identicon"/>
  );
}

export { Avatar };