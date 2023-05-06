import styled from 'styled-components';
import exampleImage from '../../assets/Section3ExampleImage.png';

const Section03Post = () => {
  return (
    <PostContainer>
      <img src={exampleImage} alt="dog Image" />
      <TextLabelContainer>
        <h1>공원에서 산책하실 분!</h1>
        <h5>강서구</h5>
      </TextLabelContainer>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  width: 35rem;
  height: 25rem;
  border-radius: 5rem 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  overflow: hidden;

  img {
    width: 100%;
    height: 70%;
    object-fit: cover;
  }
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
