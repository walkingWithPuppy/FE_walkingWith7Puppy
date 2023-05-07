import Post from './Post';
import styled from 'styled-components';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { __getList } from '../../redux/modules/boardsSlice';
import Cookies from 'js-cookie';

const List = () => {
  const [isLogin, setIsLogin] = useState(false);
  const token = Cookies.get('token');
  const dispatch = useDispatch();
  const posts = useSelector(state => state.boards.boards);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
    dispatch(__getList());
  }, [token, dispatch]);

  // api받을지 결정필요(임시데이터)
  const AREAS_SELECT = [
    { value: 'gangnam', label: '강남구' },
    { value: 'gangseo', label: '강서구' },
    { value: 'mapo', label: '마포구' },
    { value: 'jongro', label: '종로구' },
  ];

  const [area, setArea] = useState(AREAS_SELECT[0].value);

  const handleChange = event => {
    setArea(event.target.value);
  };

  return (
    <ListWrapper>
      <SelectWrapper>
        <StFormControl>
          <InputLabel id="demo-simple-select-label">
            <StLabel>만나요</StLabel>
          </InputLabel>
          <StSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={area}
            label="Area"
            onChange={handleChange}
          >
            {AREAS_SELECT.map(area => (
              <MenuItem key={area.value} value={area.value}>
                {area.label}
              </MenuItem>
            ))}
          </StSelect>
        </StFormControl>
      </SelectWrapper>
      <PostWrapper>
        {posts?.map(post => {
          return <Post key={post.id} post={post} />;
        })}
      </PostWrapper>
      <Link to={PATH_URL.CREATE}>
        {isLogin && (
          <CreateButton>
            <CreateIcon />
          </CreateButton>
        )}
      </Link>
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 20px auto;
  max-width: 1200px;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 100px;
`;

const StFormControl = styled(FormControl)`
  width: 120px;
`;

const StLabel = styled.p`
  font-size: 18px;
`;

const StSelect = styled(Select)`
  height: 45px;
  .MuiSelect-icon {
    color: #fbae03;
  }
`;

const CreateButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fbae03;
  border: none;
  outline: none;
  & > svg {
    color: white;
  }
`;

export default List;
