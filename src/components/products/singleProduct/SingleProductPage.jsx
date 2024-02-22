import { Chat, Email, Phone } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Gallery } from './Gallery';
import { AboutProduct } from './AboutProduct';

const PRODUCT_URL = 'http://localhost:3000/api/product';

export const SingleProductPage = () => {
  const [productFromAPI, setProductFromAPI] = useState(null);
  const { productID } = useParams();

  useEffect(() => {
    const URL_P = `${PRODUCT_URL}/${productID}`;
    axios
      .get(URL_P)
      .then((response) => {
        const product = response.data;
        console.log(product);
        setProductFromAPI(product);
      })
      .catch((error) => {
        console.log('error ===', error);
      });
  }, [URL, productID]);

  if (productFromAPI === null) return;

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, display: 'flex', flexGrow: 1, gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 4, flexGrow: 1 }}>
          <Gallery imgs={productFromAPI.img_urls} />
          <AboutProduct product={productFromAPI} />
        </Box>

        {/* options for small screen */}
        {/* <Box
          sx={{
            display: { md: 'none', xs: 'flex' },
            flexGrow: 1,
            justifyContent: 'center',
          }}
        >
          <img
            id="main-img"
            src={`${URL_FOR_IMG}/${correctImgUrl[0]}`}
            style={{
              width: 'auto',
              height: '400px',
              objectFit: 'cover',
              display: 'block',
              // borderRadius: 3,
            }}
            alt=""
          />
        </Box> */}
        {/* <Box sx={{ display: 'flex', border: 1, flexGrow: 1 }}>
          <Box>Box 2</Box>
          <Box>Box 3</Box>
        </Box> */}
      </Container>
    </>
  );
};
