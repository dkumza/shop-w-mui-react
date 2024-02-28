import { Delete } from '@mui/icons-material';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import { useAuthContext } from '../../../../context/autCtx';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const COMM_URL = 'http://localhost:3000/api/comments';

export const SingleComm = ({ comm, handleComments }) => {
  const { userID, token } = useAuthContext();

  if (!comm) return;

  const axiosDelComm = (commID) => {
    axios
      .delete(`${COMM_URL}/${commID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { userID },
      })
      .then((res) => {
        handleComments();
        const msgAPI = res.data.msg;
        enqueueSnackbar(msgAPI, { variant: 'success' });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  const date = new Date(comm.created).toLocaleString('lt', {
    dateStyle: 'short',
  });

  const allowDelete = +userID === +comm.userID;

  return (
    <Paper variant="outlined" sx={{ p: 2, width: '100%', height: '100%' }}>
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
          <IconButton onClick={() => axiosDelComm(comm.id)}>
            <Delete />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};
