import axios from 'axios';

const domain = 'http://localhost:3333';

// parameter transformation before requesting API by adding same domain
axios.interceptors.request.use((config) => ({
  ...config,
  url: domain + config.url,
}));

// Intercept the response, including data transformation and error handling
axios.interceptors.response.use((response) => response.data, (err) => Promise.reject(err));

// get information from server
export const get = (url) => axios.get(url);

// add resource to server
export const post = (url, params) => axios.post(url, params);

// update resource in server
export const put = (url, params) => axios.put(url, params);

// remove resource from server
export const del = (url, params) => axios.del(url, params);
