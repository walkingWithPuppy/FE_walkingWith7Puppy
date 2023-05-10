import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

const Loading = ({ margin }) => {
  return (
    <LoadingContainer margin={margin}>
      <div className="axios-loading-indicator">
        <BeatLoader color="#fbae03" />
        <p>
          로딩 중입니다. <br />
          잠시만 기다려 주세요!
        </p>
      </div>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  .axios-loading-indicator {
    margin-top: ${props => props.margin};
    width: 100%;
    height: 100%;
    background-color: white;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  p {
    margin-top: 1rem;
    color: #fbae03;
    text-align: center;
    line-height: 150%;
  }
`;

export default Loading;
