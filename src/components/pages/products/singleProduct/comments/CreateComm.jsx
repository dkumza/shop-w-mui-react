import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuthContext } from '../../../../context/autCtx';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const COMM_URL = 'http://localhost:3000/api/comments';

const validationSchema = yup.object({
  content: yup
    .string('Please provide more context')
    .min(6)
    .trim()
    .required('Field is required'),
});

export const CreateComm = ({ productID, handleComments, handleShowComm }) => {
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
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        width: { md: '44.5%', sx: '100%' },
        position: { xs: 'relative', md: 'absolute' },
        right: 0,
        top: 0,
        mt: { xs: 0, md: 5 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
    </Paper>
  );
};
