const URL = "https://avatars.dicebear.com/v2/identicon/";

const get = (identicon) => {
  return `${URL}${identicon}.svg`;
}

export const identiconHelper = { get }