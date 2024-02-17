import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup.string('Enter username').trim().min(3).required('Username is required'),
  email: yup
    .string('Enter your email')
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup.string().trim().required('Phone is required'),
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
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phone: '',
      password: '',
      cPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
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
            id="username"
            label="Username *"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
            id="phone"
            label="Phone Number *"
            name="phone"
            type="number"
            autoComplete="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
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
            label="Confirm Password * 
"
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {'Already have account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
