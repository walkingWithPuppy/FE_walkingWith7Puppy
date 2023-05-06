import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AnimatedRouter from './AnimatedRouter';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRouter />
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
