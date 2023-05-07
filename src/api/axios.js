import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: `http://3.38.191.164`, //백엔드 서버 들어올 예정
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});

export const user = axios.create({
  baseURL: `http://3.38.191.164`, //백엔드 서버 들어올 예정
});

// 임시 로컬테스트용

const API_URL = process.env.REACT_APP_SERVER_URL;

export const boards = axios.create({
  // baseURL: `http://localhost:4000`
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});

export const comments = axios.create({
  // baseURL: `http://localhost:4000`
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});