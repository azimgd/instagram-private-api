const extract = (token, headers) => {
  if (headers.constructor !== Array) {
    return [];
  }

  const tokenExists = (item) => item.indexOf(token) > -1;
  const filtered = headers
    .filter(tokenExists)
    .map((item) => {
      return item.split(' ').filter(tokenExists).map(string => string.split(token)[1].slice(1, -1));
    });

  return [].concat.apply([], filtered);
};

export default { extract };
