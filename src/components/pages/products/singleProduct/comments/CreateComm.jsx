import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  content: yup
    .string('Please provide more context')
    .min(6)
    .trim()
    .required('Field is required'),
});

export const CreateComm = () => {
  const formik = useFormik({
    initialValues: {
      content: '',
      // user_id: userID,
      // title: '',
      // cat_id: 0,
      // sub_id: 0,
      // description: '',
      // price: '',
      // city: 0,
      // img_urls: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // // create FormData constructor
      // const formData = new FormData();
      // // Append form input values to formData
      // Object.keys(values).forEach((key) => {
      //   if (key !== 'img_urls') {
      //     formData.append(key, values[key]);
      //   }
      // });
      // // Append images as img_urls to formData
      // values.img_urls.forEach((image, index) => {
      //   formData.append('image', image);
      // });

      // axiosNewProduct(formData);
    },
  });

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
              id="title"
              label="Enter comment here"
              name="title"
              multiline
              rows={4}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
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
