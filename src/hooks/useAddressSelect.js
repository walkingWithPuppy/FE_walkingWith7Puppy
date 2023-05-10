import { useState } from 'react';

const useAddressSelect = () => {
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
  ];

  const [address, setAddress] = useState(ADDRESS_SELECT[0].value);

  return { ADDRESS_SELECT, address, setAddress };
};

export default useAddressSelect;
