import axios from 'axios';

import config from '~/config';

export default axios.create({
  baseURL: config.constants.BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: config.constants.BASE_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', withCredentials: true },
});
