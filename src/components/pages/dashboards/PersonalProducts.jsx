import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/autCtx';
import { Box, LinearProgress } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

const PRODUCT_URL = 'http://localhost:3000/api/personal';

export const PersonalProducts = () => {
  const [productFromAPI, setProductFromAPI] = useState(null);
  const [spinner, setSpinner] = useState(true);

  const { token, logout } = useAuthContext();
  const { userID } = useParams();

  useEffect(() => {
    const URL_P = `${PRODUCT_URL}/${userID}`;
    axios
      .get(URL_P, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const product = response.data;
        setProductFromAPI(product);
        setSpinner(false);
      })
      .catch((error) => {
        setSpinner(false);
        console.log('error ===', error);
        const errorA = error.response.data.msg;
        enqueueSnackbar(errorA, { variant: 'warning' });
        logout();
      });
  }, [userID]);

  productFromAPI && console.log(productFromAPI);

  return (
    <>
      <Box sx={{ width: '100%', position: 'absolute' }}>
        {spinner && <LinearProgress />}
      </Box>
      <div>PersonalProducts for user {userID}</div>
      <Box></Box>
    </>
  );
};
