import React from 'react';
import { motion } from 'framer-motion';
import HomeSection01 from '../component/home/HomeSection01';
import HomeSection02 from '../component/home/HomeSection02';
import HomeSection03 from '../component/home/HomeSection03';
import HomeSection04 from '../component/home/HomeSection04';
import styled from 'styled-components';

const MotionContainer = motion('div');
const Home = () => {
  return (
    <>
      <MotionContainer
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <HomeContainer>
          <HomeSection01 />
          <HomeSection02 />
          <HomeSection03 />
          <HomeSection04 />
        </HomeContainer>
      </MotionContainer>
    </>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

export default Home;
