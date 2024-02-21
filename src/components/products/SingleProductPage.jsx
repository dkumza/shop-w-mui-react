import { Box, Container, Grid, ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const PRODUCT_URL = 'http://localhost:3000/api/products';
const URL_FOR_IMG = 'http://localhost:3000';

export const SingleProductPage = () => {
  const [productFromAPI, setProductFromAPI] = useState(null);
  const { productID } = useParams();

  useEffect(() => {
    const URL = `${PRODUCT_URL}/${productID}`;
    axios
      .get(URL)
      .then((response) => {
        const product = response.data;
        console.log(product);
        setProductFromAPI(...product);
        console.log(productFromAPI);
      })
      .catch((error) => {
        console.log('error ===', error);
      });
  }, [URL, productID]);

  if (productFromAPI === null) return;
  const correctImgUrl = JSON.parse(productFromAPI.img_urls);

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, display: 'flex', flexGrow: 1, border: 1 }}>
        <Box
          sx={{
            display: { md: 'flex', xs: 'none' },
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 0,
          }}
        >
          <Box>
            <img
              id="main-img"
              src={`${URL_FOR_IMG}/${correctImgUrl[0]}`}
              style={{
                width: 'auto',
                height: '450px',
                objectFit: 'cover',
                display: 'block',
                // borderRadius: 3,
              }}
              alt=""
            />
          </Box>
          <Grid container spacing={1} sx={{ mt: 0 }}>
            {correctImgUrl &&
              // map from index 1 (2nd img)
              correctImgUrl.slice(1).map((url, index) => (
                <Grid item xs={12 / correctImgUrl.length + 1} key={index + 1}>
                  <img
                    src={`${URL_FOR_IMG}/${url}`}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '145px',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: 3,
                    }}
                  />
                </Grid>
              ))}
          </Grid>
          {/* <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              // border: 1,
              gap: 1,
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <img
                id="main-img"
                src={`${URL_FOR_IMG}/${correctImgUrl[1]}`}
                style={{
                  width: 'auto',
                  height: '145px',
                  objectFit: 'cover',
                  display: 'block',
                  // borderRadius: 3,
                }}
                alt=""
              />
            </Box>
            <Box>
              <img
                id="main-img"
                src={`${URL_FOR_IMG}/${correctImgUrl[2]}`}
                style={{
                  width: 'auto',
                  height: '145px',
                  objectFit: 'cover',
                  display: 'block',
                  // borderRadius: 3,
                }}
                alt=""
              />
            </Box>
            <Box>
              <img
                id="main-img"
                src={`${URL_FOR_IMG}/${correctImgUrl[3]}`}
                style={{
                  width: 'auto',
                  height: '145px',
                  objectFit: 'cover',
                  display: 'block',
                  // borderRadius: 3,
                }}
                alt=""
              />
            </Box>
          </Box> */}
        </Box>

        {/* options for small screen */}
        <Box
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
        </Box>
        {/* <Box sx={{ display: 'flex', border: 1, flexGrow: 1 }}>
          <Box>Box 2</Box>
          <Box>Box 3</Box>
        </Box> */}
      </Container>
    </>
  );
};

{
  /* <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
            {correctImgUrl.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  srcSet={`${URL_FOR_IMG}/${item}?w=164&h=164&fit=crop&auto=format&dpr=2 4x`}
                  src={`${URL_FOR_IMG}/${item}?w=164&h=164&fit=crop&auto=format`}
                  alt={`${item}_${index}`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: 3,
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList> */
}
