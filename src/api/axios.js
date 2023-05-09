import axios from 'axios';
import Cookies from 'js-cookie';
import { PATH_URL } from '../shared/constants';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_SERVER_URL;

// export const fetchBoard = axios.create({
//   baseURL: API_URL,
// });

export const api = axios.create({
  baseURL: API_URL,
  // headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});

// export const user = axios.create({
//   baseURL: API_URL,
// });

api.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    console.log(error.response.data.message);
    if (error.status === 401) {
      const navigate = useNavigate();
      alert('재로그인이 필요합니다');
      navigate(PATH_URL.LOGIN);
      return;
    }
    alert(error.response.data.message);
  }
);
