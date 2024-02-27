import { Box, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../context/autCtx';
import { SingleComm } from './SingleComm';

const COMM_URL = 'http://localhost:3000/api/comments';

export const Comments = () => {
  const [comments, setComments] = useState(null);
  const { productID } = useParams();
  const { token } = useAuthContext();

  useEffect(() => {
    const URL_P = `${COMM_URL}/${productID}`;
    axios
      .get(URL_P, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const comments = response.data;
        setComments(comments);
        // setSpinner(false);
      })
      .catch((error) => {
        // setSpinner(false);
        console.log('error ===', error);
        // const errorA = error.response.data.msg;
        // enqueueSnackbar(errorA, { variant: 'warning' });
        // logout();
      });
  }, [productID]);

  comments && console.log(comments);

  return (
    <Box sx={{ p: 0 }}>
      <Typography align="left" component="h1" variant="h5" sx={{ mb: 1 }}>
        Comments
      </Typography>
      {comments && comments.map((comm) => <SingleComm key={comm.id} comm={comm} />)}
    </Box>
  );
};
