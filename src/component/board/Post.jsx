import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PATH_URL } from '../../shared/constants';
import ImgTag from '../common/ImgTag';

const Post = ({ post }) => {
  return (
    <PostWrapper>
      <Link to={`${PATH_URL.BOARD}/${post.id}`}>
        <Area>{post.address}</Area>
        <ImgTag img={post.img} height="250px" />
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

const Info = styled.div`
  padding: 10px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Content = styled.p`
  font-size: 16px;
  color: #9d9d9d;
  margin-bottom: 10px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
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
