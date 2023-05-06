import styled from 'styled-components';
import Section03Post from './Section03Post';

const HomeSection03 = () => {
  return (
    <Section03>
      <TextLabel>산책 메이트를 기다리고 있어요!</TextLabel>
      <Section03Post />
    </Section03>
  );
};

const Section03 = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextLabel = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default HomeSection03;
