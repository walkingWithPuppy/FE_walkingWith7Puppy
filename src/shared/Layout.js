import styled from 'styled-components';
import Header from '../component/Header';
import Footer from '../component/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

const Content = styled.div`
  min-height: 100vh;
`;

export default Layout;
