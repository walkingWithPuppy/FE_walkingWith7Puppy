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
import Loading from '../Loading';
import useAddressSelect from '../../hooks/useAddressSelect';

const List = () => {
  const [isLogin, setIsLogin] = useState(false);
  const token = Cookies.get('token');
  const dispatch = useDispatch();
  const posts = useSelector(state => state.boards.boards);
  const [isLoading, setIsLoading] = useState(false);

  const { ADDRESS_SELECT, address, setAddress } = useAddressSelect();

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
    const fetchBoard = async () => {
      setIsLoading(true);
      await dispatch(__getList());
      setIsLoading(false);
    };
    fetchBoard();
  }, [token, dispatch]);

  const handleChange = useCallback(
    event => {
      const address = event.target.value;
      setAddress(address);
      dispatch(__getByAddress(address));
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <PostWrapper>
            {address === ADDRESS_SELECT[0].value
              ? posts?.map(post => <Post key={post.id} post={post} />)
              : posts
                  ?.filter(item => item.address === address)
                  .map(post => <Post key={post.id} post={post} />)}
          </PostWrapper>
          <Link to={PATH_URL.CREATE}>
            {isLogin && (
              <CreateButton>
                <CreateIcon />
              </CreateButton>
            )}
          </Link>
        </>
      )}
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
  z-index: 1;
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
