import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthContext } from '../../context/autCtx';
import { useState } from 'react';
import theme from '../../theme';
import { useNavigate } from 'react-router-dom';

const pages = ['Home', 'Favorites', 'Sell'];

export default function NavMenu() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuClick = (page) => {
    if (page === 'Sell') {
      navigate('/sell');
    }
    if (page === 'Home') {
      navigate('/');
    }
    handleCloseNavMenu();
  };
  return (
    <>
      {/* HAMBURGER MENU VISIBLE ON SMALL SCREEN */}
      <Box
        sx={{
          // flexGrow: 1,
          display: { xs: 'flex', md: 'none' },
          backgroundColor: alpha(theme.palette.common.white, 0.15),
          '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
          },
        }}
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page} onClick={() => handleMenuClick(page)}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => handleMenuClick(page)}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
}
