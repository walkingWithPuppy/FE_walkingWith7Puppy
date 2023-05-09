import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { PATH_URL } from '../../shared/constants';
import { useDispatch } from 'react-redux';
import { __createPost, __updatePost } from '../../redux/modules/boardsSlice';
import { api } from '../../api/axios';

const CreateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const imgRef = useRef();
  const { post } = location.state || {};
  const boardId = new URLSearchParams(location.search).get('id');
  const isEdit = !!boardId;
  const noImg = '/images/board/noImg.jpg';

  const initialValue = {
    title: '',
    address: '',
    // mgUrl: '',
    imgUrl: '',
    content: '',
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [imgUrl, setImgUrl] = useState('');
  const [imgFile, setImgFile] = useState({});

  // const { title, area, content,imgurl } = formValue;
  const { title, address, content } = formValue;
  useEffect(() => {
    if (post) {
      setFormValue({
        ...formValue,
        title: post.title,
        address: post.address,
        content: post.content,
        imgUrl: post.imgUrl || '',
      });
      imgRef.current.src = post.imgUrl || '';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const formData = new FormData();

  const onSubmitHandler = async e => {
    e.preventDefault();

    const data = {
      title,
      content,
      address,
    };
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    formData.append('image', imgFile);

    // console.log(formData.values);
    // console.log('title:::::::::::::', formData.get('title'));
    // console.log('content:::::::::::::', content);
    // console.log('imgUrl:::::::::::::', formData.get('image'));
    // console.log('address:::::::::::::', address);

    if (post && post.id) {
      // formData.append('id', boardId);
      const response = await dispatch(__createPost(formData));
      console.log(response);
      if (response.status === 200) {
        URL.revokeObjectURL(imgFile);
        setImgFile({});
        navigate(PATH_URL.BOARD);
      }
    }

    if (isEdit) {
      // dispatch(__updatePost(formData));
      dispatch(__updatePost(formData));
    } else {
      // dispatch(__createPost(formData));
      dispatch(__createPost(formData));
    }
    navigate(PATH_URL.BOARD);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    // const imgUrl = URL.createObjectURL(file);
    formData.append('image', file);
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    console.log('file::::::::::::', file);
    // console.log('file::::::::::::', reader);
    // reader.onloadend = () => {
    setImgUrl(file);
    setImgFile(file);
    // };
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
        {/*업로드된 이미지 미리보기 */}
        <ImageWrapper>
          {/* url방식 */}
          {/* 이미지는 파일형식 정해지면 처리 */}
          {/* <PreviewImage src={imgUrl ? imgUrl : noImg} alt="noImg" /> */}
          {/* // 이미지 업로드 input */}
          {/* url방식으로 저장되는 것 확인 */}
          {/* <Input
            name="imgurl"
            type="text"
            placeholder="이미지 url을 입력하세요"
            onChange={handleInputChange}
            /> */}
          <input type="file" accept="image/*" id="imgUrl" onChange={saveImgFile} ref={imgRef} />
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
