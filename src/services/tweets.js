import { post } from '../utils/request';

/**
 * create comments
 */
export const createTweets = (params) => post('/api/tweets', params);
