import react from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PATH_URL } from '../../shared/constants';

const Post = ({ post }) => {
  const noImg = '/images/board/no-img.jpg';

  return (
    <PostWrapper>
      <Link to={`${PATH_URL.BOARD}/${post.id}`}>
        <Area>{post.address}</Area>
        <Image src={post.img || noImg} alt='puppy' />
        <Info>
          <Title>{post.title}</Title>
          <Content>{post.content}</Content>
        </Info>
      </Link>
    </PostWrapper>
  );
};

const PostWrapper = styled.div`
  display: flex;
  // align-items:flex-start
  flex-direction: column;
  width: 300px;
  height: 450px;
  margin: 20px;
  padding: 20px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  a {
    text-decoration: none;
  }
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 250px;
`;

const Info = styled.div`
  padding: 10px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  // white-space: nowrap; // 공백무시 한줄
  overflow: hidden;
  text-overflow: ellipsis; /* 2줄 이상인 경우 ...으로 나타내기 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Content = styled.p`
  font-size: 16px;
  color: #9d9d9d;
  margin-bottom: 10px;
  line-height: 1.5;
  // white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 2줄 이상인 경우 ...으로 나타내기 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const Area = styled.p`
  font-weight: 700;
  font-size: 16px;
  color: #9d9d9d;
  text-align: right;
  margin-bottom: 20px;
`;

export default Post;
