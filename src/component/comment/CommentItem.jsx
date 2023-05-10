import styled from 'styled-components';
import { EditLocationAlt, DeleteForever } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { formatDate } from '../../utils/formatDate';
import { __deleteComment, __updateComment } from '../../redux/modules/commentsSlice';
import { __getPostById } from '../../redux/modules/boardsSlice';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Loading from '../Loading';

const CommentItem = ({ comment, boardId, username }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const tokenUsername = jwtDecode(token);
      username === tokenUsername.sub ? setIdCheck(true) : setIdCheck(false);
    }
  }, [token]);

  const handleEdit = () => {
    setIsEdit(true);
    setContent(comment.content);
  };

  const handleDelete = async (boardId, commentId) => {
    setIsLoading(true);
    await dispatch(__deleteComment({ boardId, commentId }));
    await dispatch(__getPostById(boardId));
    setIsLoading(false);
  };

  const handleInputChange = e => {
    setContent(e.target.value);
  };

  const handleUpdate = async (boardId, commentId, content) => {
    setIsLoading(true);
    await dispatch(__updateComment({ boardId, commentId, content }));
    await dispatch(__getPostById(boardId));
    setIsLoading(false);
    setIsEdit(false);
  };

  const getFormattedDate = date => {
    return date ? formatDate(date) : '';
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
    <CommentItemWrapper>
      <ItemInfo>
        <CommentInfo>
          <NickName>{comment.username}</NickName>
          <CreatedDate>
            {getFormattedDate(comment.modifiedAt) || getFormattedDate(comment.createdAt)}
          </CreatedDate>
        </CommentInfo>

        <IconsWrapper>
          {isEdit ? (
            <>
              <Button onClick={() => handleUpdate(boardId, comment.id, content)}>수정</Button>
              <Button onClick={() => setIsEdit(false)}>취소</Button>
            </>
          ) : (
            <>
              {idCheck && (
                <>
                      <Icon onClick={handleEdit}>
                    <EditLocationAlt />
                  </Icon>
                  <Icon onClick={() => handleDelete(boardId, comment.id)}>
                    <DeleteForever />
                  </Icon>
                </>
              )}
            </>
          )}
        </IconsWrapper>
      </ItemInfo>

      <CommentWrapper>
        {isEdit ? (
          <Input type="text" value={content} onChange={handleInputChange} />
        ) : (
          <Content>{comment.content}</Content>
        )}
      </CommentWrapper>
    </CommentItemWrapper>
      )}
    </>
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

const CommentWrapper = styled.div`
  min-width: 700px;
`;

const Button = styled.button`
  width: 4rem;
  border: 2px solid #fbae03;
  border-radius: 1rem;
  padding: 0.2rem 0.8rem;
  margin-right: 5px;
  background-color: ${props => props.background};
  color: ${props => props.color};
  font-weight: 550;
  gap: 5px;
`;
export default CommentItem;
