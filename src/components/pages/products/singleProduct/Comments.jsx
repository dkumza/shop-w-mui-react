import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const COMM_URL = 'http://localhost:3000/api/comments';

export const Comments = () => {
  const { productID } = useParams();

  useEffect(() => {
    const URL_P = `${COMM_URL}/${productID}`;
    console.log(URL_P);
    // axios
    //   .get(URL_P, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     const product = response.data;
    //     setProductFromAPI(product);
    //     setSpinner(false);
    //   })
    //   .catch((error) => {
    //     setSpinner(false);
    //     console.log('error ===', error);
    //     const errorA = error.response.data.msg;
    //     enqueueSnackbar(errorA, { variant: 'warning' });
    //     // logout();
    //   });
  }, [productID]);
  return <Box sx={{ p: 2 }}></Box>;
};
