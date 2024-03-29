import { post } from '../utils/request';

/**
 * create comments
 */
export const createComment = (params) => post('/api/comments', params);

export const likes = (params) => post('/api/likes', params);

export const cancelLike = (params) => post('/api/likes/cancel', params);
