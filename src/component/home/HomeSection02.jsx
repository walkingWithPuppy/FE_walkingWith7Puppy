import styled from 'styled-components';
import Section02Card from './Section02Card';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';

const HomeSection02 = () => {
  const animatedItem = {
    0: useScrollFadeIn('down', 1, 0.4),
    1: useScrollFadeIn('down', 1.5, 1),
    2: useScrollFadeIn('down', 2, 1.5),
  };

  return (
    <Section02>
      <TextLabel>
        <div id="title" {...animatedItem[0]}>
          WWP와 함께해요!
        </div>
        <div {...animatedItem[1]}>
          혼자 산책하기 지겨우신가요? 가까운 동네 주민과 반려견 친구를 함께 만나보세요!{' '}
        </div>
      </TextLabel>
      <div {...animatedItem[2]}>
        <Section02Card />
      </div>
    </Section02>
  );
};

const Section02 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2.5rem;
  #title {
    font-size: 1.8rem;
    font-weight: 700;
  }
`;

export default HomeSection02;
