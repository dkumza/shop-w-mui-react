import React, { useEffect } from 'react';
import { Box, Container, Fade, Grid, Grow, LinearProgress, Paper } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { SingleItem } from './allProductsComp/SingleItem';
import { ShortAbout } from './allProductsComp/ShortAbout';
import { StarBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/autCtx';
import { enqueueSnackbar } from 'notistack';

const PRODUCT_URL = 'http://localhost:3000/api/products';

export const AllProducts = () => {
  const { token, logout } = useAuthContext();
  const [spinner, setSpinner] = useState(true);
  const [allProducts, setAllProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(PRODUCT_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllProducts(res.data);
        setSpinner(false);
      })
      .catch((error) => {
        console.log('error ===', error);
        setSpinner(false);
        const errAPI = error.response.data.msg;
        enqueueSnackbar(errAPI, { variant: 'warning' });
        logout();
      });
  }, []);

  const linkToProduct = (productID) => {
    navigate(`/product/${productID}`);
  };

  return (
    <>
      <Box sx={{ width: '100%', position: 'absolute' }}>
        {spinner && <LinearProgress />}
      </Box>

      <Container sx={{ mt: 4 }} maxWidth="lg">
        <Grid sx={{ display: { md: 'flex', xs: 'none' } }} container spacing={2}>
          {allProducts &&
            allProducts.map((product) => (
              <Grow key={product.id} in={true} timeout={2000}>
                <Grid
                  id="prod-wrap"
                  onClick={() => linkToProduct(product.id)}
                  item
                  xs={3}
                  sx={{}}
                >
                  <Paper
                    variant="outlined"
                    sx={{ p: 0, height: 'auto', position: 'relative' }}
                  >
                    <SingleItem product={product} />
                    <ShortAbout product={product} />
                  </Paper>
                </Grid>
              </Grow>
            ))}
        </Grid>

        {/* small screen */}
        <Box sx={{ display: { md: 'none', xs: 'block' } }}>
          {allProducts &&
            allProducts.map((product) => (
              <Box key={product.id} sx={{ mb: 2 }}>
                <Paper
                  onClick={() => linkToProduct(product.id)}
                  variant="outlined"
                  sx={{ p: 0, height: 'auto', position: 'relative' }}
                >
                  <StarBorder
                    fontSize="large"
                    className="exit-icon"
                    sx={{
                      position: 'absolute',
                      right: '2%',
                      top: '2%',
                      color: 'primary.light',
                    }}
                  />
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
