import { Box, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../context/autCtx';
import { SingleComm } from './SingleComm';
import { CreateComm } from './CreateComm';

const COMM_URL = 'http://localhost:3000/api/comments';

export const Comments = () => {
  const [comments, setComments] = useState(null);
  const [createComm, setCreateComm] = useState(false);

  const { productID } = useParams();
  const { token } = useAuthContext();

  const URL_P = `${COMM_URL}/${productID}`;

  const handleComments = () => {
    axios
      .get(URL_P, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const comments = response.data;
        setComments(comments);
      })
      .catch((error) => {
        console.log('error ===', error);
      });
  };

  useEffect(() => {
    handleComments();
  }, [productID]);

  const handleShowComm = () => {
    setCreateComm((prev) => !prev);
  };

  return (
    <Box
      sx={{
        p: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography align="left" component="h1" variant="h5" sx={{ mb: 1 }}>
          Comments ({comments ? comments.length : 0})
        </Typography>
        <Button onClick={handleShowComm}>Comment</Button>
      </Box>
      <Box
        sx={{
          justifyContent: 'center',
          display: 'flex',
          flex: 1,
          gap: 1,
          flexDirection: { xs: 'column-reverse', md: 'row' },
        }}
      >
        <Box
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 1,
          }}
        >
          {comments &&
            comments.map((comm) => (
              <SingleComm key={comm.id} comm={comm} handleComments={handleComments} />
            ))}
        </Box>
        {
          <CreateComm
            createComm={createComm}
            handleComments={handleComments}
            productID={productID}
            handleShowComm={handleShowComm}
          />
        }
      </Box>
    </Box>
  );
};
