import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuthContext } from './context/autCtx';
import { InsertProduct } from './components/products/crud/InsertProduct';
import NavBar from './components/navBar/NavBar';
import { AllProducts } from './components/products/AllProducts';
import { SingleProductPage } from './components/products/singleProduct/SingleProductPage';

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
          element={isUserLoggedIn ? <InsertProduct /> : <Navigate to="/login" />}
        />
        <Route
          path="/product/:productID"
          element={isUserLoggedIn ? <SingleProductPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}
