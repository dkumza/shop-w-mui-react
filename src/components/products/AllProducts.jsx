import React, { useEffect } from 'react';
import { Box, Container, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../context/autCtx';
import { SingleItem } from './allProductsComp/SingleItem';
import { ShortAbout } from './allProductsComp/ShortAbout';

const PRODUCT_URL = 'http://localhost:3000/api/products';

export const AllProducts = () => {
  const { token } = useAuthContext();
  const [spinner, setSpinner] = useState(true);
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    axios
      .get(PRODUCT_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAllProducts(res.data);
        setSpinner(false);
      })
      .catch((error) => {
        console.log('error ===', error);
        setSpinner(false);
      });
  }, []);

  return (
    <>
      <Box sx={{ width: '100%', position: 'absolute' }}>
        {spinner && <LinearProgress />}
      </Box>

      <Container sx={{ mt: 4 }} maxWidth="lg">
        <Grid sx={{ display: { md: 'grid', xs: 'none' } }} container spacing={2}>
          {allProducts &&
            allProducts.map((product) => (
              <Grid item key={product.id} xs={3} sx={{}}>
                <Paper variant="outlined" sx={{ p: 0, height: 'auto' }}>
                  <SingleItem product={product} />
                  <ShortAbout product={product} />
                </Paper>
              </Grid>
            ))}
        </Grid>

        {/* small screen */}
        <Box sx={{ display: { md: 'none', xs: 'block' } }}>
          {allProducts &&
            allProducts.map((product) => (
              <Box key={product.id} sx={{ mb: 2 }}>
                <Paper variant="outlined" sx={{ p: 0, height: 'auto' }}>
                  <SingleItem product={product} />
                  <ShortAbout product={product} />
                </Paper>
              </Box>
            ))}
        </Box>
      </Container>
    </>
  );
};
