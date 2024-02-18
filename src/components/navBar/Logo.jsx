import { Box, Typography } from '@mui/material';
import React from 'react';

export const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 1,
          display: { xs: 'none', md: 'inline' },
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
          mr: 4,
          display: { xs: 'none', md: 'inline' },
          // fontWeight: 700,
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Trade partner <br />
        that all we trust
      </Typography>
      {/* search bar on small screen */}
    </Box>
  );
};
