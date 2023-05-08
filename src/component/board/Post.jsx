import react from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PATH_URL } from '../../shared/constants';

const Post = ({post }) => {
  return (
    <PostWrapper>
      <Link to={`${PATH_URL.BOARD}/${post.id}`}>
        <Area>{post.address}</Area>
        {/* <Image
          src="/assets/images/board/puppy1.jpg"
          alt="강아지이미지"
        /> */}
        <Image src={post.imgurl || '../../assets/images/board/noImg.jpg'} alt="puppy" />
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
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 250px;
`;

const Info = styled.div`
  padding: 20px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 16px;
  color: #9d9d9d;
  margin-bottom: 10px;
  line-height: 1.5;
`;

const Area = styled.p`
  font-weight: 700;
  font-size: 16px;
  color: #9d9d9d;
  text-align: right;
  margin-bottom: 20px;
`;

export default Post;
