import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
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
const MotionContainer = motion('div');

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
  margin-top: 20px;
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
//sx={{ mt: '5px', width: 100vh }}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const goLogin = () => {
    navigate('/login');
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
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
          <Margin>
            <TextField
              id="outlined-basic"
              label="ID"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
            />
          </Margin>
          <Margin>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                // size="small"
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
              />
            </FormControl>

            <TextField
              id="outlined-basic"
              size="small"
              label="다시 한번 더 입력해주세요"
              type="password"
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </Margin>
          <Margin>
            <TextField
              id="outlined-basic"
              size="small"
              label="NickName"
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </Margin>
          <TextField
            id="outlined-basic"
            size="small"
            label="Email"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          {/* <TextField
            id="outlined-basic"
            label="Area"
            variant="outlined"
            margin="dense"
            fullWidth
          /> */}
          <BtnWrap>
            <div>
              <Button variant="outlined" fullWidth onClick={goLogin}>
                cancel
              </Button>
            </div>
            <div>
              <Button variant="outlined" fullWidth>
                signup
              </Button>
            </div>
          </BtnWrap>
        </div>
      </Container>
    </MotionContainer>
  );
};

export default SignUp;
