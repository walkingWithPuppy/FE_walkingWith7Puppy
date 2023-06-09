import React from 'react';
import { motion } from 'framer-motion';
import Detail from '../component/board/Detail';

const MotionContainer = motion('div');
const BoardDetail = () => {
  return (
    <MotionContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Detail />
    </MotionContainer>
  );
};

export default BoardDetail;
