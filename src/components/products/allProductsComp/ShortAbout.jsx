import { Box, Typography } from '@mui/material';
import React from 'react';

export const ShortAbout = ({ product }) => {
  return (
    <Box sx={{ p: 1, height: 'auto' }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography>{product.title}</Typography>
        <Typography>{product.price} €</Typography>
      </Box>
    </Box>
  );
};
