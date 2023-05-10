import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { PATH_URL } from '../../shared/constants';
import { useDispatch } from 'react-redux';
import { __createPost, __updatePost } from '../../redux/modules/boardsSlice';

const CreateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const imgRef = useRef();
  const { post } = location.state || {};
  const boardId = parseInt(new URLSearchParams(location.search).get('id'));
  const isEdit = !!boardId;
  const noImg = '/images/board/no-img.jpg';

  const initialValue = {
    title: '',
    address: '',
    img: noImg,
    content: '',
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [img, setImg] = useState('');
  const { title, address, content } = formValue;

  useEffect(() => {
    if (post) {
      setFormValue({
        ...formValue,
        title: post.title,
        address: post.address,
        content: post.content,
        img: post.img,
      });
      // imgRef.current.src = post.img || '';
      setImg(post.img);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const onSubmitHandler = async e => {
    e.preventDefault();

    if (isFormValid()) {
      const formData = new FormData();
      const data = {
        title,
        content,
        address,
      };
      const img = imgRef.current.files[0];
      
      formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      console.log(img && console.log(img,'$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'))
      img && formData.append('img', img);
      // img 없을경우에는???(변경없을경우나))
      // if(post) 일경우 hidden

      if (isEdit) {
        const id = post.id;
        await dispatch(__updatePost({ id, formData }));
      } else {
        await dispatch(__createPost(formData));
      }
      navigate(PATH_URL.BOARD);
    }
  };

  const isFormValid = () => {
    if (!formValue.title || formValue.title.trim() === '') {
      alert('제목을 입력해주세요.');
      return false;
    }
    if (!formValue.address || formValue.address.trim() === '') {
      alert('지역구를 입력해주세요.');
      return false;
    }
    if (!formValue.content || formValue.content.trim() === '') {
      alert('내용을 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const saveImgFile = e => {
    const file = e.target.files[0];
    // const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
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
        <Label htmlFor="address">지역구</Label>
        <Input
          name="address"
          value={address}
          type="text"
          placeholder="거주하시는 지역구를 입력하세요"
          onChange={handleInputChange}
        />
        <ImageWrapper>
          {/* 이미지가 있으면 post.img없으면 noImg */}
          <PreviewImage src={img || noImg} alt="noImg" />
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={saveImgFile}
            ref={imgRef}
            required={!isEdit} // board id가 없으면등록필수
          />
        </ImageWrapper>
        <Label htmlFor="content">내용</Label>
        <Textarea value={content} name="content" onChange={handleInputChange} />
        <ButtonWrapper>
          <Link to={PATH_URL.BOARD}>
            <Button background="#fff" color="#fbae03">
              취소하기
            </Button>
          </Link>
          <Button type="submit" background="#fbae03" color="#fff">
            {isEdit ? '수정하기' : '등록하기'}
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
