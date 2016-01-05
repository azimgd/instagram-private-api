import Http from './app/services/http';

const username = '';
const password = '';

(new Http).grabTokens().then(
  (res) => {
    console.log(res);
    (new Http(res.csrf, res.mid)).auth(username, password).then((auth) => {
      if(!auth) {
        console.log('not authorized');
        return false;
      }

      (new Http(auth.csrf, res.mid, auth.sessionid)).setLike().then(console.log);
    });
  }
);
