import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

export const OverViewAll = ({ data, icon, bg, api }) => {
  return (
    <>
      <Grid item xs={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Paper
          variant="outlined"
          sx={{ height: '180px', p: 3, backgroundColor: 'white', borderColor: '#f5f5f5' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ border: 0 }}>{data}</Typography>
            <Box
              sx={{
                height: '56px',
                width: '56px',
                borderRadius: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: `${bg}`,
              }}
            >
              {icon}
            </Box>
          </Box>
          <Box sx={{}}>
            <Typography variant="h4">{api} </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* small screen */}

      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          pb: { xs: 2, md: 0 },
          width: '100%',
        }}
      >
        <Paper variant="outlined" sx={{ height: '180px', p: 3, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{}}>{data}</Typography>
            <Box
              sx={{
                height: '56px',
                width: '56px',
                borderRadius: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: `${bg}`,
              }}
            >
              {icon}
            </Box>
          </Box>
          <Box sx={{}}>
            <Typography variant="h4">{api} </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
};
