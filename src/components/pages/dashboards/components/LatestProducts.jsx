import { Divider, Grid, Paper, Typography } from '@mui/material';
import LatestProductsTable from './LatestProductsTable';

export const LatestProducts = () => {
  return (
    <Grid item xs={7}>
      <Paper variant="outlined" sx={{ borderColor: '#f5f5f5' }}>
        <Typography sx={{ p: 2 }}>Latest Products</Typography>
        <LatestProductsTable />
      </Paper>
    </Grid>
  );
};
