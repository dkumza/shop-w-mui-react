import { Box } from '@mui/material';
import React from 'react';

export const Products = ({ drawerWidth }) => {
  return (
    <Box
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        mt: 8,
        p: 4,
      }}
    >
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor ratione at itaque
      iusto quasi omnis modi distinctio veritatis eveniet. Porro dolor architecto iure quo
      minima, labore ipsam rem quisquam qui!
    </Box>
  );
};
