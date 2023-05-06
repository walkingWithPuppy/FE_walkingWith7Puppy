import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';

const Detail = () => {
  const [isLogin, setIsLogin] = useState(false);
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLogin(() => true);
    }
  }, [token]);

  // id 전달받아서 수정,삭제 코드 작성 예정
  const handleUpdate = () => {
    alert('수정되었습니다');
    navigate(PATH_URL.BOARD);
  };

  const handleDelete = () => {
    alert('삭제되었습니다');
    navigate(PATH_URL.BOARD);
  };

  return (
    <DetailWrapper>
      <Container>
        <ContentWrapper>
          <Image src={'/assets/images/board/puppy1.jpg'} alt="noImg" />
          <Info>
            <Title>같이 산책할 친구 구합니다.</Title>
            <NickName>김집사(jipsa@gmail.com)</NickName>
            <Area>여기서 만나요 : 강서구</Area>
            <Description>
              이름은 뚱뚱이입니다.
              <br />
              오늘 저녁 8시에 한강에서 같이 산책할 친구 구해요.
              <br />
              사교성이 좋고 친구들을 좋아해요!
            </Description>
          </Info>
        </ContentWrapper>
        {/* 로그인한경우 id 같은 경우만 (+작성자id비교로직 추가필요) 수정,삭제 버튼 보이도록 */}
        {isLogin && (
          <ButtonWrapper>
            <Button onClick={() => handleUpdate()}>수정하기</Button>
            <Button onClick={() => handleDelete()}>삭제하기</Button>
          </ButtonWrapper>
        )}
      </Container>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  padding: 30px 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  margin-right: 30px;
  object-fit: cover;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const NickName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #666666;
`;

const Area = styled.p`
  font-weight: 700;
  font-size: 16px;
  color: #9d9d9d;
  margin-bottom: 5px;
`;

const Description = styled.p`
  font-size: 18px;
  margin-top: 20px;
  line-height: 1.5;
  color: #333333;
`;

const ButtonWrapper = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-left: 500px; // 오른쪽으로 버튼배치 수정필요
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  width: 5rem;
  border: 2px solid #fbae03;
  border-radius: 1rem;
  padding: 0.2rem 0.8rem;
  background-color: ${props => props.background};
  color: ${props => props.color};
  font-weight: 550;
`;

export default Detail;
