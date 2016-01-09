// const query = 'q=ig_hashtag(instagrabad) { media.after(977289228946914117, 12) {
//   count,
//   nodes {
//     caption,
//     code,
//     comments {
//       count
//     },
//     date,
//     dimensions {
//       height,
//       width
//     },
//     display_src,
//     id,
//     is_video,
//     likes {
//       count
//     },
//     owner {
//       id
//     },
//     thumbnail_src
//   },
//   page_info
// }
//  }&ref=tags::show';

const query = 'q=ig_hashtag({{hashtag}})+%7B+media.after({{start_cursor}}%2C+{{count}})+%7B%0A++count%2C%0A++nodes+%7B%0A++++caption%2C%0A++++code%2C%0A++++comments+%7B%0A++++++count%0A++++%7D%2C%0A++++date%2C%0A++++dimensions+%7B%0A++++++height%2C%0A++++++width%0A++++%7D%2C%0A++++display_src%2C%0A++++id%2C%0A++++is_video%2C%0A++++likes+%7B%0A++++++count%0A++++%7D%2C%0A++++owner+%7B%0A++++++id%0A++++%7D%2C%0A++++thumbnail_src%0A++%7D%2C%0A++page_info%0A%7D%0A+%7D&ref=tags%3A%3Ashow';

export default query;
