import { Grid, Paper, Typography } from '@mui/material';

export const LatestUsers = () => {
  return (
    <Grid item xs={5}>
      <Paper variant="outlined" sx={{ p: 2, borderColor: '#f5f5f5' }}>
        <Typography>Latest Users</Typography>
      </Paper>
    </Grid>
  );
};
