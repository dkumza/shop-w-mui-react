import SignIn from './components/pages/auth/SignIn';
import SignUp from './components/pages/auth/SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuthContext } from './components/context/autCtx';
import { InsertProduct } from './components/pages/products/crud/InsertProduct';
import NavBar from './components/layout/NavBar';
import { AllProducts } from './components/pages/products/AllProducts';
import { SingleProductPage } from './components/pages/products/singleProduct/SingleProductPage';
import { PersonalProducts } from './components/pages/dashboards/PersonalProducts';
import { AdminPanel } from './components/pages/dashboards/adminPanel/AdminPanel';

export default function App() {
  const { isUserLoggedIn, userID } = useAuthContext();

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
        <Route
          path="/personal/:userID"
          element={isUserLoggedIn ? <PersonalProducts /> : <Navigate to="/login" />}
        />
        {/* admin routes */}
        <Route
          path="/dashboard"
          element={isUserLoggedIn && +userID === 1 ? <AdminPanel /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}
