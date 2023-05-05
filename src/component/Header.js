import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as HeaderIcon } from '../assets/HeaderIcon.svg';

const Header = () => {
  // TEST CODE: login token 검증
  const [isLogin, setIsLogin] = useState(false);

  const logoutElements = (
    <div className="elements-wrapper">
      {/* ↓ TEST CODE: 로그인일 경우 header 확인용 태그  */}
      <span onClick={() => setIsLogin(true)} style={{ cursor: 'pointer' }}>
        🐶
      </span>
      {/* ↑ TEST CODE */}
      <button>로그인</button>
      <button>회원가입</button>
    </div>
  );

  const loginElements = (
    <div className="elements-wrapper">
      <div>동네친구 찾기</div>
      {/* TODO: 로그인 상태 변화 TEST CODE 수정 */}
      <button onClick={() => setIsLogin(false)}>로그아웃</button>
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
    gap: 1.5rem;
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

export default Header;
