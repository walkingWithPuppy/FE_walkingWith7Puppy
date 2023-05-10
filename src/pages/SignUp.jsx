import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PATH_URL } from '../shared/constants';
import * as React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import Loading from '../component/Loading';

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
  const [pwSame, setPwSame] = useState(true);
  const [usernameCheck, setUsernameCheck] = useState(true);
  const [emailCheck, setEmailCheck] = useState(true);
  const [inputData, setInputData] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { username, password, password2, email } = inputData;
  const navigate = useNavigate();

  const changeId = e => {
    const { name, value } = e.target;

    const idRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,12}$/;
    setInputData({
      ...inputData,
      [name]: value,
    });
    if (!idRegExp.test(value)) {
      setUsernameCheck(false);
    } else {
      setUsernameCheck(true);
    }
  };

  const changePw = e => {
    const { name, value } = e.target;
    const pwRegExp = /(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,15}$/;
    setInputData({
      ...inputData,
      [name]: value,
    });
    if (!pwRegExp.test(value)) {
      setPasswordCheck(false);
    } else {
      setPasswordCheck(true);
    }
  };
  const changePw2 = e => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const changeEmail = e => {
    const { name, value } = e.target;
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    setInputData({
      ...inputData,
      [name]: value,
    });
    if (!emailRegExp.test(value)) {
      setEmailCheck(false);
    } else {
      setEmailCheck(true);
    }
  };

  const signupUser = async () => {
    if (password2 !== password) {
      setPwSame(false);
      return;
    }
    if (!(passwordCheck && usernameCheck && emailCheck)) {
      return;
    }
    delete inputData.password2;
    setIsLoading(true);
    await api.post(`${PATH_URL.SIGNUP}`, inputData);

    inputData.password2 = '';
    setInputData({
      usename: '',
      password: '',
      password2: '',
      email: '',
    });
    setPasswordCheck(true);
    navigate(PATH_URL.LOGIN);
  };

  const goLogin = () => {
    navigate(PATH_URL.LOGIN);
  };
  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  function MyFormHelperText() {
    const helperText = React.useMemo(() => {
      if (passwordCheck) {
        return ' ';
      }
      return '영어,숫자,특수문자 포함 8~15자';
    }, []);

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  return (
    <>
      {isLoading ? (
        <Loading margin="30%" />
      ) : (
        <>
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
                    helperText={usernameCheck ? ' ' : '영어,숫자로 4~12자'}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    size="small"
                    name="username"
                    value={username || ''}
                    onChange={changeId}
                  />
                </Margin>
                <Margin style={{ marginTop: 20 }}>
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
                      name="password"
                      value={password || ''}
                      onChange={changePw}
                    />
                    <MyFormHelperText />
                  </FormControl>

                  {pwSame ? (
                    <TextField
                      label="다시 한번 더 입력해주세요"
                      helperText=" "
                      size="small"
                      type="password"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      name="password2"
                      value={password2 || ''}
                      onChange={changePw2}
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
                      name="password2"
                      value={password2 || ''}
                      onChange={changePw2}
                    />
                  )}
                </Margin>
                {/* <Margin style={{ marginTop: '0' }}>
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
          </Margin> */}
                <Margin>
                  <TextField
                    size="small"
                    label="Email"
                    helperText={emailCheck ? ' ' : '이메일형식(@)'}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    name="email"
                    value={email || ''}
                    onChange={changeEmail}
                  />
                </Margin>

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
        </>
      )}
    </>
  );
};
const Container = styled.div`
  margin: 0 auto;
  width: 40%;
  height: 600px;
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
