# Instagram private api client

Instagram client that works with username/password credentials

## Installation
`npm install instagram-private`

## Example
```
import ig from 'instagram-wrapper';

const username = 'username';
const password = 'password';

ig.auth(username, password)
.then((headers) => ig.setLike(headers, '1157751993106715465_5932067'));

ig.auth(username, password)
.then((headers) => ig.setComment(headers, '1156408808103072490_518286907', 'somehow this comment must be ignored, i guess!'));

ig.auth(username, password)
.then((headers) => ig.getFeedByHashtag(headers, 'cats'));
```

## API

* `auth(username, password)`
* `setLike(headers, mediaId)`
* `setComment(headers, mediaId, text)`
* `setFollow(headers, userId)`
* `unsetFollow(headers, userId)`
* `getSelfFeed(headers, startCursor = null, count = 12)`
* `getFeedByHashtag(headers, hashtag, startCursor = null, count = 12)`
