import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuthContext } from './context/autCtx';
import { Sell } from './components/products/Sell';
import NavBar from './components/navBar/NavBar';
import { AllProducts } from './components/products/AllProducts';
import { SingleProductPage } from './components/products/SingleProductPage';

export default function App() {
  const { isUserLoggedIn } = useAuthContext();

  return (
    <>
      {isUserLoggedIn && <NavBar />}
      <Routes>
        <Route
          path="/"
          element={isUserLoggedIn ? <AllProducts /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/sell"
          element={isUserLoggedIn ? <Sell /> : <Navigate to="/login" />}
        />
        <Route path="/products/:productID" element={<SingleProductPage />} />
      </Routes>
    </>
  );
}
