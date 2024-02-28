import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 12,
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 1,
};

export const DelCommModal = ({ delComm, handleShowDellModal, axiosDelComm, commID }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={delComm}
      onClose={handleShowDellModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={delComm}>
        <Box sx={style}>
          <Typography align="left" component="h1" variant="h5" sx={{ mb: 1 }}>
            Confirm to delete comment
          </Typography>
          <Box sx={{ display: 'flex', width: 'auto', justifyContent: 'space-between' }}>
            <Button
              variant="text"
              onClick={() => {
                handleShowDellModal();
                axiosDelComm(commID);
              }}
              sx={{ mt: 1, p: 0 }}
            >
              Confirm
            </Button>
            <Button variant="text" onClick={handleShowDellModal} sx={{ mt: 1, p: 0 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
