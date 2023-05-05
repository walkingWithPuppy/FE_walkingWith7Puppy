import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BoardDetail from '../pages/BoardDetail';
import BoardList from '../pages/BoardList';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const AnimatedRouter = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.key} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/:boardId" element={<BoardDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRouter;
