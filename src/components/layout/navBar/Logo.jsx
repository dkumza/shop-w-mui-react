import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export const Logo = ({ linkTo }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        component={RouterLink}
        to={linkTo}
        variant="h3"
        noWrap
        sx={{
          mr: 1,
          display: { xs: 'none', md: 'flex' },
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        trade
      </Typography>
      <Typography
        variant="body4"
        noWrap
        sx={{
          display: { xs: 'none', md: 'flex' },
          // fontWeight: 700,
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Trade partner <br />
        that all we trust
      </Typography>
    </Box>
  );
};
