import { Delete } from '@mui/icons-material';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import { useAuthContext } from '../../../../context/autCtx';

export const SingleComm = ({ comm }) => {
  const { userID } = useAuthContext();

  if (!comm) return;

  const date = new Date(comm.created).toLocaleString('lt', {
    dateStyle: 'short',
  });

  const allowDelete = +userID === +comm.userID;

  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, width: { md: '54.8%', sx: '100%' }, height: '100%' }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography align="left" component="h1" variant="h5" sx={{ mb: 1 }}>
          {comm.userName}
        </Typography>

        <Box>{date}</Box>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Box>{comm.content}</Box>
        {allowDelete && (
          <IconButton>
            <Delete />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};
