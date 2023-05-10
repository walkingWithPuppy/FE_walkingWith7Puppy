import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { __deletePost, __getPostById } from '../../redux/modules/boardsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import CommentList from '../comment/CommentList';
import { useQuery } from 'react-query';
import { api } from '../../api/axios';
import jwtDecode from 'jwt-decode';
import { formatDate } from '../../utils/formatDate';

const Detail = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [idCheck, setIdCheck] = useState(false);

  const token = Cookies.get('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector(state => state.boards.post);
  const { boardId } = useParams();

  const checkAccess = async () => {
    const response = await api.get(`${PATH_URL.BOARD}/${boardId}`);
    return response;
  };

  const { data } = useQuery('check', checkAccess);

  const handleUpdate = () => {
    navigate(`${PATH_URL.CREATE}?id=${boardId}`, { state: { post } });
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await dispatch(__deletePost(boardId));
      navigate(PATH_URL.BOARD);
    }
  };

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      const tokenUsername = jwtDecode(token);
      data?.data.username === tokenUsername.sub ? setIdCheck(true) : setIdCheck(false);
    }
    const fetchBoard = async () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setIsLoading(true);
      await dispatch(__getPostById(boardId));
      setIsLoading(false);
    };
    fetchBoard();
  }, [data]);

  const noImg = '/images/board/no-img.jpg';
  const handleImageError = e => (e.target.src = noImg);

  return (
    <DetailWrapper>
      {isLoading ? (
        <Loading margin="240%" />
      ) : (
        <DetailCommentContainer>
          <Container>
            <ContentWrapper>
              <Image src={post.img || noImg} onError={handleImageError} alt="puppy" />
              <Info>
                <InfoTitle>
                  <Title>{post.title}</Title>
                  <Area>{post.address}</Area>
                </InfoTitle>
                <NickName>{post.username}</NickName>
                <Date>
                  {post.modifiedAt ? (
                    <>{formatDate(post.modifiedAt)}</>
                  ) : post.createdAt ? (
                    <>{formatDate(post.createdAt)}</>
                  ) : (
                    <></>
                  )}
                </Date>
                <Description>{post.content}</Description>
              </Info>
            </ContentWrapper>
            {isLogin && (
              <ButtonWrapper>
                {idCheck && (
                  <>
                    <Button onClick={() => handleUpdate()}>수정하기</Button>
                    <Button onClick={() => handleDelete()}>삭제하기</Button>
                  </>
                )}
              </ButtonWrapper>
            )}
          </Container>
          <CommentList />
        </DetailCommentContainer>
      )}
    </DetailWrapper>
  );
};

const DetailCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  // align-items: center;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const Image = styled.img`
  min-width: 300px;
  display: flex;
  align-items: center;
  width: 300px;
  height: 300px;
  margin-right: 30px;
  object-fit: cover;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Info = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
`;

const InfoTitle = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
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
`;

const Date = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #666666;
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
  gap: 10px;
  margin-top: 10px;
`;
const Button = styled.button`
  width: 5rem;
  border: 2px solid #fbae03;
  border-radius: 1rem;
  padding: 0.2rem 0.8rem;
  background-color: #fff;
  color: #fbae03;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fbae03;
    color: #fff;
  }
`;
export default Detail;
