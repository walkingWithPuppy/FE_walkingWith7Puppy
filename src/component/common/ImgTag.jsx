import styled from 'styled-components';

const ImgTag = ({ img, height }) => {
  const noImg = '/images/board/no-img.jpg';
  const handleImageError = e => (e.target.src = noImg);
  return <Image src={img || noImg} onError={handleImageError} height={height} alt="puppy" />;
};

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: ${props => props.height};
`;

export default ImgTag;
