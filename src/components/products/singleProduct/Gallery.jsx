import { Box, Grid, Grow, Paper } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const URL_FOR_IMG = 'http://localhost:3000';

export const Gallery = ({ imgs }) => {
  const [imgFromAPI, setImgFromAPI] = useState([]);
  const [mainImg, setMainImg] = useState(null);

  useEffect(() => {
    // wait till images appears (async)
    if (imgs) {
      const parsedImgUrls = JSON.parse(imgs);
      setImgFromAPI(parsedImgUrls);
      setMainImg(parsedImgUrls[0]);
    }
  }, [imgs]);

  const handleImgSwitch = (url) => {
    console.log('switch');
    setMainImg(url);
  };
  return (
    <Grow in={true} style={{ transformOrigin: '0 0 1' }} timeout={1000}>
      <Paper
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
    </Grow>
  );
};