import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const boardId = new URLSearchParams(location.search).get('id');
  const isEdit = !!boardId;

  const initialValue = {
    title: '',
    address: '',
    imgFile: '',
    // imgurl: '',
    content: '',
  };
  // console.log(post);

  const [formValue, setFormValue] = useState(initialValue);
  const [imgFile, setImgFile] = useState('');
  // const { title, area, content,imgurl } = formValue;
  const { title, address, content } = formValue;
  useEffect(() => {
    if (post) {
      setFormValue({
        ...formValue,
        title: post.title,
        address: post.address,
        content: post.content,
        // imgFile: post.imgurl || '',
      });
      //imgRef.current.src = post.imgurl || '';
    }
  }, []);

  const onSubmitHandler = e => {
    e.preventDefault();
    const payload = {
      // AS-IS : file(base64), url 통신테스트후 수정필요
      // imgurl,
      imgFile,
      title,
      address,
      content,
    };

    if (post && post.id) {
      payload.id = post.id;
    }

    // console.log(title, area,content);
    if (isEdit) {
      // console.log(post.id);
      dispatch(__updatePost(payload));
    } else {
      dispatch(__createPost(payload));
    }
    navigate(PATH_URL.BOARD);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const noImg = '/images/board/no-img.jpg';

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
          <PreviewImage src={imgFile ? imgFile : noImg} alt="noImg" />
          {/* // 이미지 업로드 input */}
          {/* url방식으로 저장되는 것 확인 */}
          {/* <Input
            name="imgurl"
            type="text"
            placeholder="이미지 url을 입력하세요"
            onChange={handleInputChange}
            /> */}
          {/* base64저장 */}
          <input type="file" accept="image/*" id="imgFile" onChange={saveImgFile} ref={imgRef} />
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
