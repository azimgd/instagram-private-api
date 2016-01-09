// const queryMedia = `q=ig_me() {
//   feed {
//     media.after({{start_cursor}}, {{count}}) {
//       nodes {
//         id,
//         caption,
//         code,
//         comments.last(4) {
//           count,
//           nodes {
//             id,
//             created_at,
//             text,
//             user {
//               id,
//               profile_pic_url,
//               username
//             }
//           },
//           page_info
//         },
//         date,
//         dimensions {
//           height,
//           width
//         },
//         display_src,
//         is_video,
//         likes {
//           count,
//           nodes {
//             user {
//               id,
//               profile_pic_url,
//               username
//             }
//           },
//           viewer_has_liked
//         },
//         location {
//           id,
//           has_public_page,
//           name
//         },
//         owner {
//           id,
//           blocked_by_viewer,
//           followed_by_viewer,
//           full_name,
//           has_blocked_viewer,
//           is_private,
//           profile_pic_url,
//           requested_by_viewer,
//           username
//         },
//         usertags {
//           nodes {
//             position,
//             user {
//               username
//             }
//           }
//         },
//         video_url
//       },
//       page_info
//     }
//   },
//   id,
//   profile_pic_url,
//   username
// }
// &ref=feed::show`;

const query = 'q=ig_me()+%7B%0A++feed+%7B%0A++++media.after({{start_cursor}}%2C+{{count}})+%7B%0A++++++nodes+%7B%0A++++++++id%2C%0A++++++++caption%2C%0A++++++++code%2C%0A++++++++comments.last(4)+%7B%0A++++++++++count%2C%0A++++++++++nodes+%7B%0A++++++++++++id%2C%0A++++++++++++created_at%2C%0A++++++++++++text%2C%0A++++++++++++user+%7B%0A++++++++++++++id%2C%0A++++++++++++++profile_pic_url%2C%0A++++++++++++++username%0A++++++++++++%7D%0A++++++++++%7D%2C%0A++++++++++page_info%0A++++++++%7D%2C%0A++++++++date%2C%0A++++++++dimensions+%7B%0A++++++++++height%2C%0A++++++++++width%0A++++++++%7D%2C%0A++++++++display_src%2C%0A++++++++is_video%2C%0A++++++++likes+%7B%0A++++++++++count%2C%0A++++++++++nodes+%7B%0A++++++++++++user+%7B%0A++++++++++++++id%2C%0A++++++++++++++profile_pic_url%2C%0A++++++++++++++username%0A++++++++++++%7D%0A++++++++++%7D%2C%0A++++++++++viewer_has_liked%0A++++++++%7D%2C%0A++++++++location+%7B%0A++++++++++id%2C%0A++++++++++has_public_page%2C%0A++++++++++name%0A++++++++%7D%2C%0A++++++++owner+%7B%0A++++++++++id%2C%0A++++++++++blocked_by_viewer%2C%0A++++++++++followed_by_viewer%2C%0A++++++++++full_name%2C%0A++++++++++has_blocked_viewer%2C%0A++++++++++is_private%2C%0A++++++++++profile_pic_url%2C%0A++++++++++requested_by_viewer%2C%0A++++++++++username%0A++++++++%7D%2C%0A++++++++usertags+%7B%0A++++++++++nodes+%7B%0A++++++++++++position%2C%0A++++++++++++user+%7B%0A++++++++++++++username%0A++++++++++++%7D%0A++++++++++%7D%0A++++++++%7D%2C%0A++++++++video_url%0A++++++%7D%2C%0A++++++page_info%0A++++%7D%0A++%7D%2C%0A++id%2C%0A++profile_pic_url%2C%0A++username%0A%7D%0A&ref=feed%3A%3Ashow';

export default query;
