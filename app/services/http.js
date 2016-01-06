import axios from 'axios';
import { extract } from '../utils';
import { headers as defaultHeaders } from '../sources';
import debug from 'debug';

const http = (state) => ({
  /**
   * This will load instagram's main page, and extract csrf and mid tokens from
   * response headers. Those tokens will be required for most api calls.
   */
  grabTokens: () => {
    const extractTokens = (res) => {
      const csrf = extract('csrftoken', res.headers['set-cookie']);
      const mid = extract('mid', res.headers['set-cookie']);

      if (csrf.length < 1 || mid.length < 1) {
        throw new Error('Tokens were not parsed');
      }

      return { csrf: csrf[0], mid: mid[0] };
    };

    return axios
      .create({ baseURL: 'https://instagram.com/', headers: state.headers })
      .request({ method: 'get', url: '/' })
      .then(extractTokens)
      .catch(() => false);
  },

  /**
   * Perform authorisation with provided username/password parameters on instagram
   *
   * @param username
   * @param password
   */
  auth: (username, password) => {
    const headers = Object.assign(state.headers || {}, {
      'Cookie': `mid=${state.mid}; csrftoken=${state.csrf};`,
      'X-CSRFToken': `${state.csrf}`,
      'Referer': 'https://www.instagram.com/',
    });

    const handleResponse = (res) => {
      if (res.status !== 200) {
        throw new Error(res.data);
      }

      const sessionid = extract('sessionid', res.headers['set-cookie']);
      const csrf = extract('csrftoken', res.headers['set-cookie']);

      if (csrf.length < 1 || sessionid.length < 1) {
        throw new Error('No session id was parsed');
      }

      state.debug(res.data);

      return { csrf: csrf[0], sessionid: sessionid[0] };
    };

    return axios
      .create({ baseURL: 'https://www.instagram.com/accounts/login/ajax/', headers })
      .request({ method: 'post', url: '/', data: `username=${username}&password=${password}` })
      .then(handleResponse)
      .catch((err) => { state.debug(err); return false; });
  },

  /**
   * Set like for selected media
   *
   * @param mediaId
   */
  setLike: (mediaId) => {
    const headers = Object.assign(state.headers || {}, {
      'X-CSRFToken': `${state.csrf}`,
      'Cookie': `mid=${state.mid}; sessionid=${state.sessionid}; csrftoken=${state.csrf};`,
      'Referer': 'https://www.instagram.com/',
    });

    const handleResponse = (res) => {
      if (res.status !== 200) {
        throw new Error(res.data);
      }

      if (res.data.status !== 'ok') {
        throw new Error(res.data);
      }

      state.debug(res.data);

      return true;
    };

    return axios
      .create({ baseURL: `https://www.instagram.com/web/likes/${mediaId}/like`, headers })
      .request({ method: 'post', url: '/' })
      .then(handleResponse)
      .catch((err) => { state.debug(err); return false; });
  },

  /**
   * Set comment on selected media
   *
   * @param mediaId
   * @param text
   */
  setComment: (mediaId, text) => {
    const comment = encodeURIComponent(text);

    const headers = Object.assign(state.headers || {}, {
      'X-CSRFToken': `${state.csrf}`,
      'Cookie': `mid=${state.mid}; sessionid=${state.sessionid}; csrftoken=${state.csrf};`,
      'Referer': 'https://www.instagram.com/',
    });

    const handleResponse = (res) => {
      if (res.status !== 200) {
        throw new Error(res.data);
      }

      if (res.data.status !== 'ok') {
        throw new Error(res.data);
      }

      state.debug(res.data);

      return true;
    };

    return axios
      .create({ baseURL: `https://www.instagram.com/web/comments/${mediaId}/add`, headers })
      .request({ method: 'post', url: '/', data: `comment_text=${comment}` })
      .then(handleResponse)
      .catch((err) => { state.debug(err); return false; });
  },

  /**
   * Follow selected user
   *
   * @param userId
   */
  setFollow: (userId) => {
    const headers = Object.assign(state.headers || {}, {
      'X-CSRFToken': `${state.csrf}`,
      'Cookie': `mid=${state.mid}; sessionid=${state.sessionid}; csrftoken=${state.csrf};`,
      'Referer': 'https://www.instagram.com/',
    });

    const handleResponse = (res) => {
      if (res.status !== 200) {
        throw new Error(res.data);
      }

      if (res.data.status !== 'ok') {
        throw new Error(res.data);
      }

      state.debug(res.data);

      return true;
    };

    return axios
      .create({ baseURL: `https://www.instagram.com/web/friendships/${userId}/follow`, headers })
      .request({ method: 'post', url: '/' })
      .then(handleResponse)
      .catch((err) => { state.debug(err); return false; });
  },

  /**
   * Unfollow selected user
   *
   * @param userId
   */
  unsetFollow: (userId) => {
    const headers = Object.assign(state.headers || {}, {
      'X-CSRFToken': `${state.csrf}`,
      'Cookie': `mid=${state.mid}; sessionid=${state.sessionid}; csrftoken=${state.csrf};`,
      'Referer': 'https://www.instagram.com/',
    });

    const handleResponse = (res) => {
      if (res.status !== 200) {
        throw new Error(res.data);
      }

      if (res.data.status !== 'ok') {
        throw new Error(res.data);
      }

      state.debug(res.data);

      return true;
    };

    return axios
      .create({ baseURL: `https://www.instagram.com/web/friendships/${userId}/unfollow`, headers })
      .request({ method: 'post', url: '/' })
      .then(handleResponse)
      .catch((err) => { state.debug(err); return false; });
  },
});

/**
 * Composition class
 *
 * @param csrf
 * @param mid
 * @param sessionid
 */
const Class = (res = {}) => {
  const state = Object.assign(res, {
    headers: defaultHeaders,
    debug: debug('http'),
  });

  return Object.assign(
    {},
    http(state)
  );
};

export default Class;
