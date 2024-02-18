import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Paper } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const REG_URL = 'http://localhost:3000/api/auth/register';

const validationSchema = yup.object({
  name: yup.string('Enter name').trim().min(3).required('Name is required'),
  email: yup
    .string('Enter your email')
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  telephone: yup.string().trim().required('Telephone is required'),
  password: yup
    .string('Enter your password')
    .trim()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  cPassword: yup
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    })
    .required('Password is required'),
});

export default function SignUp() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      telephone: '',
      password: '',
      cPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      const { cPassword, ...signUpInfo } = values;
      axiosSignUp(signUpInfo);
    },
  });

  const axiosSignUp = (signUpInfo) => {
    axios
      .post(REG_URL, signUpInfo)
      .then((res) => {
        formik.resetForm();
        navigate('/login');
        enqueueSnackbar(res.data.msg, { variant: 'success' });
      })
      .catch((error) => {
        // console.log(error);
        const valErrorAPI = error.response.data;
        formik.setErrors(valErrorAPI);
        enqueueSnackbar(valErrorAPI.error, { variant: 'error' });
      });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
      {/* <Paper elevation={2} variant="elevation" sx={{ padding: 10 }}> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ marginBottom: 3 }}>
          Sign Up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="dense"
            fullWidth
            id="name"
            label="Name *"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="dense"
            fullWidth
            id="email"
            label="Email Address *"
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
            id="telephone"
            label="Telephone Number *"
            name="telephone"
            type="number"
            autoComplete="telephone"
            value={formik.values.telephone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.telephone && Boolean(formik.errors.telephone)}
            helperText={formik.touched.telephone && formik.errors.telephone}
          />
          <TextField
            margin="dense"
            fullWidth
            name="password"
            label="Password *"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            margin="dense"
            fullWidth
            name="cPassword"
            label="Confirm Password *"
            type="password"
            id="cPassword"
            value={formik.values.cPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.cPassword)}
            helperText={formik.touched.cPassword && formik.errors.cPassword}
          />
          <Button
            margin="dense"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                {'Already have account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
      {/* </Paper> */}
    </Container>
  );
}
