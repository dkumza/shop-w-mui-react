import {
  Box,
  Button,
  Container,
  FormControl,
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
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

export const Sell = () => {
  const { cats } = useProductsContext();
  const [categories, setCategories] = useState('');

  const formik = useFormik({
    initialValues: {
      title: 'admin@admin.qq',
      password: '123456',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axiosLogin(values);
    },
  });

  const axiosLogin = (loginInfo) => {
    axios
      .post(LOGIN_URL, loginInfo)
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

  const handleChange = (event) => {
    setCategories(event.target.value);
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
          />

          <Box sx={{ width: '100%', display: 'flex' }}>
            <FormControl margin="dense" sx={{ flexGrow: 1 }}>
              <InputLabel id="cats">Select Category</InputLabel>
              <Select
                labelId="cats"
                id="selectCat"
                name="selectCat"
                value={categories}
                label="Select Category"
                onChange={handleChange}
              >
                {cats &&
                  cats.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
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
