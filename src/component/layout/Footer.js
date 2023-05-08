import styled from 'styled-components';
import { ReactComponent as LogoIcon } from '../../assets/header-logo-icon.svg';

const Footer = () => {
  const frontendMember = (
    <ul>
      <li>강희진</li>
      <li>정승연</li>
      <li>김수진</li>
    </ul>
  );

  const backendMember = (
    <ul>
      <li>김건</li>
      <li>박근홍</li>
      <li>조우필</li>
      <li>김재형</li>
    </ul>
  );

  return (
    <FooterWrapper>
      <FooterTitle>
        <LogoIcon width={30} height={30} />
        <div>
          Walking <br />
          With Puppy
        </div>
      </FooterTitle>
      <FooterContent>
        <div>
          {/* TODO: 팀명 수정 */}
          <h5>WWP</h5>
          <div>site design / develop © WWP </div>
        </div>
        <div>
          <h5>FE</h5>
          {frontendMember}
        </div>
        <div>
          <h5>BE</h5>
          {backendMember}
        </div>
      </FooterContent>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  width: 100%;
  height: 15rem;
  background-color: #1c1c1c;
  padding: 2.5rem 3rem;

  display: grid;
  grid-template-columns: 2fr 3fr;

  color: white;
`;

const FooterTitle = styled.div`
  display: flex;
  gap: 0.5rem;

  font-weight: bold;

  font-size: 1.5rem;
`;

const FooterContent = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-around;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h5 {
    font-weight: 600;
    font-size: 1.4rem;
    color: #fbae03;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    font-size: 16px;
  }
`;

export default Footer;
