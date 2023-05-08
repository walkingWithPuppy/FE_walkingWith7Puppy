import styled from 'styled-components';
import { ReactComponent as SmileIcon } from '../../assets/Section02SmileIcon.svg';
import { ReactComponent as DogIcon } from '../../assets/Section2DogIcon.svg';
import { ReactComponent as BoneIcon } from '../../assets/Section2BoneIcon.svg';
import { ReactComponent as FootIcon } from '../../assets/Section2FootIcon.svg';

const Section02Card = () => {
  const cardList = [
    {
      icon: <StyledIcon as={SmileIcon} />,
      title: '안전해요!',
      content: 'WWP는 견주 인증을 한 유저만 이용할 수 있어요.',
    },
    {
      icon: <StyledIcon as={DogIcon} />,
      title: '즐거워요!',
      content: '우리 강아지도 친구를 만나 사회성을 기를 수 있어요.',
    },
    {
      icon: <StyledIcon as={BoneIcon} />,
      title: '간편해요!',
      content: '글을 올리고 댓글을 확인하면 완료! 간편하게 이용할 수 있어요.',
    },
    {
      icon: <StyledIcon as={FootIcon} />,
      title: '건강해요!',
      content: '귀찮아서 미룬 적 많았던 산책, 즐겁게 나갈 수 있어요.',
    },
  ];

  return (
    <CardsContainer>
      {cardList.map((card, idx) => (
        <CardBox key={idx}>
          <Icon>{card.icon}</Icon>
          <H1>{card.title}</H1>
          <P>{card.content}</P>
        </CardBox>
      ))}
    </CardsContainer>
  );
};

const CardsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  color: #fbae03;
`;

const Icon = styled.div`
  background-color: #ffd88a;
  border-radius: 50%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const P = styled.p`
  line-height: 150%;
`;

const StyledIcon = styled.div`
  width: 70px;
  height: 70px;
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3rem;
  height: 22rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  flex-basis: calc(25% - 2rem);

  padding: 3rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #ffd88a;
    transition: 0.7s;

    ${Icon} {
      background-color: white;
    }
    ${StyledIcon} path {
      fill: #ffd88a;
    }
    ${H1}, p {
      color: white;
    }
  }
`;

export default Section02Card;
