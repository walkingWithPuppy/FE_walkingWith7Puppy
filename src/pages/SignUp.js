import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PATH_URL } from '../shared/constants';

import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
const MotionContainer = motion('div');

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [inputData, setInputData] = useState({
    id: '',
    password: '',
    password2: '',
    nickname: '',
    email: '',
  });
  const { id, password, password2, nickname, email } = inputData;
  const change = e => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
    setPasswordCheck(true);
  };

  const signupUser = async () => {
    try {
      if (password2 !== password) {
        setPasswordCheck(prev => !prev);
        return;
      }
      delete inputData.password2;
      await api.post(`${PATH_URL.SIGNUP}`, inputData);
      // await api.post(`/register`, inputData); //테스트용
      inputData.password2 = '';
      setInputData({
        id: '',
        password: '',
        password2: '',
        nickname: '',
        email: '',
      });
      setPasswordCheck(true);
      navigate(PATH_URL.LOGIN);
    } catch (error) {
      console.log(error); //통신 시 키값 맞출예정
      // alert(error.response.data.message);
    }
  };

  const navigate = useNavigate();
  const goLogin = () => {
    navigate(PATH_URL.LOGIN);
  };
  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <MotionContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Container>
        <div>
          <Typography variant="h4">Sign up</Typography>
          <Margin style={{ marginTop: 0 }}>
            <TextField
              label="ID"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              name="id"
              value={id || ''}
              onChange={change}
            />
          </Margin>
          <Margin>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password2"
                value={password2 || ''}
                onChange={change}
              />
            </FormControl>

            {passwordCheck ? (
              <TextField
                label="다시 한번 더 입력해주세요"
                helperText=" "
                size="small"
                type="password"
                variant="outlined"
                margin="dense"
                fullWidth
                name="password"
                value={password || ''}
                onChange={change}
              />
            ) : (
              <TextField
                error
                label="error"
                helperText="패스워드가 일치하지않습니다"
                size="small"
                type="password"
                variant="outlined"
                margin="dense"
                fullWidth
                name="password"
                value={password || ''}
                onChange={change}
              />
            )}
          </Margin>
          <Margin style={{ marginTop: '0' }}>
            <TextField
              size="small"
              label="NickName"
              variant="outlined"
              margin="dense"
              fullWidth
              name="nickname"
              value={nickname || ''}
              onChange={change}
            />
          </Margin>
          <TextField
            size="small"
            label="Email"
            variant="outlined"
            margin="dense"
            fullWidth
            name="email"
            value={email || ''}
            onChange={change}
          />

          <BtnWrap>
            <div>
              <Button variant="outlined" fullWidth onClick={goLogin}>
                cancel
              </Button>
            </div>
            <div>
              <Button variant="outlined" fullWidth onClick={signupUser}>
                sign up
              </Button>
            </div>
          </BtnWrap>
        </div>
      </Container>
    </MotionContainer>
  );
};
const Container = styled.div`
  margin: 0 auto;
  width: 40%;
  height: 550px;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  border: 2px solid #fbae03;
  border-radius: 10px;

  > div:first-child {
    width: 70%;
    margin: 0 auto;
    padding-top: 50px;
  }
`;
const Margin = styled.div`
  margin-top: 30px;
`;
const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
  width: 100%;
  gap: 10px;

  > div {
    width: 50%;
  }
`;

export default SignUp;
