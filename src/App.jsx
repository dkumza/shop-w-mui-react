import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AllProducts } from './components/products/AllProducts';
import './App.css';
import { useAuthContext } from './context/autCtx';

export default function App() {
  const { isUserLoggedIn } = useAuthContext();

  return (
    <>
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
