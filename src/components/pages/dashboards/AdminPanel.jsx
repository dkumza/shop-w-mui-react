import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { AdminNavMain } from './components/AdminNavBar/AdminNavMain';
import { OverView } from './pages/overview/OverView';
import { Customers } from './pages/customers/Customers';
import { Products } from './pages/products/Products';

export const AdminPanel = () => {
  return (
    <>
      <AdminNavMain />
      <Routes>
        <Route path="overview" element={<OverView />} />
        <Route path="customers" element={<Customers />} />
        <Route path="products" element={<Products />} />
      </Routes>
    </>
  );
};
