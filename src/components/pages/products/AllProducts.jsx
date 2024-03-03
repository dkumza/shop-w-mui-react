import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Grow,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { SingleItem } from './allProductsComp/SingleItem';
import { ShortAbout } from './allProductsComp/ShortAbout';
import { StarBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useProductsContext } from '../../context/productsCtx';
import { SellImage } from './allProductsComp/SellImage';

const PRODUCT_URL = 'http://localhost:3000/api/products';

export const AllProducts = () => {
  const { products } = useProductsContext();
  const [spinner, setSpinner] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (products) setSpinner(false);
  }, [products]);

  const linkToProduct = (productID) => {
    navigate(`/product/${productID}`);
  };

  return (
    <>
      <Box sx={{ width: '100%', position: 'absolute' }}>
        {spinner && <LinearProgress />}
      </Box>

      <Container sx={{ mt: 4 }} maxWidth="lg">
        <SellImage />
        <Typography variant="h5" sx={{ my: 2 }}>
          Recent Products
        </Typography>
        <Grid sx={{ display: { md: 'flex', xs: 'none' } }} container spacing={2}>
          {products &&
            products.map((product) => (
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
          {products &&
            products.map((product) => (
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
