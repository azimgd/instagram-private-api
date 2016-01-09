import Http from './app/services/http';

const auth = (username, password) => {
  return (new Http)
    .grabTokens()
    .then((res) => new Http(res).auth(username, password))
    .catch(() => false);
};

const setLike = (headers, mediaId) => {
  return (new Http(headers))
    .setLike(mediaId)
    .catch(() => false);
};

const setComment = (headers, mediaId, text) => {
  return (new Http(headers))
    .setComment(mediaId, text)
    .catch(() => false);
};

const setFollow = (headers, userId) => {
  return (new Http(headers))
    .setFollow(userId)
    .catch(() => false);
};

const unsetFollow = (headers, userId) => {
  return (new Http(headers))
    .unsetFollow(userId)
    .catch(() => false);
};

const getSelfFeed = (headers, startCursor = null, count = 12) => {
  return (new Http(headers))
    .getSelfFeed(startCursor, count)
    .catch(() => false);
};

const getFeedByHashtag = (headers, hashtag, startCursor = null, count = 12) => {
  return (new Http(headers))
    .getFeedByHashtag(hashtag, startCursor, count)
    .catch(() => false);
};

export default {
  auth,
  setLike,
  setComment,
  setFollow,
  unsetFollow,
  getSelfFeed,
  getFeedByHashtag,
};
