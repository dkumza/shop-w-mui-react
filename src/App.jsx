import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuthContext } from './context/autCtx';
import { Layout } from './components/Layout';

export default function App() {
  const { isUserLoggedIn } = useAuthContext();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isUserLoggedIn ? <Layout /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </>
  );
}
