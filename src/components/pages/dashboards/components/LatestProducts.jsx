import { Box, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import LatestProductsTable from './LatestProductsTable';
import { ArrowForward } from '@mui/icons-material';

export const LatestProducts = ({ api }) => {
  return (
    <Grid item xs={7}>
      <Paper variant="outlined" sx={{ borderColor: '#f5f5f5', mb: 4 }}>
        <Typography sx={{ p: 2 }}>Latest 10 Products</Typography>
        <LatestProductsTable api={api} />
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
          <IconButton
            sx={{
              py: 0.5,
              px: 2,
              m: 1,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="overline" align="right" sx={{ p: 0, pr: 1 }}>
              View All
            </Typography>
            <ArrowForward fontSize="small" />
          </IconButton>
        </Box>
      </Paper>
    </Grid>
  );
};
