import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { enqueueSnackbar } from 'notistack';
import { CallMerge } from '@mui/icons-material';
import { useEffect } from 'react';

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

const URL_FOR_IMG = 'http://localhost:3000';

export const AddImg = ({ setFieldValue, img_urls, prevImages, setPrevImages }) => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [imgFromAPI, setImgFromAPI] = useState([]);

  // console.log(img_urls);

  useEffect(() => {
    // wait till images appears (async)
    if (img_urls.length !== 0 && prevImages) {
      setPrevImages(true);
      const parsedImgUrls = JSON.parse(img_urls);
      setImgFromAPI(parsedImgUrls);
    }
  }, [img_urls]);

  console.log('img_urls: ', img_urls);

  const handleImageChange = (e) => {
    const allFiles = Array.from(e.target.files);
    // check if files meets image types - jpg, png, etc...
    const files = allFiles.filter((file) => file.type.startsWith('image/'));

    // if there is not images attached show toaster
    if (allFiles.length !== files.length) {
      enqueueSnackbar('Only image files are allowed', { variant: 'error' });
      return;
    }

    if (files.length === 0) {
      setFieldValue('img_urls', []);
      setPreviewUrls([]);
      return;
    }

    // limit file upload to 4 items
    if (files.length > 4) {
      enqueueSnackbar('Maximum 4 img_urls allowed', { variant: 'error' });
      return;
    }

    // append uploaded files to formik 'img_urls' field
    setFieldValue('img_urls', files);

    const urls = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(urls).then((values) => setPreviewUrls(values));
  };

  return (
    <>
      {/* img preview grid */}
      <Grid container spacing={1} sx={{ mt: 0 }}>
        {previewUrls.length !== 0 &&
          previewUrls.map((url, index) => (
            // show children's of main grid dynamically by previewUrls.length
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

        {/* <Grid container spacing={1} sx={{ mt: 0 }}> */}
        {prevImages &&
          imgFromAPI.map((url, index) => (
            // show children's of main grid dynamically by previewUrls.length
            <Grid item xs={12 / imgFromAPI.length} key={index}>
              <img
                src={img_urls ? `${URL_FOR_IMG}/${url}` : url}
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
        {/* </Grid> */}
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
        {prevImages ? 'Change images' : 'Add up to 4 images'}
        <VisuallyHiddenInput
          type="file"
          multiple={4}
          onChange={(e) => {
            handleImageChange(e);
            setPrevImages(false);
          }}
          sx={{ position: 'absolute' }}
        />
      </Button>
    </>
  );
};
