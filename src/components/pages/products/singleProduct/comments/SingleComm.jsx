import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

export const SingleComm = ({ comm }) => {
  if (!comm) return;

  const date = new Date(comm.created).toLocaleString('lt', {
    dateStyle: 'short',
  });

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography align="left" component="h1" variant="h5" sx={{ mb: 1 }}>
          {comm.userName}
        </Typography>

        <Box>{date}</Box>
      </Box>
      <Box>{comm.content}</Box>
    </Paper>
  );
};
