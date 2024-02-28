import { Box, Button, Fade, Modal, TextField, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuthContext } from '../../../../context/autCtx';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { Close } from '@mui/icons-material';

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

const COMM_URL = 'http://localhost:3000/api/comments';

const validationSchema = yup.object({
  content: yup
    .string('Please provide more context')
    .min(6)
    .trim()
    .required('Field is required'),
});

export const CreateComm = ({ productID, handleComments, handleShowComm, createComm }) => {
  const { token, userID } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      content: '',
      userID,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axiosNewComm(values);
    },
  });

  const axiosNewComm = (data) => {
    axios
      .post(`${COMM_URL}/${productID}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        handleComments();
        handleShowComm();
        formik.resetForm();
        const msgAPI = res.data.msg;
        enqueueSnackbar(msgAPI, { variant: 'success' });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={createComm}
      onClose={() => {
        handleShowComm();
        formik.resetForm();
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={createComm}>
        <Box sx={style}>
          <Close
            className="exit-icon"
            onClick={() => {
              handleShowComm();
              formik.resetForm();
            }}
            sx={{ position: 'absolute', right: '4%', top: '5%' }}
          />
          <Typography align="left" component="h1" variant="h5" sx={{ mb: 1 }}>
            Create new comment
          </Typography>
          <Box sx={{ width: '100%' }}>
            <form className="f-control" onSubmit={formik.handleSubmit}>
              <TextField
                margin="dense"
                fullWidth
                id="content"
                label="Enter comment here"
                name="content"
                multiline
                rows={4}
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
              />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
                Publish
              </Button>
            </form>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
