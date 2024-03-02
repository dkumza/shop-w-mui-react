import { Close, StarBorder, StarRate } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';

const URL_FOR_IMG = 'http://localhost:3000';

export const SingleItem = ({ product }) => {
  const [mainImg, setMainImg] = useState(null);
  const match = useMatch('/personal/:id');

  useEffect(() => {
    // wait till images appears (async)
    if (!!product) {
      const parsedImgUrls = JSON.parse(product.img_urls);
      setMainImg(parsedImgUrls[0]);
    }
  }, [product]);

  return (
    <Box sx={{ height: '300px' }}>
      {match && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            bgcolor: product.isDeleted ? '#f43f5e' : 'primary.light',
            color: 'white',
            top: 0,
            left: 0,
            py: 0.3,
          }}
        >
          {product.isDeleted ? 'Deleted' : 'Published'}
        </Box>
      )}

      {mainImg && (
        <img
          src={`${URL_FOR_IMG}/${mainImg}`}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            borderRadius: 3,
          }}
        />
      )}
      {!mainImg && (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" color="gray">
            No Image
          </Typography>
        </Box>
      )}
    </Box>
  );
};
