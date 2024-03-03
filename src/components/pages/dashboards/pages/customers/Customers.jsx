import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { CustomersAllAdmin } from './CustomersAllAdmin';
import { SearchAdmin } from '../products/SearchAdmin';

export const Customers = ({ drawerWidth, users }) => {
  if (!users) return;

  return (
    <Box
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
        ml: { md: `${drawerWidth}px` },
        p: 1,
        pt: 14,

        backgroundColor: '#fafafa',
        height: '100vh',
      }}
    >
      <Container maxWidth="xl">
        <Typography component="h1" variant="h4">
          Customers
        </Typography>
        <SearchAdmin textHolder="Search Customers" />
        <CustomersAllAdmin users={users} />
      </Container>
    </Box>
  );
};
