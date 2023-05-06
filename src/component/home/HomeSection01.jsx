import styled from 'styled-components';
import headerImg from '../../assets/HeaderImage.png';

const HomeSection01 = () => {
  return (
    <Container>
      <TextContainer>
        <Title>Walking with Puppy</Title>
        <Describe>
          우리 강아지도 친구를 만들어주세요!
          <br />
          <b>우리동네 애견 산책 메이트</b> 찾기 서비스
        </Describe>
      </TextContainer>
      <Button>WWP 산책메이트 찾기</Button>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fbae03;
  height: 25rem;
  border-radius: 5rem;
  background-image: url(${headerImg});
  background-repeat: no-repeat;
  background-position: 90% 46%;
  background-size: 35rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5rem;
  gap: 3rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;

const Describe = styled.p`
  line-height: 150%;
`;

const Button = styled.button`
  background-color: white;
  width: 12rem;
  padding: 0.5rem 1rem;
  border-radius: 3rem;
  color: #fbae03;
  background-color: white;
  font-weight: 600;
  font-size: 1rem;
`;

export default HomeSection01;
