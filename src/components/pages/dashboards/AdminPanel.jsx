import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import { AdminNavMain } from './components/AdminNavBar/AdminNavMain';
import { OverView } from './pages/overview/OverView';
import { Customers } from './pages/customers/Customers';
import { TopMenu } from './components/AdminNavBar/TopMenu';
import { useState } from 'react';
import Products from './pages/products/Products';
import axios from 'axios';
import { useAuthContext } from '../../context/autCtx';

const C_URL = `http://localhost:3000/api/auth/users-count`;

const drawerWidth = 280;

export const AdminPanel = () => {
  const { token } = useAuthContext();

  const [drawer, setDrawer] = useState(false);
  const [custData, setCustData] = useState(null);
  const [spinner, setSpinner] = useState(true);

  const toggleDrawer = () => {
    setDrawer((prev) => !prev);
  };

  useEffect(() => {
    if (custData) setSpinner(false);
  }, []);

  useEffect(() => {
    axios
      .get(C_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCustData(res.data);
        setSpinner(false);
      })
      .catch((error) => {
        console.log('error ===', error);
        setSpinner(false);
      });
  }, []);

  return (
    <>
      <AdminNavMain
        drawerWidth={drawerWidth}
        drawer={drawer}
        toggleDrawer={toggleDrawer}
      />
      <TopMenu drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />
      <Routes>
        <Route
          path="overview"
          element={
            <OverView custData={custData} spinner={spinner} drawerWidth={drawerWidth} />
          }
        />
        <Route
          path="customers"
          element={
            custData && <Customers users={custData.users} drawerWidth={drawerWidth} />
          }
        />
        <Route path="products" element={<Products drawerWidth={drawerWidth} />} />
      </Routes>
    </>
  );
};
