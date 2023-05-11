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
import PetsIcon from '@mui/icons-material/Pets';

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
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(__getList());
      setIsLoading(false);
    };
    fetchData();
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
          <StTitle>
            메이트를 찾고 있어요 <PetsIcon />
          </StTitle>
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
        <Loading margin="25%" />
      ) : (
        <>
          <PostWrapper>
            {address === ADDRESS_SELECT[0].value ? (
              posts?.map(post => <Post key={post.id} post={post} />)
            ) : posts?.filter(item => item.address === address).length === 0 ? (
              <NoPostTextContainer>
                <NoPostText>조회하신 지역구에는 메이트가 없어요</NoPostText>
              </NoPostTextContainer>
            ) : (
              posts
                ?.filter(item => item.address === address)
                .map(post => <Post key={post.id} post={post} />)
            )}
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
  margin: 40px auto;
  max-width: 1200px;
  justify-content: center;
`;

const PostWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  justify-items: start;
  margin-top: 40px;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  text-align: center;
  font-size: 24px;
  font-weight: semi-bold;
  color: #fbae03;
  z-index: 1;
`;

const StLabel = styled.p`
  font-size: 18px;
  margin-top: -2px;
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

const NoPostTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 200px;
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  color: #555;
`;

const NoPostText = styled.div`
  align-self: center;
`;

export default List;
