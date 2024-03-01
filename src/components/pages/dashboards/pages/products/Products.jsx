import { Box, Container } from '@mui/material';
import React from 'react';

export const Products = ({ drawerWidth }) => {
  return (
    <Box
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
        ml: { md: `${drawerWidth}px` },
        pt: 10,
        // p: 0,
        backgroundColor: '#fafafa',
        height: '100vh',
      }}
    >
      <Container maxWidth="xl">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor ratione at itaque
        iusto quasi omnis modi distinctio veritatis eveniet. Porro dolor architecto iure
        quo minima, labore ipsam rem quisquam qui!
      </Container>
    </Box>
  );
};
