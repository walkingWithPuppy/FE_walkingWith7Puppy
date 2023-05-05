import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

const AnimatedRouter = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.key} location={location}>
        <Route />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRouter;
