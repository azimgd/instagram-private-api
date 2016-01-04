import Http from './app/services/http';

(new Http).grabTokens().then(
  (res) => {
    (new Http(res.csrf, res.mid)).auth('username', 'password').then((isAuthrorized) => {
      console.log(isAuthrorized);
    });
  }
);
