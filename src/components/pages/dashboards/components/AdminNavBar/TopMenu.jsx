import { AppBar, Box, useTheme } from '@mui/material';

const drawerWidth = 280;

export const TopMenu = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>left</Box>
          <Box>right</Box>
        </Box>
      </AppBar>
    </>
  );
};
