import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as HeaderIcon } from '../assets/HeaderIcon.svg';

const Header = () => {
  // TEST CODE: login token 검증
  const [isLogin, setIsLogin] = useState(false);

  const logoutElements = (
    <div className="elements-wrapper">
      {/* TODO: 로그인 상태 변화 TEST CODE 수정 */}
      <Button color="#fbae03" onClick={() => setIsLogin(true)}>
        로그인
      </Button>
      <Button color="#fff" background="#fbae03">
        회원가입
      </Button>
    </div>
  );

  const loginElements = (
    <div className="elements-wrapper">
      동네친구 찾기
      {/* TODO: 로그인 상태 변화 TEST CODE 수정 */}
      <Button onClick={() => setIsLogin(false)}>로그아웃</Button>
    </div>
  );

  return (
    <HeaderWrapper>
      <HeaderTitle>
        <HeaderIcon width={23} height={23} />
        WWP
      </HeaderTitle>
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
