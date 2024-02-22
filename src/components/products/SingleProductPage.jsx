import { Chat, Email, Phone } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const PRODUCT_URL = 'http://localhost:3000/api/product';
const URL_FOR_IMG = 'http://localhost:3000';

export const SingleProductPage = () => {
  const [productFromAPI, setProductFromAPI] = useState(null);
  const [imgFromAPI, setImgFromAPI] = useState([]);
  const [mainImg, setMainImg] = useState(null);
  const [phone, setPhone] = useState('Contact Seller');
  const { productID } = useParams();

  useEffect(() => {
    const URL = `${PRODUCT_URL}/${productID}`;
    axios
      .get(URL)
      .then((response) => {
        const product = response.data;
        console.log(product);
        setProductFromAPI(product);
      })
      .catch((error) => {
        console.log('error ===', error);
      });
  }, [URL, productID]);

  useEffect(() => {
    // wait till productsFromAPI appears (async)
    if (productFromAPI) {
      const parsedImgUrls = JSON.parse(productFromAPI.img_urls);
      setImgFromAPI(parsedImgUrls);
      setMainImg(parsedImgUrls[0]);
    }
  }, [productFromAPI]);

  const handleImgSwitch = (url) => {
    console.log('switch');
    setMainImg(url);
  };

  if (productFromAPI === null) return;

  let dateDay;
  if (productFromAPI) {
    dateDay = Math.floor(
      (new Date() - new Date(productFromAPI.updated)) / (1000 * 60 * 60 * 24),
    );
  }

  const showPhoneNo = () => {
    phone === 'Contact Seller'
      ? setPhone(productFromAPI.telephone)
      : setPhone('Contact Seller');
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, display: 'flex', flexGrow: 1, gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 4, flexGrow: 1 }}>
          <Paper
            // elevation={3}
            variant="outlined"
            sx={{
              display: { md: 'flex', xs: 'none' },
              flexDirection: 'column',
              justifyContent: 'center',
              width: '55%',
              p: 4,
            }}
          >
            <Box>
              {mainImg && (
                <img
                  id="main-img"
                  src={`${URL_FOR_IMG}/${mainImg}`}
                  style={{
                    width: '100%',
                    height: '450px',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: 3,
                  }}
                  alt=""
                />
              )}
            </Box>
            <Grid container spacing={1} sx={{ mt: 0 }}>
              {imgFromAPI &&
                imgFromAPI.map((url, index) => (
                  <Grid item xs={12 / imgFromAPI.length} key={index}>
                    <img
                      className="img-gallery"
                      src={`${URL_FOR_IMG}/${url}`}
                      alt={`Preview ${index}`}
                      onClick={() => handleImgSwitch(url)}
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'cover',
                        display: 'block',
                        borderRadius: 3,
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 4,
              width: '45%',
              // flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography align="left" component="h1" variant="h4" sx={{}}>
                  {productFromAPI.title}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography
                  component="p"
                  variant="body4"
                  sx={{
                    border: 1,
                    borderRadius: 1,
                    borderColor: '#e0e0e0',
                    mt: 1,
                    py: 0.5,
                    px: 1,
                  }}
                >
                  {dateDay === 0 ? 'Updated: Today' : `Updated: ${dateDay} days ago`}
                </Typography>
                <Typography
                  component="p"
                  variant="body4"
                  sx={{
                    border: 1,
                    borderRadius: 1,
                    borderColor: '#e0e0e0',
                    mt: 1,
                    py: 0.5,
                    px: 1,
                  }}
                >
                  Seller: {productFromAPI.user_name}
                </Typography>
              </Box>
              <Typography align="left" component="p" variant="body5" sx={{ mt: 1 }}>
                {productFromAPI.description}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography
                align="left"
                component="h1"
                variant="h3"
                sx={{ color: 'primary.dark' }}
              >
                {productFromAPI.price}€
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  my: 1,
                  px: 4,
                  width: '220px',
                  bgcolor: 'primary.dark',
                  justifyContent: 'flex-start',
                }}
                startIcon={<Phone />}
                onClick={showPhoneNo}
              >
                {phone}
              </Button>
            </Box>
          </Paper>
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
