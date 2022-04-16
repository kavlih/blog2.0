export const identiconService = (identicon) => {
  const URL = 'https://avatars.dicebear.com/v2/identicon/';

  return `${URL}${identicon}.svg`;
}