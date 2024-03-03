import { Box, Container, Grid, LinearProgress } from '@mui/material';
import { OverViewAll } from './overComp/OverViewAll';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { LatestUsers } from '../../components/LatestUsers';
import { LatestProducts } from '../../components/LatestProducts';
import { OverViewValueAll } from './overComp/OverViewValueAll';
import { useProductsContext } from '../../../../context/productsCtx';

export const OverView = ({ drawerWidth, custData, spinner }) => {
  const { adminProducts } = useProductsContext();

  return (
    <Box
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
        ml: { md: `${drawerWidth}px` },
        pt: { md: 14, xs: 12 },
        backgroundColor: '#fafafa',
        height: '100vh',
      }}
    >
      <Box sx={{ width: '100%', position: 'absolute' }}>
        {spinner && <LinearProgress />}
      </Box>
      {adminProducts && custData && (
        <Container maxWidth="xl">
          <Grid
            container
            spacing={{ xs: 0, md: 2 }}
            sx={{ flexDirection: { xs: 'column', md: 'row' } }}
          >
            <OverViewAll
              data={'Total Customers'}
              icon={<PermIdentityIcon sx={{ color: 'white' }} />}
              bg={'#dd583f'}
              api={custData.usersLength}
            />
            <OverViewAll
              data={'Total Products'}
              icon={<ShoppingCartCheckoutIcon sx={{ color: 'white' }} />}
              bg={'#57b584'}
              api={adminProducts.totalProducts}
            />
            <OverViewValueAll
              data={'All Products Value'}
              icon={<AttachMoneyIcon sx={{ color: 'white' }} />}
              bg={'#e8972c'}
              api={adminProducts.productsValue}
            />
            <OverViewAll
              data={'Avg. Products Value'}
              icon={<MonetizationOnIcon sx={{ color: 'white' }} />}
              bg={'#6467ec'}
              api={`${adminProducts.avgPrice} €`}
            />
          </Grid>
          <Grid container sx={{ mt: 2, display: { md: 'flex', xs: 'none' } }} spacing={2}>
            <LatestUsers api={custData.users} />
            <LatestProducts api={adminProducts.products} />
          </Grid>

          {/* small screen */}
          <Box
            sx={{
              mt: 2,
              display: { md: 'none', xs: 'flex' },
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <LatestUsers api={custData.users} />
            <LatestProducts api={adminProducts.products} />
          </Box>
        </Container>
      )}
    </Box>
  );
};
