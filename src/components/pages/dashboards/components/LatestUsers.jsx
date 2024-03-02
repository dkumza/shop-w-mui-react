import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import LatestUsersList from './LatestUsersList';

export const LatestUsers = ({ api }) => {
  return (
    <Grid item xs={5}>
      <Paper variant="outlined" sx={{ borderColor: '#f5f5f5' }}>
        <Typography sx={{ p: 2 }}>Latest 10 Users</Typography>
        <LatestUsersList api={api} />
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
