import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useProductsContext } from '../../context/productsCtx';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';

const validationSchema = yup.object({
  title: yup.string('Enter product title').required('Title is required'),
  selectCat: yup.number().min(1, 'Category is required').max(3),
  selectSub: yup.number().min(1, 'Subcategory is required'),
});

export const Sell = () => {
  const { cats, fetchSubCats, sub } = useProductsContext();

  const formik = useFormik({
    initialValues: {
      title: '',
      selectCat: 0,
      selectSub: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // axiosLogin(values);
    },
  });

  const axiosSaveProduct = (product) => {
    axios
      .post(LOGIN_URL, product)
      .then((res) => {
        const { token, name } = res.data;
        if (token) {
          console.log(res.data);
          login(token, name);
          formik.resetForm();
          navigate('/');
          enqueueSnackbar(res.data.msg, { variant: 'success' });
        }
      })
      .catch((error) => {
        // console.log(error);
        const valErrorAPI = error.response.data;
        formik.setErrors(valErrorAPI);
        enqueueSnackbar(valErrorAPI.error, { variant: 'error' });
      });
  };

  // if user is selected subcategory and changes category, to prevent MUI warning - reset subCategory to default - 0
  const handleCategoryChange = (event) => {
    formik.setFieldValue('selectSub', 0);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ marginBottom: 2, marginTop: 4 }}>
          Sell Item
        </Typography>
        <form className="f-control" onSubmit={formik.handleSubmit}>
          <TextField
            margin="dense"
            fullWidth
            id="title"
            label="Product Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
            <FormControl margin="dense" sx={{ width: '50%' }}>
              <InputLabel id="cats">Select Category</InputLabel>
              <Select
                labelId="cats"
                id="selectCat"
                name="selectCat"
                label="Select Category"
                value={formik.values.selectCat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.selectCat && Boolean(formik.errors.selectCat)}
              >
                <MenuItem disabled value={0}>
                  Category
                </MenuItem>
                {cats &&
                  cats.map((cat) => (
                    <MenuItem
                      key={cat.id}
                      value={cat.id}
                      onClick={(e) => {
                        fetchSubCats(cat.id);
                        handleCategoryChange(e);
                      }}
                    >
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
              {/* helper for form validation */}
              <FormHelperText error id="selectCats-v-helper">
                {formik.touched.selectCat && formik.errors.selectCat}
              </FormHelperText>
            </FormControl>

            {/* sub category */}
            <FormControl margin="dense" sx={{ width: '50%' }}>
              <InputLabel id="subCat">Select Subcategory</InputLabel>
              <Select
                labelId="subCat"
                id="selectSub"
                name="selectSub"
                label="Select Subcategory"
                value={formik.values.selectSub}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.selectSub && Boolean(formik.errors.selectSub)}
              >
                <MenuItem disabled value={0}>
                  Select Subcategory
                </MenuItem>
                {sub &&
                  sub.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
              </Select>
              {/* helper for form validation */}
              <FormHelperText error id="selectSubs-v-helper">
                {formik.touched.selectSub && formik.errors.selectSub}
              </FormHelperText>
            </FormControl>
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};
