import styled from 'styled-components';
import { EditLocationAlt, DeleteForever } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { formatDate } from '../../utils/formatDate';
import { __deleteComment, __updateComment } from '../../redux/modules/commentsSlice';
import { useDispatch } from 'react-redux';

const CommentItem = ({ comment, boardId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const [content, setContent] = useState('');
  useEffect(() => {
    if (token) {
      setIsLogin(() => true);
    }
  }, [token]);

  const handleEdit = (boardId, commentId) => {
    setIsEdit(true);
    setContent(comment.content);
  };

  const handleDelete = (boardId, commentId) => {
    dispatch(__deleteComment({ boardId, commentId }));
    setIsEdit(false);
  };

  const handleInputChange = e => {
    setContent(e.target.value);
  };

  const handleUpdate = (boardId, commentId, content) => {
    dispatch(__updateComment({ boardId, commentId, content }));
    setIsEdit(false);
  };

  return (
    <CommentItemWrapper>
      <ItemInfo>
        <CommentInfo>
          <NickName>{comment.username}</NickName>
          <CreatedDate>
            {comment.modifiedAt ? (
              <>{formatDate(comment.modifiedAt)}</>
            ) : comment.createdAt ? (
              <>{formatDate(comment.createdAt)}</>
            ) : (
              <></>
            )}
          </CreatedDate>
        </CommentInfo>
        {isLogin && (
          <IconsWrapper>
            {isEdit ? (
              <>
                <Button onClick={() => handleUpdate(boardId, comment.id, content)}>수정</Button>
                <Button onClick={() => setIsEdit(false)}>취소</Button>
              </>
            ) : (
              <>
                <Icon onClick={() => handleEdit(boardId, comment.id)}>
                  <EditLocationAlt />
                </Icon>
                <Icon onClick={() => handleDelete(boardId, comment.id)}>
                  <DeleteForever />
                </Icon>
              </>
            )}
          </IconsWrapper>
        )}
      </ItemInfo>

      {isEdit ? (
        <Input type="text" value={content} onChange={handleInputChange} />
      ) : (
        <Content>{comment.content}</Content>
      )}
    </CommentItemWrapper>
  );
};

const CommentItemWrapper = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CommentInfo = styled.div`
  display: flex;
`;
const NickName = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
`;

const CreatedDate = styled.p`
  font-size: 14px;
  color: #888;
`;

const Content = styled.p`
  font-size: 16px;
  margin-top: 10px;
`;

const IconsWrapper = styled.div`
  display: flex;
`;

const Icon = styled.div`
  margin-left: 10px;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Input = styled.input`
  font-size: 16px;
  margin-top: 10px;
  height: 50px;
  width: 100%;
  border: 1px solid #9d9d9d;
  &:focus {
    outline: none;
  }
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
export default CommentItem;
