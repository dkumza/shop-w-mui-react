import React, { useEffect } from 'react';
import { Box, Container, LinearProgress } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../context/autCtx';

const PRODUCT_URL = 'http://localhost:3000/api/products';

export const AllProducts = () => {
  const [spinner, setSpinner] = useState(true);
  const { token } = useAuthContext();

  useEffect(() => {
    axios
      .get(PRODUCT_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSpinner(false);
      })
      .catch((error) => {
        console.log('error ===', error);
        setSpinner(false);
      });
  }, []);
  return (
    <>
      <Box sx={{ width: '100%', position: 'absolute' }}>
        {spinner && <LinearProgress />}
      </Box>

      <Container maxWidth="lg"></Container>
    </>
  );
};
