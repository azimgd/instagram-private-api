# Instagram private api client

Instagram client that works with username/password credentials

## Development and testing
- `npm install`
- Add your keys into */examples/.env*
- `gulp`
- `cd examples && node index.js`

## Example
```
import ig from 'instagram-private-api/index';

const username = 'username';
const password = 'password';

ig.auth(username, password)
.then((headers) => ig.setLike(headers, '115775199310623465_5932067'));

ig.auth(username, password)
.then((headers) => ig.setComment(headers, '11564088133072490_518286907', 'somehow this comment must be ignored, i guess!'));

bot.auth(username, password)
.then((headers) => bot.getSelfFeed(headers))
.then(res => console.log(res.feed.media.nodes));
```

## API

* `auth(username, password)`
* `setLike(headers, mediaId)`
* `setComment(headers, mediaId, text)`
* `setFollow(headers, userId)`
* `unsetFollow(headers, userId)`
* `getSelfFeed(headers, startCursor = null, count = 12)`
* `getFeedByHashtag(headers, hashtag, startCursor = null, count = 12)`
