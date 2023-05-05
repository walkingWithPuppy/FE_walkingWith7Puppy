import styled from 'styled-components';
import Header from '../component/Header';

const Layout = ({ content }) => {
  return (
    <>
      <Header />
      <div>{content}</div>
    </>
  );
};

export default Layout;
