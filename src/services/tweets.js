import { post, get } from '../utils/request';

/**
 * create comments
 */
export const createTweets = (params) => post('/api/tweets', params);

export const getNewsFeeds = () => get('/api/newsfeeds').then((res) => {
  if (res.data && res.data.length > 0) {
    return res.data.map((item) => ({ ...item.tweet }));
  }
  return [];
});

export const getTweets = (id) => get('/api/tweets', {
  user_id: id,
});
