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
import { useProductsContext } from '../../context/productsCtx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { enqueueSnackbar } from 'notistack';
import { AddImg } from './AddImg';
import axios from 'axios';
import SelectCity from './SelectCity';
import { useAuthContext } from '../../context/autCtx';

const PRODUCTS_URL = 'http://localhost:3000/api/products';

const validationSchema = yup.object({
  title: yup.string('Enter product title').trim().required('Title is required'),
  cat_id: yup.number().min(1, 'Category is required').max(3),
  sub_id: yup.number().min(1, 'Subcategory is required'),
  description: yup.string().trim().min(6).max(255).required('Description is required'),
  price: yup.number().required('Price is required'),
  city: yup.number().min(1, 'City is required').required('City is required'),
});

export const Sell = () => {
  const { cats, fetchSubCats, sub } = useProductsContext();
  const { token } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      title: '',
      cat_id: 0,
      sub_id: 0,
      description: '',
      price: '',
      city: 0,
      img_urls: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // create FormData constructor
      const formData = new FormData();
      // Append form input values to formData
      Object.keys(values).forEach((key) => {
        if (key !== 'img_urls') {
          formData.append(key, values[key]);
        }
      });
      // Append images as img_urls to formData
      values.img_urls.forEach((image, index) => {
        formData.append('image', image);
      });

      axiosNewProduct(formData);
    },
  });

  const axiosNewProduct = (data) => {
    axios
      .post(PRODUCTS_URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // if user is selected subcategory and changes category, to prevent MUI warning
  // reset subCategory to default - 0
  const handleCategoryChange = (event) => {
    formik.setFieldValue('sub_id', 0);
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
                id="cat_id"
                name="cat_id"
                label="Select Category"
                value={formik.values.cat_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cat_id && Boolean(formik.errors.cat_id)}
              >
                <MenuItem disabled value={0}>
                  Select Category
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
              <FormHelperText error id="cat_ids-v-helper">
                {formik.touched.cat_id && formik.errors.cat_id}
              </FormHelperText>
            </FormControl>

            {/* sub category */}
            <FormControl margin="dense" sx={{ width: '50%' }}>
              <InputLabel id="subCat">Select Subcategory</InputLabel>
              <Select
                labelId="subCat"
                id="sub_id"
                name="sub_id"
                label="Select Subcategory"
                value={formik.values.sub_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sub_id && Boolean(formik.errors.sub_id)}
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
              <FormHelperText error id="sub_ids-v-helper">
                {formik.touched.sub_id && formik.errors.sub_id}
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
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ width: '40%' }}>
              <TextField
                id="price"
                name="price"
                label="Price €"
                margin="dense"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Box>
            <Box sx={{ width: '70%' }}>
              <SelectCity formik={formik} />
            </Box>
          </Box>

          <AddImg
            setFieldValue={formik.setFieldValue}
            img_urls={formik.values.img_urls}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};
