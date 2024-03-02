import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuthContext } from '../../context/autCtx';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { LinearProgress, Paper } from '@mui/material';
import { useState } from 'react';

const LOGIN_URL = 'http://localhost:3000/api/auth/login';

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

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      email: 'admin@admin.qq',
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
        const { token, name, userID } = res.data;
        if (token) {
          login(token, name, userID);
          formik.resetForm();
          navigate('/');
          enqueueSnackbar(res.data.msg, { variant: 'success' });
        }
      })
      .catch((error) => {
        // console.log(error);
        const valErrorAPI = error.response.data;
        formik.setErrors(valErrorAPI);
        enqueueSnackbar(valErrorAPI.msg, { variant: 'error' });
      });
  };

  return (
    <Box>
      <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            align="left"
            component="h1"
            variant="h4"
            sx={{ marginBottom: 2, pl: 1, width: '100%' }}
          >
            Sign In
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="dense"
              fullWidth
              id="email"
              label={'Email Address'}
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              margin="dense"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              onClick={login}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
}
