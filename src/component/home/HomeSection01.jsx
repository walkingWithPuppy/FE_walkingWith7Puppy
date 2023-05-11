import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';

const HomeSection01 = () => {
  const rightArrowIcon = <i className="fa-solid fa-chevron-right" />;

  return (
    <Section01>
      <TextContainer>
        <Title>Walking with Puppy</Title>
        <Describe>
          우리 강아지도 친구를 만들어주세요!
          <br />
          <b>우리 동네 반려견 산책 메이트</b> 찾기 서비스
        </Describe>
      </TextContainer>
      <Link to={PATH_URL.BOARD}>
        <Button>
          <div>
            <span>WWP</span> 산책메이트 찾기
          </div>
          {rightArrowIcon}
        </Button>
      </Link>
    </Section01>
  );
};

const Section01 = styled.div`
  background-color: #fbae03;
  height: 25rem;
  border-radius: 5rem;
  background-image: url('/images/home/section01-img.png');
  background-repeat: no-repeat;
  background-position: 90% 80%;
  background-size: 35rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5rem;
  gap: 3rem;

  @media screen and (max-width: 1145px) {
    background-image: none;
  }
  @media screen and (max-width: 689px) {
    padding-left: 4rem;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: bold;
  font-family: 'Rubik', sans-serif;

  @media screen and (max-width: 689px) {
    font-size: 2.8rem;
  }
`;

const Describe = styled.p`
  line-height: 150%;
  font-size: 1.2rem;
`;

const Button = styled.button`
  background-color: white;
  width: 16rem;
  padding: 0.5rem 1rem;
  border-radius: 3rem;
  color: #fbae03;
  background-color: white;
  font-weight: 600;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  span {
    font-family: 'Rubik', sans-serif;
  }

  :hover {
    transition: 0.7s;
    color: #fe7e01;
  }
`;

export default HomeSection01;
