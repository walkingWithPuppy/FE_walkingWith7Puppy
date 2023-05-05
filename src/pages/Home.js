import React from 'react';
import { motion } from 'framer-motion';

const MotionContainer = motion('div');
const Home = () => {
  return (
    <MotionContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.2 }}
    ></MotionContainer>
  );
};

export default Home;
