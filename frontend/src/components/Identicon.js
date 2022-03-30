import React from 'react';

export const Identicon = ({identicon}) => {
  return (
    <img className="default-img w-100 h-100" src={IdenticonProvider(identicon)} alt="identicon"/>
  );
}

const IdenticonProvider = (identicon) => {
  const URL = "https://avatars.dicebear.com/v2/identicon/";

  return `${URL}${identicon}.svg`;
}