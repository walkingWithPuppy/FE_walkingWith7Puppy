import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { PATH_URL } from '../../shared/constants';

const CreateForm = () => {
  const navigate = useNavigate();
  const imgRef = useRef();

  const initialValue = {
    title: '',
    area: '',
    imageurl: '',
    content: '',
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [imgFile, setImgFile] = useState('');

  const goHome = () => {
    navigate(PATH_URL.HOME);
  };

  const onSubmitHandler = e => {
    const formData = new FormData();
    e.preventDefault();
    formData.append('imgFile', imgFile);
    formData.append('title', formValue.title);
    formData.append('area', formValue.area);
    formData.append('content', formValue.content);

    for (let data of formData.values()) {
      console.log(data);
    }
    // alert('등록되었습니다');
    navigate(PATH_URL.HOME);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const { title, area, content } = formValue;

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  return (
    <CreateFormWrapper>
      <FormWrapper onSubmit={onSubmitHandler}>
        <Label htmlFor="title" name="title">
          제목
        </Label>
        <Input
          name="title"
          value={title}
          type="text"
          placeholder="제목을 입력하세요"
          onChange={handleInputChange}
        />
        <Label htmlFor="area">지역구</Label>
        <Input
          name="area"
          value={area}
          type="text"
          placeholder="거주하시는 지역구를 입력하세요"
          onChange={handleInputChange}
        />
        {/* 일단 이미지 url을 넣어서 등록되도록 나중에 파일형태로 전달 */}
        {/* <Label htmlFor="image">이미지</Label>
        <Input
          name="imageurl"
          type="text"
          placeholder="이미지 url을 입력하세요"
          onChange={handleInputChange}
        /> */}

        {/*업로드된 이미지 미리보기 */}
        <ImageWrapper>
          {/* url방식 */}
          <PreviewImage src={imgFile ? imgFile : '/assets/images/board/noImg.jpg'} alt="noImg" />
          {/* // 이미지 업로드 input */}
          <input type="file" accept="image/*" id="imgFile" onChange={saveImgFile} ref={imgRef} />
        </ImageWrapper>
        <Label htmlFor="content">내용</Label>
        <Textarea value={content} name="content" onChange={handleInputChange} />
        <ButtonWrapper>
          <Button onClick={goHome} background="#fff" color="#fbae03">
            취소하기
          </Button>
          <Button type="submit" background="#fbae03" color="#fff">
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
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  height: 200px;
  border: 1px solid #fbae03;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
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

const ImageWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 15px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 250px;
  object-fit: contain;
`;

export default CreateForm;
