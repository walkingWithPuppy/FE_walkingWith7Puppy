import styled from 'styled-components';
import ImgTag from '../common/ImgTag';

const Section03Post = ({ title, address, imgurl }) => {
  return (
    <PostContainer>
      <ImgTag img={imgurl} height="70%" />
      <TextLabelContainer>
        <h1>{title}</h1>
        <h5>{address}</h5>
      </TextLabelContainer>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  width: 35rem;
  height: 25rem;
  border-radius: 5rem 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin-bottom: 4rem;
  background-color: white;

  overflow: hidden;
`;

const TextLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.5rem 0 2.5rem;
  height: 30%;

  h1,
  h5 {
    font-weight: 700;
    font-size: 1.2rem;
  }

  h5 {
    color: #afafaf;
  }
`;

export default Section03Post;
