import styled from 'styled-components';
import { EditLocationAlt, DeleteForever } from '@mui/icons-material';
import { useState } from 'react';

const CommentItem = ({ comment }) => {
  const [isEdit, setIsEdit] = useState(false);
  // const [value, setValue] = useState(comment.content);
  const [value, setValue] = useState('');
  const initialValue = {
    content: '',
  };
  const [formValue, setFormValue] = useState(initialValue);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleDelete = () => {
    setIsEdit(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const { content } = formValue;
  return (
    <CommentItemWrapper>
      <ItemInfo>
        <CommentInfo>
          <NickName>김집사(jipsa@gmail.com)</NickName>
          <CreatedDate>2023-05-05 13:23</CreatedDate>
        </CommentInfo>
        <IconsWrapper>
          <Icon onClick={handleEdit}>
            <EditLocationAlt />
          </Icon>
          <Icon onClick={handleDelete}>
            <DeleteForever />
          </Icon>
        </IconsWrapper>
      </ItemInfo>

      {/* 수정여부에 따라 input활성화 */}
      {isEdit ? (
        <Input type="text" value={content} onChange={handleInputChange} />
      ) : (
        // <Content>{comment.content}</Content>
        <Content>저도 하고싶어요</Content>
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
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

export default CommentItem;
