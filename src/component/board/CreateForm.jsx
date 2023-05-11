import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { PATH_URL } from '../../shared/constants';
import { useDispatch } from 'react-redux';
import { __createPost, __updatePost } from '../../redux/modules/boardsSlice';
import { FormControl, Select, MenuItem } from '@mui/material';
import useAddressSelect from '../../hooks/useAddressSelect';

const CreateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const imgRef = useRef();
  const { post } = location.state || {};
  const boardId = parseInt(new URLSearchParams(location.search).get('id'));
  const isEdit = !!boardId;
  const noImg = '/images/board/no-img.jpg';

  const {
    ADDRESS_SELECT,
    address: selectAddress,
    setAddress: setSelectAddress,
  } = useAddressSelect();

  const initialValue = {
    title: '',
    address: '',
    img: noImg,
    content: '',
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [img, setImg] = useState('');
  const { title, content } = formValue;

  useEffect(() => {
    if (post) {
      setSelectAddress(post.address);
      setFormValue({
        ...formValue,
        title: post.title,
        address: post.address,
        content: post.content,
        img: post.img,
      });
      setImg(post.img);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const onSubmitHandler = async e => {
    e.preventDefault();
    const img = imgRef.current.files[0];

    if (isFormValid()) {
      const formData = new FormData();
      const data = {
        title,
        content,
        address: selectAddress,
      };

      formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
      img && formData.append('img', img);

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
    if (!img) {
      alert('이미지를 업로드해주세요');
      return;
    }
    return true;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const saveImgFile = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
  };

  const handleSelect = e => {
    const selectedAddress = e.target.value;
    setSelectAddress(selectedAddress);
    setFormValue(prevFormValue => ({ ...prevFormValue, address: selectAddress }));
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
          required
        />
        <Label htmlFor="address">지역구</Label>
        <FormControl>
          <SelectStyle
            value={selectAddress}
            onChange={handleSelect}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value=""></MenuItem>
            {ADDRESS_SELECT.map(address => (
              <MenuItem key={address.value} value={address.value}>
                {address.label}
              </MenuItem>
            ))}
          </SelectStyle>
        </FormControl>

        <ImageWrapper>
          <PreviewImage src={img || noImg} alt="noImg" />
          <FileInputLabel htmlFor="img">사진을 등록해주세요</FileInputLabel>
          <FileInput
            type="file"
            accept="image/*"
            id="img"
            name="img"
            onChange={saveImgFile}
            ref={imgRef}
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
  padding-left: 0.7rem;
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

  & input[type='file'] {
    display: none;
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 250px;
  object-fit: contain;
`;
const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  opacity: 0;
  cursor: pointer;
`;
const FileInputLabel = styled.label`
  display: block;
  margin: 8px auto;
  text-align: center;
  width: 250px;
  font-size: 15px;
  padding: 4px 8px;
  background-color: #fbae03;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
`;

const SelectStyle = styled(Select)`
  height: 45px;
  .MuiOutlinedInput-notchedOutline {
    border-color: #fbae03;
    border-radius: 0.5rem;
  }
  .MuiSelect-icon {
    color: #fbae03;
  }
`;

export default CreateForm;
