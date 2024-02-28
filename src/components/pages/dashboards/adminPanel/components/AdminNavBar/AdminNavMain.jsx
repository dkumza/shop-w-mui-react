import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import React from 'react';
import { items } from './config';

const pages = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export const AdminNavMain = () => {
  return (
    <Drawer sx={{ bgcolor: 'primary.main' }} variant="permanent" open={true}>
      <Box
        sx={{
          width: 270,
          height: '100%',
          bgcolor: 'primary.main',
          color: 'white',
          py: 4,
          px: 0,
        }}
      >
        <List sx={{ p: 0 }}>
          {items.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ padding: 0 }}>
              <ListItemButton>
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
