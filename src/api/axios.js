import axios from 'axios';
import Cookies from 'js-cookie';
import { PATH_URL } from '../shared/constants';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});

export const user = axios.create({
  baseURL: API_URL, //백엔드 서버 들어올 예정
});

user.interceptors.request.use(
  config => {
    const token = Cookies.get('token');

    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    console.log('인터셉터 config => ', config);
    return config;
  },
  error => {
    console.log('인터셉터 request 에러 => ', error);
    return Promise.reject(error);
  }
);

user.interceptors.response.use(
  response => {
    console.log('인터셉터 => ', response);
    return response;
  },
  error => {
    if (error.status === 401) {
      const navigate = useNavigate();
      alert('재로그인이 필요합니다');
      navigate(PATH_URL.LOGIN);
    }
  }
);
