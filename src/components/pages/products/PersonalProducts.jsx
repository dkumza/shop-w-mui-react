import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/autCtx';
import {
  Box,
  Button,
  Container,
  Grid,
  Grow,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { SingleItem } from './allProductsComp/SingleItem';
import { ShortAbout } from './allProductsComp/ShortAbout';

const PRODUCT_URL = 'http://localhost:3000/api/personal';

export const PersonalProducts = () => {
  const [productFromAPI, setProductFromAPI] = useState(null);
  const [spinner, setSpinner] = useState(true);

  const { token, userID: uID, logout } = useAuthContext();
  const { userID } = useParams();
  const navigate = useNavigate();

  const smallAuth = +uID === +userID;

  // if user ID do not match with owner - return back
  useEffect(() => {
    if (!smallAuth) navigate(-1);
  }, []);

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

  return (
    <>
      <Box sx={{ width: '100%', position: 'absolute' }}>
        {spinner && <LinearProgress />}
      </Box>
      {smallAuth && (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ marginBottom: 2, pl: 1, width: '100%' }}
          >
            {productFromAPI && productFromAPI.length > 0 ? 'My Items' : 'No Items'}
          </Typography>
          {productFromAPI && productFromAPI.length === 0 && (
            <Button
              sx={{
                marginBottom: 2,
                pl: 1,
                ':hover': { cursor: 'pointer' },
              }}
              onClick={() => navigate('/')}
            >
              Browse for products
            </Button>
          )}
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
          {/* small screen */}
          <Box sx={{ display: { md: 'none', xs: 'flex' }, flexDirection: 'column' }}>
            {productFromAPI &&
              productFromAPI.map((product) => (
                // <Grow key={product.id} in={true} timeout={2000}>
                <Box
                  id="prod-wrap"
                  onClick={() => linkToProduct(product.id)}
                  key={product.id}
                >
                  <Paper
                    variant="outlined"
                    sx={{ mb: 2, height: 'auto', position: 'relative' }}
                  >
                    <SingleItem product={product} />
                    <ShortAbout product={product} />
                  </Paper>
                </Box>
                // </Grow>
              ))}
          </Box>
        </Container>
      )}
    </>
  );
};
