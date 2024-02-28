import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

import { items } from './config';
import { SingleLink } from './SingleLink';

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
          px: 2,
          position: 'static',
        }}
      >
        <List sx={{ p: 0 }}>
          {items.map((item, index) => (
            <SingleLink key={index} item={item} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
