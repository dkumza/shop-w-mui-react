import React from 'react';
import { AllProducts } from './products/AllProducts';
import NavBar from './navBar/NavBar';

export const Layout = () => {
  return (
    <div>
      <NavBar />
      <AllProducts />
    </div>
  );
};
