import { Chat, Email, Phone } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Gallery } from './Gallery';
import { AboutProduct } from './AboutProduct';
import { useAuthContext } from '../../../context/autCtx';
import { enqueueSnackbar } from 'notistack';

const PRODUCT_URL = 'http://localhost:3000/api/product';

export const SingleProductPage = () => {
  const [productFromAPI, setProductFromAPI] = useState(null);
  const { productID } = useParams();
  const { userID, token, logout } = useAuthContext();

  useEffect(() => {
    const URL_P = `${PRODUCT_URL}/${productID}`;
    axios
      .get(URL_P, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const product = response.data;
        console.log(product);
        setProductFromAPI(product);
      })
      .catch((error) => {
        console.log('error ===', error);
        const errorA = error.response.data.msg;
        enqueueSnackbar(errorA, { variant: 'warning' });
        logout();
      });
  }, [productID]);

  if (productFromAPI === null) return;

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          mt: 4,
          display: 'flex',
          flexGrow: 1,
          gap: 2,
          // minHeight: '90vh',
        }}
      >
        <Box
          sx={{
            display: { md: 'flex' },
            flexDirection: { md: 'row', xs: 'column' },
            gap: 1,
            flexGrow: 1,
          }}
        >
          <Box sx={{ width: { md: '55%', xs: '100%' }, mb: { md: 0, xs: 2 } }}>
            <Gallery imgs={productFromAPI.img_urls} />
          </Box>
          <Box sx={{ width: { md: '45%', xs: '100%' } }}>
            <AboutProduct product={productFromAPI} userID={userID} />
          </Box>
        </Box>
      </Container>
    </>
  );
};
