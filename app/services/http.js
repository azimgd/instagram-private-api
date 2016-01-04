import axios from 'axios';
import { extract } from '../utils';
import { headers as defaultHeaders } from '../sources';

const http = (state) => ({
  /**
   * This will load instagram's main page, and extract csrf and mid tokens from
   * response headers. Those tokens will be required for most api calls.
   */
  grabTokens: () => {
    const extractTokens = (response) => {
      const csrf = extract('csrftoken', response.headers['set-cookie']);
      const mid = extract('mid', response.headers['set-cookie']);

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
    });

    const handleResponse = (res) => {
      if (res.status !== 200) {
        throw new Error(res.data);
      }

      return res.data.authenticated;
    };

    return axios
      .create({ baseURL: 'https://www.instagram.com/accounts/login/ajax/', headers })
      .request({ method: 'post', url: '/', data: `username=${username}&password=${password}` })
      .then(handleResponse)
      .catch(() => false);
  },
});

const Class = (csrf = '', mid = '') => {
  const state = {
    csrf,
    mid,
    headers: defaultHeaders,
  };

  return Object.assign(
    {},
    http(state)
  );
};

export default Class;
