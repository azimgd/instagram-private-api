import axios from 'axios';
import { extract } from '../utils';
import { headers as defaultHeaders } from '../sources';

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

      return { csrf: csrf[0], sessionid: sessionid[0] };
    };

    return axios
      .create({ baseURL: 'https://www.instagram.com/accounts/login/ajax/', headers })
      .request({ method: 'post', url: '/', data: `username=${username}&password=${password}` })
      .then(handleResponse)
      .catch(console.log);
  },

  setLike: () => {
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

      console.log(res.data);

      return true;
    };

    return axios
      .create({ baseURL: 'https://www.instagram.com/web/likes/1155699351212040183/like', headers })
      .request({ method: 'post', url: '/' })
      .then(handleResponse)
      .catch(console.log);
  },
});

const Class = (csrf = '', mid = '', sessionid = '') => {
  const state = {
    csrf,
    mid,
    sessionid,
    headers: defaultHeaders,
  };

  return Object.assign(
    {},
    http(state)
  );
};

export default Class;
