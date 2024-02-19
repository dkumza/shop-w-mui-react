import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useProductsContext } from '../../context/productsCtx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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
                  Subcategory
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
          {/* description */}
          <TextField
            id="description"
            name="description"
            label="Description"
            margin="dense"
            multiline
            rows={4}
            // value={formik.values.description}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // error={formik.touched.description && Boolean(formik.errors.description)}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ width: '30%' }}>
              <TextField
                id="price"
                label="Price €"
                margin="dense"
                type="number"
                // value={formik.values.selectSub}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // error={formik.touched.selectSub && Boolean(formik.errors.selectSub)}
              />
            </Box>
            <Box sx={{ width: '70%' }}>
              <TextField
                sx={{ width: '100%' }}
                id="city"
                label="City"
                margin="dense"
                type="number"
                // value={formik.values.selectSub}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // error={formik.touched.selectSub && Boolean(formik.errors.selectSub)}
              />
            </Box>
          </Box>
          <Button
            variant="outlined"
            component="label"
            role={undefined}
            tabIndex={-1}
            sx={{
              mt: 1,
              padding: 1.8,
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              lineHeight: '1', // fix for horizontal align of icon ant text
            }}
            startIcon={<InsertPhotoIcon />}
          >
            Upload image
            <VisuallyHiddenInput type="file" sx={{ position: 'absolute' }} />
          </Button>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};
