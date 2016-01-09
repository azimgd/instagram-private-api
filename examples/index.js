import bot from '../index';
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.username;
const password = process.env.password;

bot.auth(username, password)
.then((headers) => bot.setLike(headers, '1157751993106715465_5932067'));
//
// bot.auth(username, password)
// .then((headers) => bot.setComment(headers, '1156408808103072490_518286907', 'somehow this comment must be ignored, i guess!'));
//
// bot.auth(username, password)
// .then((headers) => bot.unsetFollow(headers, '29738951'));
//
// bot.auth(username, password)
// .then((headers) => bot.setFollow(headers, '29738951'));
//
// bot.auth(username, password)
// .then((headers) => bot.getFeedByHashtag(headers, 'cats'));
