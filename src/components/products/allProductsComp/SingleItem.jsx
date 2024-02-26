import { Close, StarBorder, StarRate } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
const URL_FOR_IMG = 'http://localhost:3000';

export const SingleItem = ({ product }) => {
  const [mainImg, setMainImg] = useState(null);

  useEffect(() => {
    // wait till images appears (async)
    if (!!product) {
      const parsedImgUrls = JSON.parse(product.img_urls);
      setMainImg(parsedImgUrls[0]);
    }
  }, [product]);

  return (
    <Box sx={{ height: '300px' }}>
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
    </Box>
  );
};
