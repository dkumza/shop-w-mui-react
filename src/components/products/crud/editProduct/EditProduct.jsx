import {
  Box,
  Button,
  Fade,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import SelectCity from '../../SelectCity';
import { AddImg } from '../../AddImg';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useProductsContext } from '../../../../context/productsCtx';
import { useAuthContext } from '../../../../context/autCtx';
import { Close } from '@mui/icons-material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const PRODUCTS_URL = 'http://localhost:3000/api/product';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 10,
  p: 4,
};

const validationSchema = yup.object({
  title: yup.string('Enter product title').trim().required('Title is required'),
  cat_id: yup.number().min(1, 'Category is required').max(3),
  sub_id: yup.number().min(1, 'Subcategory is required'),
  description: yup.string().trim().min(6).max(255).required('Description is required'),
  price: yup.number().required('Price is required'),
  city: yup.number().min(1, 'City is required').required('City is required'),
});

export const EditProduct = ({ open, setOpen, product, prevImages, setPrevImages }) => {
  const [path, setPath] = useState(null);
  const { token, userID, logout } = useAuthContext();
  const { cats, sub, fetchSubCats } = useProductsContext();

  const handleClose = () => {
    setOpen(false);
  };

  // fetch sub-categories
  useEffect(() => {
    fetchSubCats(product.cat_id);
  }, []);

  useEffect(() => {
    console.log('product: ', product);
    console.log('product.img_urls.length: ', product.img_urls.length);
    // wait till images appears (async)
    if (product.img_urls.length > 2) {
      const parsedImgUrls = JSON.parse(product.img_urls);
      // console.log('parsedImgUrls: ', parsedImgUrls[0]);
      const fullPath = parsedImgUrls[0];
      const parts = fullPath.split('/');
      setPath(parts.slice(0, 3).join('/') + '/');
      console.log(parts.slice(0, 3).join('/') + '/');
      formik.setFieldValue('img_old_url', path);
    }
  }, [product.img_urls, path]);

  // useEffect(() => {
  //   formik.setFieldValue('img_old_url', path);
  // }, [path]);
  // console.log(typeof path);

  const formik = useFormik({
    initialValues: {
      user_id: product.user_id,
      title: product.title,
      cat_id: product.cat_id,
      sub_id: product.sub_id,
      description: product.description,
      price: product.price,
      city: product.city,
      img_urls: product.img_urls,
      img_old_url: path,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      console.log('prevImages: ', prevImages);

      // if user changes images on edit, we need use FormData to send images to API
      if (!prevImages) {
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
        axiosUpdateProduct(formData);
      }
      prevImages && axiosUpdateProduct(values);
    },
  });

  // send updated product data to API
  const axiosUpdateProduct = (data) => {
    axios
      .put(`${PRODUCTS_URL}/${product.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('res.data: ', res.data);
        handleClose();
        formik.resetForm();
        // setInitialValues(null);
        // navigate(`/product/${id}`);
      })
      .catch((error) => {
        console.warn('axiosLogin:', error);
        // if (error.response.data.msg === 'Unauthorized') {
        //   enqueueSnackbar(error.response.data.msg, { variant: 'warning' });
        //   logout();
        //   navigate('/login');
        // }
        // const errorFromAPI = error.response.data;
        // formik.setErrors(errorFromAPI);
      });
  };

  const handleCategoryChange = (event) => {
    formik.setFieldValue('sub_id', 0);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open} timeout={500}>
        <Box sx={style}>
          <Close
            className="exit-icon"
            onClick={handleClose}
            sx={{ position: 'absolute', right: '7%' }}
          />
          <Typography
            component="h1"
            variant="h4"
            sx={{ marginBottom: 2, pl: 1, width: '100%' }}
          >
            Edit Item
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
              {sub && (
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
              )}
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
                <SelectCity formik={formik} show={product} />
              </Box>
            </Box>

            <AddImg
              setPrevImages={setPrevImages}
              prevImages={prevImages}
              setFieldValue={formik.setFieldValue}
              img_urls={formik.values.img_urls}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Publish
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};
