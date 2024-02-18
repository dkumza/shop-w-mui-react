import React from 'react';
import { AllProducts } from './products/AllProducts';
import Header from './Header';

export const Layout = () => {
  return (
    <div>
      <Header />
      <AllProducts />
    </div>
  );
};
