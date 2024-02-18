import React from 'react';
import { useAuthContext } from '../../context/autCtx';
import { Container } from '@mui/material';

export const AllProducts = () => {
  const { logout } = useAuthContext();

  return (
    <Container>
      <h1>AllProducts</h1>
      <button onClick={logout}>Logout</button>
    </Container>
  );
};
