import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const AddImg = ({ setFieldValue, images, previewUrls }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      setFieldValue('images', []);
      return;
    }

    if (files.length > 4) {
      enqueueSnackbar('Maximum 4 images allowed', { variant: 'error' });
      return;
    }

    setFieldValue('images', files);

    const urls = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(urls).then((values) => setFieldValue('previewUrls', values));
  };

  return (
    <>
      <Grid container spacing={1} sx={{ mt: 0 }}>
        {previewUrls &&
          previewUrls.map((url, index) => (
            // show children's of main grid dynamically by previewUrls length
            <Grid item xs={12 / previewUrls.length} key={index}>
              <img
                src={url}
                alt={`Preview ${index}`}
                style={{
                  width: '100%',
                  height: '60px',
                  objectFit: 'cover',
                  display: 'block',
                  borderRadius: 3,
                }}
              />
            </Grid>
          ))}
      </Grid>
      <Button
        variant="outlined"
        component="label"
        role={undefined}
        tabIndex={-1}
        sx={{
          mt: 1,
          padding: 1.8,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          lineHeight: '1',
        }}
        startIcon={<InsertPhotoIcon />}
      >
        Add up to 4 images
        <VisuallyHiddenInput
          type="file"
          multiple={4}
          onChange={handleImageChange}
          sx={{ position: 'absolute' }}
        />
      </Button>
    </>
  );
};
