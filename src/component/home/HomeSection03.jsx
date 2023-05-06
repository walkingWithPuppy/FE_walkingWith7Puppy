import styled from 'styled-components';
import Section03Post from './Section03Post';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';

const HomeSection03 = () => {
  const animatedItem = {
    0: useScrollFadeIn('down', 1, 0.2),
    1: useScrollFadeIn('down', 1.5, 0.8),
  };
  return (
    <Section03>
      <TextLabel {...animatedItem[0]}>산책 메이트를 기다리고 있어요!</TextLabel>
      <div {...animatedItem[1]}>
        <Section03Post />
      </div>
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
