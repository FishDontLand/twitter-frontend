import { get, put } from '@utils/request';

/**
 * update user info
 * @param {*} userId
 * @param {*} params
 */
export const editUser = (userId, params) => put(`/api/profiles/${userId}`, params);

export const setFollower = (userId, params) => put(`/api/friendships/${userId}/follow`, params);

export const getFollowInfo = (userId) => get(`/api/friendships/${userId}/follow`);
