import { post } from '../utils/request';

/**
 * create comments
 */
export const createComment = (params) => post('/api/comments', params);
