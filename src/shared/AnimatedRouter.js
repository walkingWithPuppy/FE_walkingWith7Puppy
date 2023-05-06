import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BoardDetail from '../pages/BoardDetail';
import BoardList from '../pages/BoardList';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { PATH_URL } from './constants';

const AnimatedRouter = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.key} location={location}>
        <Route path={PATH_URL.HOME} element={<Home />} />
        <Route path={PATH_URL.LOGIN} element={<Login />} />
        <Route path={PATH_URL.SIGNUP} element={<SignUp />} />
        <Route path={PATH_URL.BOARD} element={<BoardList />} />
        <Route path={PATH_URL.POST} element={<BoardDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRouter;
