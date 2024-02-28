import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { AdminNavMain } from './components/AdminNavBar/AdminNavMain';

export const AdminPanel = () => {
  return (
    <>
      <AdminNavMain />
      <Routes>
        {/* <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} /> */}
      </Routes>
    </>
  );
};
