import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: `http://3.38.191.164`, //백엔드 서버 들어올 예정
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});

export const user = axios.create({
  baseURL: `http://3.38.191.164`, //백엔드 서버 들어올 예정
});
