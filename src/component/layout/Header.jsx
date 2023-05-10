import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoIcon } from '../../assets/header-logo-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import Cookies from 'js-cookie';

const Header = () => {
  // TEST CODE: login token 검증
  const [isLogin, setIsLogin] = useState(false);
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLogin(() => true);
    }
  }, [token]);

  const logoutHandle = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    setIsLogin(prev => !prev);
    navigate(PATH_URL.HOME);
  };

  const logoutElements = (
    <div className="elements-wrapper">
      <Link to={PATH_URL.LOGIN}>
        {/* TODO: 로그인 상태 변화 TEST CODE 수정 */}
        <Button color="#fbae03">로그인</Button>
      </Link>
      <Link to={PATH_URL.SIGNUP}>
        <Button color="#fff" background="#fbae03">
          회원가입
        </Button>
      </Link>
    </div>
  );

  const loginElements = (
    <div className="elements-wrapper">
      <Link to={PATH_URL.BOARD}>
        <div id="linkToBoardLabel">산책메이트 찾기</div>
      </Link>
      <Link to={PATH_URL.HOME}>
        {/* TODO: 로그인 상태 변화 TEST CODE 수정, 로그아웃 이후 안내창 Handler 함수로 구현 */}
        {isLogin && <Button onClick={logoutHandle}>로그아웃</Button>}
      </Link>
    </div>
  );

  return (
    <HeaderWrapper>
      <Link to={PATH_URL.HOME}>
        <HeaderTitle>
          <LogoIcon width={23} height={23} />
          WWP
        </HeaderTitle>
      </Link>
      {isLogin ? loginElements : logoutElements}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.7rem;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 100;

  .elements-wrapper {
    display: flex;
    gap: 1rem;
    align-items: center;
    color: #fbae03;
    font-weight: 600;
  }

  #linkToBoardLabel {
    cursor: pointer;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  gap: 0.35rem;

  font-weight: bold;
  font-size: 1.3rem;
  color: #fbae03;
  cursor: pointer;
`;

const Button = styled.button`
  width: 5rem;
  border: 2px solid #fbae03;
  border-radius: 1rem;
  padding: 0.2rem 0.8rem;

  background-color: ${props => props.background};
  color: ${props => props.color};
  font-weight: 550;
`;

export default Header;
