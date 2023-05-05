import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimatedRouter from './AnimatedRouter';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <AnimatedRouter />
      <Layout></Layout>
    </BrowserRouter>
  );
};

export default Router;
