import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { AdminNavMain } from './components/AdminNavBar/AdminNavMain';
import { OverView } from './pages/overview/OverView';
import { Customers } from './pages/customers/Customers';
import { TopMenu } from './components/AdminNavBar/TopMenu';
import { useState } from 'react';
import Products from './pages/products/Products';

const drawerWidth = 280;

export const AdminPanel = () => {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer((prev) => !prev);
    console.log('clicked');
  };

  return (
    <>
      <AdminNavMain
        drawerWidth={drawerWidth}
        drawer={drawer}
        toggleDrawer={toggleDrawer}
      />
      <TopMenu drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />
      <Routes>
        <Route path="overview" element={<OverView drawerWidth={drawerWidth} />} />
        <Route path="customers" element={<Customers drawerWidth={drawerWidth} />} />
        <Route path="products" element={<Products drawerWidth={drawerWidth} />} />
      </Routes>
    </>
  );
};
