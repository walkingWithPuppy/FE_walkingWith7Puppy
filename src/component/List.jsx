import Post from './Post';
import styled from 'styled-components';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

const List = () => {


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
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </PostWrapper>
    </ListWrapper>
  );
};

export default List;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 20px auto;
  max-width: 1200px;
  // padding: 30px;
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
