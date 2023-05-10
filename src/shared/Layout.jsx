import styled from 'styled-components';
import Header from '../component/layout/Header';
import Footer from '../component/layout/Footer';

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
  margin-top: 5rem;
  padding: 0 2rem;
`;

export default Layout;
