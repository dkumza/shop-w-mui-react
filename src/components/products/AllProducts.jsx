import React from 'react';
import { useAuthContext } from '../../context/autCtx';

export const AllProducts = () => {
  const { logout } = useAuthContext();

  return (
    <div>
      <h1>AllProducts</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
