import { AppBar, Box, Button, Drawer, IconButton, useTheme } from '@mui/material';
import UserMenu from '../../../../layout/navBar/UserMenu';
import MenuIcon from '@mui/icons-material/Menu';

import { useState } from 'react';

export const TopMenu = ({ drawerWidth, toggleDrawer }) => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
          ml: `${drawerWidth}px`,
          backgroundColor: 'white',
          boxShadow: '0',
          color: 'black',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { md: 4, xs: 2 },
            py: 1,
          }}
        >
          <Box>
            <IconButton
              sx={{ display: { md: 'none', xs: 'block' } }}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <UserMenu />
        </Box>
      </AppBar>
    </>
  );
};
