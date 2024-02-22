import { Edit, Phone } from '@mui/icons-material';
import { Box, Button, Grow, Paper, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { EditProduct } from '../crud/EditProduct';

export const AboutProduct = ({ product, userID }) => {
  const [phone, setPhone] = useState('Contact Seller');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log('open modal?');
  };

  let dateDay;
  if (product) {
    dateDay = Math.floor(
      (new Date() - new Date(product.updated)) / (1000 * 60 * 60 * 24),
    );
  }

  const showPhoneNo = () => {
    phone === 'Contact Seller' ? setPhone(product.telephone) : setPhone('Contact Seller');
  };

  const handleEdit = () => {
    console.log('edit');
  };

  return (
    <Grow in={true} style={{ transformOrigin: '0 0 1' }} timeout={1000}>
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            mb: 1,
          }}
        >
          {open && <EditProduct open={open} setOpen={setOpen} />}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography align="left" component="h1" variant="h4" sx={{}}>
              {product.title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography
              component="p"
              variant="body4"
              sx={{
                border: 1,
                borderRadius: 1,
                borderColor: '#e0e0e0',
                mt: 1,
                py: 0.5,
                px: 1,
              }}
            >
              {dateDay === 0 ? 'Today' : `${dateDay} days ago`}
            </Typography>
            <Typography
              component="p"
              variant="body4"
              sx={{
                border: 1,
                borderRadius: 1,
                borderColor: '#e0e0e0',
                mt: 1,
                py: 0.5,
                px: 1,
              }}
            >
              {product.user_name}
            </Typography>
            <Typography
              component="p"
              variant="body4"
              sx={{
                border: 1,
                borderRadius: 1,
                borderColor: '#e0e0e0',
                mt: 1,
                py: 0.5,
                px: 1,
              }}
            >
              {product.city_name}
            </Typography>
          </Box>
          <Typography align="left" component="p" variant="body5" sx={{ mt: 1 }}>
            {product.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: { md: 'flex' },
            gap: 2,
            justifyContent: { md: 'space-between', xs: 'center' },
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            align="center"
            component="h1"
            variant="h3"
            sx={{ color: 'primary.dark' }}
          >
            {product.price}€
          </Typography>
          {userID && !product.user_id && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                my: 1,
                width: { xs: '100%', md: '200px' },
                bgcolor: 'primary.dark',
              }}
              startIcon={<Phone />}
              onClick={showPhoneNo}
            >
              {phone}
            </Button>
          )}
          {userID && product.user_id && (
            <Button
              // type="submit"
              fullWidth
              variant="outlined"
              size="large"
              sx={{
                my: 1,
                width: { xs: '100%', md: '200px' },
                color: 'primary.main',
              }}
              startIcon={<Edit />}
              onClick={handleOpen}
            >
              Edit
            </Button>
          )}
        </Box>
      </Paper>
    </Grow>
  );
};
