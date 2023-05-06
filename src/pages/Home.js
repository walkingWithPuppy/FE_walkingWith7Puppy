import React from 'react';
import { motion } from 'framer-motion';
import HomeSection01 from '../component/home/HomeSection01';

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
        <HomeSection01 />
      </MotionContainer>
    </>
  );
};

export default Home;
