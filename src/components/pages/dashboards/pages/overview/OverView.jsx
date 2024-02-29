import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { OverViewAll } from './overComp/OverViewAll';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export const OverView = ({ drawerWidth }) => {
  return (
    <Box
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
        ml: { md: `${drawerWidth}px` },
        mt: 10,
        p: 0,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 0, md: 2 }}
          sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        >
          <OverViewAll
            data={'Customers'}
            icon={<PermIdentityIcon sx={{ color: 'white' }} />}
            bg={'#dd583f'}
          />
          <OverViewAll
            data={'Products'}
            icon={<ShoppingCartCheckoutIcon sx={{ color: 'white' }} />}
            bg={'#57b584'}
          />
          <OverViewAll
            data={'All Products Value'}
            icon={<AttachMoneyIcon sx={{ color: 'white' }} />}
            bg={'#e8972c'}
          />
          <OverViewAll
            data={'Avg. Products Value'}
            icon={<MonetizationOnIcon sx={{ color: 'white' }} />}
            bg={'#6467ec'}
          />
        </Grid>
      </Container>
    </Box>
  );
};
