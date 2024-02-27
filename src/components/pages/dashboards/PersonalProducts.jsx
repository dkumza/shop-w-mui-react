import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/autCtx';
import {
  Box,
  Container,
  Grid,
  Grow,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { SingleItem } from '../products/allProductsComp/SingleItem';
import { ShortAbout } from '../products/allProductsComp/ShortAbout';

const PRODUCT_URL = 'http://localhost:3000/api/personal';

export const PersonalProducts = () => {
  const [productFromAPI, setProductFromAPI] = useState(null);
  const [spinner, setSpinner] = useState(true);

  const { token, logout } = useAuthContext();
  const { userID } = useParams();
  const navigate = useNavigate();

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

  const linkToProduct = (productID) => {
    navigate(`/product/${productID}`);
  };

  productFromAPI && console.log(productFromAPI);

  return (
    <>
      <Box sx={{ width: '100%', position: 'absolute' }}>
        {spinner && <LinearProgress />}
      </Box>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ marginBottom: 2, pl: 1, width: '100%' }}
        >
          Your Products
        </Typography>
        <Grid sx={{ display: { md: 'flex', xs: 'none' } }} container spacing={2}>
          {productFromAPI &&
            productFromAPI.map((product) => (
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
      </Container>
    </>
  );
};
