import { Box, Divider, Drawer, List } from '@mui/material';

import { items } from './config';
import { SingleLink } from './SingleLink';
import { Logo } from '../../../../layout/navBar/Logo';

const pages = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export const AdminNavMain = ({ drawerWidth }) => {
  return (
    <Drawer
      sx={{
        display: { xs: 'none', md: 'block' },
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderColor: 'primary.main',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          height: '100%',
          bgcolor: 'primary.main',
          color: 'white',
          py: 4,
        }}
      >
        <Box sx={{ px: 2, mb: 3 }}>
          <Logo linkTo="overview" />
        </Box>
        <Divider />
        <Box sx={{ px: 2 }}>
          <List sx={{ p: 0, mt: 3 }}>
            {items.map((item, index) => (
              <SingleLink key={index} item={item} />
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
