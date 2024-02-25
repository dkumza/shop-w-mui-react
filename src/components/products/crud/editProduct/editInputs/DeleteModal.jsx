import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState, Fragment } from 'react';
import { Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const DeleteModal = ({ deleteModal, handleShowChildModal }) => {
  return (
    <Fragment>
      <Modal
        open={deleteModal}
        onClose={handleShowChildModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: '380px', borderRadius: 1 }}>
          <Close
            className="exit-icon"
            onClick={handleShowChildModal}
            sx={{ position: 'absolute', right: '7%' }}
          />
          <Typography component="h1" variant="h4" sx={{ marginBottom: 1, width: 'auto' }}>
            Delete
          </Typography>
          <p id="child-modal-description">Are you sure to delete?</p>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            {/* <Button variant="contained" onClick={handleShowChildModal} sx={{ mt: 1 }}>
              Sold
            </Button> */}
            <Button variant="text" onClick={handleShowChildModal} sx={{ mt: 1 }}>
              Yes, delete
            </Button>
            <Button variant="text" onClick={handleShowChildModal} sx={{ mt: 1 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
};
