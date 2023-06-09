import React from 'react';
import { motion } from 'framer-motion';
import CreateForm from '../component/board/CreateForm';

const MotionContainer = motion('div');
const BoardCreate = () => {
  return (
    <MotionContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <CreateForm />
    </MotionContainer>
  );
};

export default BoardCreate;
