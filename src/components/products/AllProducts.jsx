import React from 'react';
import { Box, Container, LinearProgress } from '@mui/material';
import { useState } from 'react';

export const AllProducts = () => {
  const [spinner, setSpinner] = useState(false);
  return (
    <>
      {/* <Box sx={{ width: '100%', position: 'absolute' }}>
        {!spinner && <LinearProgress />}
      </Box> */}

      <Container maxWidth="lg">
        <h1>AllProducts</h1>
      </Container>
    </>
  );
};
