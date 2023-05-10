import axios from 'axios';
import Cookies from 'js-cookie';
import { PATH_URL } from '../shared/constants';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  config => {
    const token = Cookies.get('token');

    if (token) {
      config.headers.ACCESS_KEY = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    // console.log(error.config.url);
    // console.log(error.config.method);
    const {
      config,
      config: { url, method },
      response: {
        data: { errorCode, message },
      },
    } = error;

    // console.log(error.response.data.message);
    if (errorCode === 'EXPIRED_ACCESS_TOKEN') {
      const refresh = Cookies.get('refreshToken');
      const originReq = config;
      const { headers } = await api({
        url: url,
        method: method,
        headers: { REFRESH_KEY: refresh },
      });

      const { ACCESS_KEY: newAccessToken, REFRESH_KEY: newRefreshToken } = headers;
      Cookies.set('token', newAccessToken);
      Cookies.set('refreshToken', newRefreshToken);

      originReq.headers.ACCESS_KEY = `Bearer ${newAccessToken}`;

      return axios(originReq);
    } else if (errorCode === 'EXPIRED_REFRESH_TOKEN') {
      const navigate = useNavigate();
      alert('만료시간이 다 되어 재로그인이 필요합니다');
      navigate(PATH_URL.LOGIN);
    } else if (errorCode === 'DUPLICATED_MEMBER') {
      alert(message);
    } else if (errorCode === 'DUPLICATED_EMAIL') {
      alert(message);
    } else if (errorCode === 'MEMBER_NOT_FOUND') {
      alert(message);
    } else if (errorCode === 'INACTIVE_MEMBER') {
      alert(message);
    } else if (errorCode === 'INTERNAL_SERVER_ERROR') {
      alert(message);
    } else if (errorCode === 'IO_EXCEPTION') {
      alert(message);
    } else if (errorCode === 'INVALID_REQUEST_PARAMETER') {
      alert(message);
    } else if (errorCode === 'INVALID_PASSWORD') {
      alert(message);
    } else if (errorCode === 'RESOURCE_NOT_FOUND') {
      alert(message);
    }
  }
);
