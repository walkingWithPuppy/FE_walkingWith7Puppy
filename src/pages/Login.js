import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const MotionContainer = motion('div');

const Container = styled.div`
  margin: 0 auto;
  width: 45%;
  height: 400px;
  margin-top: 170px;
  display: flex;
  flex-direction: column;
  border: 2px solid #fbae03;
  border-radius: 10px;

  > div:first-child {
    width: 60%;
    margin: 0 auto;
    padding-top: 50px;
  }
`;
const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 55px;
  width: 100%;
  gap: 10px;

  > div {
    width: 50%;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const goSinup = () => {
    navigate('/signup');
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
          <Typography variant="h4">Login</Typography>
          <TextField
            id="outlined-basic"
            label="ID"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <BtnWrap>
            <div>
              <Button variant="outlined" fullWidth>
                Login
              </Button>
            </div>
            <div>
              <Button variant="outlined" fullWidth onClick={goSinup}>
                signup
              </Button>
            </div>
          </BtnWrap>
        </div>
      </Container>
    </MotionContainer>
  );
};

export default Login;
