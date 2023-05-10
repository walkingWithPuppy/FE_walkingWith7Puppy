import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import { __getPostById } from '../../redux/modules/boardsSlice';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { __createComment } from '../../redux/modules/commentsSlice';

const CommentList = () => {
  const [isLogin, setIsLogin] = useState(false);
  const token = Cookies.get('token');
  const dispatch = useDispatch();
  const comments = useSelector(state => state.boards.post.comments);
  const { boardId } = useParams();

  const initialValue = {
    content: '',
  };
  const [formValue, setFormValue] = useState(initialValue);
  const { content } = formValue;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleClick = async () => {
    if (!formValue.content | formValue.content.trim() === '') {
      alert('댓글을 입력해주세요.');
      return false;
    }

    await dispatch(__createComment({ boardId, content }));
    await dispatch(__getPostById(boardId));
    setFormValue(initialValue);
  };

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token]);

  useEffect(() => {
    dispatch(__getPostById(boardId));
  }, [dispatch, boardId]);

  return (
    <CommentWrapper>
      <Container>
        <Info>
          <CommentTitle>
            {comments?.length > 0 ? `${comments.length}개의 댓글이 있습니다.` : '댓글이 없습니다.'}
          </CommentTitle>
          {isLogin && (
            <Button onClick={handleClick} background="#fbae03" color="#fff">
              같이 산책하기
            </Button>
          )}
        </Info>
        <Input
          type="text"
          name="content"
          value={content}
          onChange={handleInputChange}
          placeholder="댓글을 입력하세요"
        />
        <ItemWrap>
          {comments?.map(comment => (
            <CommentItem key={comment.id} comment={comment} boardId={boardId} />
          ))}
        </ItemWrap>
      </Container>
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px auto;
  background-color: #fff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;

const Container = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 10px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  min-width: 550px;
  margin-bottom: 20px;
  justify-content: space-between;
  width: 100%;
`;

const CommentTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const Button = styled.button`
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  background-color: ${props => props.background};
  color: ${props => props.color};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 16px;
  outline: none;
`;

const ItemWrap = styled.div`
  width: 100%;
`;

export default CommentList;
