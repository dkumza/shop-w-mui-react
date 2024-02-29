import { AppBar, Box, useTheme } from '@mui/material';
import UserMenu from '../../../../layout/navBar/UserMenu';

export const TopMenu = ({ drawerWidth }) => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
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
            px: 4,
            py: 1,
          }}
        >
          <Box>left</Box>
          <UserMenu />
        </Box>
      </AppBar>
    </>
  );
};
