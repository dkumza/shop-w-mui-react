import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import React from 'react';

export const SingleLink = ({ item }) => {
  const location = useLocation();

  const currentLoc = location.pathname;
  const activePath = currentLoc.includes(item.path);

  return (
    <ListItem
      disablePadding
      sx={{
        backgroundColor: activePath ? 'primary.dark' : '',
        borderRadius: 1,
      }}
      component={RouterLink}
      to={item.path}
    >
      <ListItemButton sx={{ whiteSpace: 'nowrap' }}>
        <ListItemIcon sx={{ p: 0, color: activePath ? 'white' : '' }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText disableTypography sx={{ color: 'white' }} primary={item.title} />
      </ListItemButton>
    </ListItem>
  );
};
