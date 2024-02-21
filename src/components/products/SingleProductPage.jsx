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
              width: '65%',
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
                    height: '550px',
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
                        height: '120px',
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
            // elevation={3}
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4,
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '80%',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                mb: 1,
              }}
            >
              <Typography component="h1" variant="h4" sx={{}}>
                Seller Name
              </Typography>
              <Typography component="p" variant="body1" sx={{}}>
                Registered at: 2023-02-21
              </Typography>
              <Typography component="p" variant="body1" sx={{}}>
                Published products: 6
              </Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                my: 1,
                px: 4,
                width: '80%',
                bgcolor: 'secondary.main',
                justifyContent: 'flex-start',
              }}
              startIcon={<Phone />}
            >
              Contact Seller
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                my: 1,
                px: 4,
                width: '80%',
                bgcolor: 'secondary.main',
                justifyContent: 'flex-start',
              }}
              startIcon={<Chat />}
            >
              Start chat online
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                my: 1,
                px: 4,
                width: '80%',
                bgcolor: 'secondary.main',
                justifyContent: 'flex-start',
              }}
              startIcon={<Email />}
            >
              Write email to seller
            </Button>
          </Paper>
        </Box>

        {/* <Box sx={{ flexGrow: 1 }}> */}
        {/* <Grid container spacing={0}>
          <Grid item xs={7} sx={{ border: 1 }}>
            <Typography component="h1" variant="h4" sx={{ marginBottom: 2 }}>
              {productFromAPI.title}
            </Typography>
            <Typography component="p" variant="body1" sx={{ marginBottom: 2 }}>
              {productFromAPI.description}
            </Typography>
          </Grid>
          <Grid item xs={5} sx={{ border: 1, px: 2 }}>
            Price and sellers info
          </Grid>
        </Grid> */}
        {/* </Box> */}

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
