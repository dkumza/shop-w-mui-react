import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Fragment } from 'react';
import { Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useAuthContext } from '../../../../../context/autCtx';

const DEL_URL = 'http://localhost:3000/api/product';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '380px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 3,
};

export const DeleteModal = ({
  deleteModal,
  handleShowChildModal,
  productID,
  productUserID,
  handleClose,
  fetchProductData,
  isDeleted,
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
          isDeleted: isDeleted === 1 ? 0 : 1,
        },
      })
      .then((res) => {
        handleClose();
        fetchProductData(productID);
        enqueueSnackbar(res.data.msg, { variant: 'success' });
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
        <Box sx={{ ...style }}>
          <Close
            className="exit-icon"
            onClick={handleShowChildModal}
            sx={{ position: 'absolute', right: '5%', top: '12%' }}
          />
          <Typography component="h1" variant="h5" sx={{ marginBottom: 1, width: 'auto' }}>
            Warning!
          </Typography>
          <p id="child-modal-description">
            {!isDeleted ? 'Are you sure to delete?' : 'Show product again'}
          </p>
          <Box sx={{ display: 'flex', width: 'auto', justifyContent: 'space-between' }}>
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
