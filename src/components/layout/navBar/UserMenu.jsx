import styled from '@emotion/styled';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useAuthContext } from '../../context/autCtx';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

let settings;

function UserMenu() {
  const { logout, name, userID } = useAuthContext();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentLoc = location.pathname;
  const activePath = currentLoc.includes('dashboard');

  activePath
    ? (settings = ['Shop', 'Logout'])
    : (settings = ['My Items', 'Favorites', 'Logout']);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (item) => {
    if (item === 'Logout') {
      enqueueSnackbar('See you soon!', { variant: 'success' });
      logout();
    }
    if (item === 'Favorites') {
      navigate(`/favorites/${userID}`);
    }
    if (item === 'My Items') {
      navigate(`/personal/${userID}`);
    }
    if (item === 'Shop') {
      navigate(`/`);
    }
    handleCloseUserMenu();
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar>{name && name.slice(0, 1)}</Avatar>
          </StyledBadge>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box sx={{ width: '168px', pl: 2, py: 1 }}>
          <Typography variant="h6" textAlign="left" fontSize={16}>
            ACCOUNT
          </Typography>
          <Typography textAlign="left" color={'gray'}>
            {name}
          </Typography>
        </Box>
        <Divider />
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default UserMenu;
