import { Close } from '@mui/icons-material';
import {
  Box,
  Container,
  Grow,
  LinearProgress,
  Modal,
  Paper,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Gallery } from './Gallery';
import { AboutProduct } from './AboutProduct';
import { enqueueSnackbar } from 'notistack';
import { useAuthContext } from '../../../context/autCtx';
import { Comments } from './comments/Comments';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '380px',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const PRODUCT_URL = 'http://localhost:3000/api/product';

export const SingleProductPage = () => {
  const [productFromAPI, setProductFromAPI] = useState(null);
  const { productID } = useParams();
  const { userID, token, logout } = useAuthContext();
  const [open, setOpen] = useState(true);
  const [spinner, setSpinner] = useState(true);

  const handleStatusModal = () => setOpen((prev) => !prev);

  useEffect(() => {
    const URL_P = `${PRODUCT_URL}/${productID}`;
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
  }, [productID]);

  if (productFromAPI === null) return;
  const deleted = !!productFromAPI.isDeleted;

  return (
    <>
      <Box sx={{ width: '100%', position: 'absolute' }}>
        {spinner && <LinearProgress />}
      </Box>
      <Container
        maxWidth="xl"
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: { md: 'flex' },
            flexDirection: { md: 'row', xs: 'column' },
            gap: 1,
            flexGrow: 1,
          }}
        >
          {deleted && (
            <Modal
              open={open}
              onClose={handleStatusModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Close
                  className="exit-icon"
                  onClick={handleStatusModal}
                  sx={{ position: 'absolute', right: '5%', top: '12%' }}
                />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Warning!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                  This product has been already sold or deleted by user
                </Typography>
              </Box>
            </Modal>
          )}
          <Box sx={{ width: { md: '55%', xs: '100%' }, mb: { md: 0, xs: 2 } }}>
            <Gallery imgs={productFromAPI.img_urls} />
          </Box>
          <Box sx={{ width: { md: '45%', xs: '100%' } }}>
            <AboutProduct
              setProductFromAPI={setProductFromAPI}
              product={productFromAPI}
              userID={userID}
              deleted={deleted}
            />
          </Box>
        </Box>
        {!deleted && (
          <Grow in={true} style={{ transformOrigin: '0 0 1' }} timeout={2000}>
            <Paper
              variant="outlined"
              sx={{
                width: { md: '100%', xs: '100%' },
                // border: 1,
                justifyContent: 'center',
                display: 'flex',
                flexGrow: 1,
                p: 2,
              }}
            >
              <Comments />
            </Paper>
          </Grow>
        )}
      </Container>
    </>
  );
};
