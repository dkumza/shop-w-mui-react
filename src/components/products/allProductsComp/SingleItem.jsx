import { Close, StarBorder, StarRate } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
const URL_FOR_IMG = 'http://localhost:3000';

export const SingleItem = ({ product }) => {
  const [mainImg, setMainImg] = useState(null);
  const [star, setStar] = useState(false);

  useEffect(() => {
    // wait till images appears (async)
    if (!!product) {
      const parsedImgUrls = JSON.parse(product.img_urls);
      setMainImg(parsedImgUrls[0]);
    }
  }, [product]);

  const addFavorite = () => {
    console.log('favorited');
    setStar((prev) => !prev);
  };

  return (
    <Box sx={{ height: '300px' }}>
      {!star && (
        <StarBorder
          onClick={addFavorite}
          fontSize="large"
          className="exit-icon"
          sx={{
            position: 'absolute',
            right: '2%',
            top: '2%',
            color: 'primary.light',
          }}
        />
      )}
      {star && (
        <StarRate
          onClick={addFavorite}
          fontSize="large"
          className="exit-icon"
          sx={{
            position: 'absolute',
            right: '2%',
            top: '2%',
            color: 'primary.main',
          }}
        />
      )}
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
