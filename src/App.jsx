import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AllProducts } from './components/auth/products/AllProducts';

export default function App() {
  const isUserLoggedIn = false;

  return (
    <>
      {isUserLoggedIn && <SignIn />}
      {/* <SignUp /> */}
      <Routes>
        <Route
          path="/"
          element={isUserLoggedIn ? <AllProducts /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </>
  );
}
