import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoIcon } from '../assets/LogoIcon.svg';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../shared/constants';

const Header = () => {
  // TEST CODE: login token 검증
  const [isLogin, setIsLogin] = useState(false);

  const logoutElements = (
    <div className="elements-wrapper">
      <Link to={PATH_URL.LOGIN}>
        {/* TODO: 로그인 상태 변화 TEST CODE 수정 */}
        <Button color="#fbae03" onClick={() => setIsLogin(true)}>
          로그인
        </Button>
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
      동네친구 찾기
      <Link to={PATH_URL.HOME}>
        {/* TODO: 로그인 상태 변화 TEST CODE 수정, 로그아웃 이후 안내창 Handler 함수로 구현 */}
        <Button onClick={() => setIsLogin(false)}>로그아웃</Button>
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

  .elements-wrapper {
    display: flex;
    gap: 1rem;
    align-items: center;
    color: #fbae03;
    font-weight: 600;
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
