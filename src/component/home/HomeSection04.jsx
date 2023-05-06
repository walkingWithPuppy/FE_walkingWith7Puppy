import styled from 'styled-components';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';

const HomeSection04 = () => {
  const animatedItem = {
    0: useScrollFadeIn('down', 1, 0.2),
  };
  return (
    <Section04 {...animatedItem[0]}>
      <Button>우리 동네 강아지 친구, 지금 찾아보세요!</Button>
    </Section04>
  );
};

const Section04 = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 12rem;
`;

const Button = styled.button`
  width: 30rem;
  background-color: #fbae03;
  padding: 1rem;
  border-radius: 3rem;

  font-size: 1.5rem;
  color: white;
  font-weight: 600;

  :hover {
    transition: 0.7s;
    background-color: #fe7e01;
  }
`;

export default HomeSection04;
