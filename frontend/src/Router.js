import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const Router = (props) => {
  // const {} = props;
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

export default Router;
