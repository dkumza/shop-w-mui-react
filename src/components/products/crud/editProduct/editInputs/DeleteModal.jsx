import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState, Fragment } from 'react';
import { Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import axios from 'axios';
import { useAuthContext } from '../../../../../context/autCtx';

const DEL_URL = 'http://localhost:3000/api/product';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
};

export const DeleteModal = ({
  deleteModal,
  handleShowChildModal,
  productID,
  productUserID,
}) => {
  const { token } = useAuthContext();

  const handleDeleteProduct = () => {
    const url = `${DEL_URL}/${productID}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // send productUserID to API
        data: {
          productUserID,
        },
      })
      .then((res) => {
        console.log('res: ', res.data);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };
  return (
    <Fragment>
      <Modal
        open={deleteModal}
        onClose={handleShowChildModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: '320px', borderRadius: 1 }}>
          <Close
            className="exit-icon"
            onClick={handleShowChildModal}
            sx={{ position: 'absolute', right: '5%', top: '12%' }}
          />
          <Typography component="h1" variant="h5" sx={{ marginBottom: 1, width: 'auto' }}>
            Warning!
          </Typography>
          <p id="child-modal-description">Are you sure to delete?</p>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            {/* <Button variant="contained" onClick={handleShowChildModal} sx={{ mt: 1 }}>
              Sold
            </Button> */}
            <Button
              variant="text"
              onClick={() => {
                handleShowChildModal();
                handleDeleteProduct(productID);
              }}
              sx={{ mt: 1, p: 0 }}
            >
              Confirm
            </Button>
            <Button variant="text" onClick={handleShowChildModal} sx={{ mt: 1, p: 0 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
};
