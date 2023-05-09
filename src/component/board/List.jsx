import Post from './Post';
import styled from 'styled-components';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';
import { PATH_URL } from '../../shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { __getByAddress, __getList } from '../../redux/modules/boardsSlice';
import Cookies from 'js-cookie';

const List = () => {
  const [isLogin, setIsLogin] = useState(false);
  const token = Cookies.get('token');
  const dispatch = useDispatch();
  const posts = useSelector(state => state.boards.boards);
  const filteredList = useSelector(state => state.boards.filteredList);
  const [prevPosts, setPrevPosts] = useState(posts);

  const ADDRESS_SELECT = [
    { value: 'all', label: '전체' },
    { value: '강서구', label: '강서구' },
    { value: '강동구', label: '강동구' },
    { value: '강북구', label: '강북구' },
    { value: '강남구', label: '강남구' },
    { value: '관악구', label: '관악구' },
    { value: '광진구', label: '광진구' },
    { value: '구로구', label: '구로구' },
    { value: '금천구', label: '금천구' },
    { value: '노원구', label: '노원구' },
    { value: '도봉구', label: '도봉구' },
    { value: '동대문구', label: '동대문구' },
    { value: '동작구', label: '동작구' },
    { value: '마포구', label: '마포구' },
    { value: '서대문구', label: '서대문구' },
    { value: '서초구', label: '서초구' },
    { value: '성동구', label: '성동구' },
    { value: '성북구', label: '성북구' },
    { value: '송파구', label: '송파구' },
    { value: '양천구', label: '양천구' },
    { value: '영등포구', label: '영등포구' },
    { value: '용산구', label: '용산구' },
    { value: '은평구', label: '은평구' },
    { value: '종로구', label: '종로구' },
    { value: '중구', label: '중구' },
    { value: '중랑구', label: '중랑구' },
  ];

  const [address, setAddress] = useState(ADDRESS_SELECT[0].value);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
    dispatch(__getList());
  }, [token, dispatch, posts]);
  // 렌더링 체크필요

  // useEffect(() => {
  //   if (JSON.stringify(posts) !== JSON.stringify(prevPosts)) {
  //     setPrevPosts(posts);
  //   }
  // }, [posts, prevPosts]);

  // 주소검색 이벤트핸들러 렌더링
  const handleChange = useCallback(
    event => {
      const address = event.target.value;
      setAddress(address);
      // dispatch(__getByAddress(address));
    },
    [dispatch]
  );

  return (
    <ListWrapper>
      <SelectWrapper>
        <Container>
          <StTitle>메이트를 찾고 있어요</StTitle>
          <StFormControl>
            <InputLabel id="demo-simple-select-label">
              <StLabel>만나요</StLabel>
            </InputLabel>
            <StSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={address}
              label="Address"
              onChange={handleChange}
            >
              {ADDRESS_SELECT.map(address => (
                <MenuItem key={address.value} value={address.value}>
                  {address.label}
                </MenuItem>
              ))}
            </StSelect>
          </StFormControl>
        </Container>
      </SelectWrapper>
      <PostWrapper>
        {/* 전체값 : 전체로 조회시 어떻게 전달할지 모름*/}
        {/* {address === ADDRESS_SELECT[0].value
          ? posts?.map(post => <Post key={post.id} post={post} />)
          : filteredList?.map(post => <Post key={post.id} post={post} />)} */}
        {posts?.map(post => (
          <Post key={post.id} post={post} />
        ))}
        ;
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

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
`;

const StFormControl = styled(FormControl)`
  width: 120px;
`;

const StTitle = styled.span`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: semi-bold;
  color: #fbae03;
`;

const StLabel = styled.p`
  font-size: px;
  font-weight: bold;
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
