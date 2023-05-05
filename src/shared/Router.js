import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimatedRouter from './AnimatedRouter';

const Router = () => {
  return (
    <BrowserRouter>
      <AnimatedRouter />
    </BrowserRouter>
  );
};

export default Router;
