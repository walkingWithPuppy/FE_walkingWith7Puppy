import styled from 'styled-components';

const HomeSection04 = () => {
  return (
    <Section04>
      <Button>우리 동네 강아지 친구, 지금 찾아보세요!</Button>
    </Section04>
  );
};

const Section04 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
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
`;

export default HomeSection04;
