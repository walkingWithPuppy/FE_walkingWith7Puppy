import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PATH_URL } from '../shared/constants';
import { useState } from 'react';

const CreateForm = () => {
  const navigate = useNavigate();

  const initialValue = {
    title: '',
    area: '',
    imageurl: '',
    content: '',
  };

  const [formData, setFormData] = useState({
    title: '',
    area: '',
    imageurl: '',
    content: '',
  });

  const goHome = () => {
    navigate(PATH_URL.HOME);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    navigate(PATH_URL.HOME);
    setFormData(initialValue);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    // console.log(formData);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <CreateFormWrapper>
      <FormWrapper onSubmit={onSubmitHandler}>
        <Label htmlFor="title" name="title">
          제목
        </Label>
        <Input
          name="title"
          type="text"
          placeholder="제목을 입력하세요"
          onChange={handleInputChange}
        />
        <Label htmlFor="area">지역구</Label>
        <Input
          name="area"
          type="text"
          placeholder="거주하시는 지역구를 입력하세요"
          onChange={handleInputChange}
        />
        <Label htmlFor="image">이미지</Label>
        {/* 일단 이미지 url을 넣어서 등록되도록 나중에 파일형태로 전달 */}
        <Input
          name="imageurl"
          type="text"
          placeholder="이미지 url을 입력하세요"
          onChange={handleInputChange}
        />
        <Label htmlFor="content">내용</Label>
        <Textarea name="content" onChange={handleInputChange} />
        <ButtonWrapper>
          <Button onClick={goHome} background="#fff" color="#fbae03">
            취소하기
          </Button>
          <Button background="#fbae03" color="#fff">
            등록하기
          </Button>
        </ButtonWrapper>
      </FormWrapper>
    </CreateFormWrapper>
  );
};

const CreateFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
`;

const Label = styled.label`
  font-weight: semi-bold;
  margin-bottom: 5px;
  color: #9d9d9d;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #fbae03;
  border-radius: 0.5rem;
  height: 45px;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  height: 250px;
  border: 1px solid #fbae03;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  width: 6rem;
  height: 2.5rem;
  border: 2px solid #fbae03;
  border-radius: 1rem;
  padding: 0.2rem 0.8rem;
  background-color: ${props => props.background};
  color: ${props => props.color};
  font-weight: 550;
`;

export default CreateForm;
