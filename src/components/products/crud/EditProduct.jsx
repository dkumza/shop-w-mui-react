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
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import SelectCity from '../SelectCity';
import { AddImg } from '../AddImg';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useProductsContext } from '../../../context/productsCtx';
import { useAuthContext } from '../../../context/autCtx';

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

export const EditProduct = ({ open, setOpen }) => {
  const { token, userID } = useAuthContext();
  const { cats, fetchSubCats, sub } = useProductsContext();
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      userID,
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
      <Fade in={open} timeout={1000}>
        <Box sx={style}>
          <Typography component="h1" variant="h4" sx={{ marginBottom: 2, marginTop: 4 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.dark' }}
            >
              Confirm
            </Button>
            <Button
              onClick={handleClose}
              fullWidth
              variant="outlined"
              sx={{ color: 'primary.dark' }}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};
