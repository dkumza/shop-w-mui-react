import { Phone } from '@mui/icons-material';
import { Box, Button, Grow, Paper, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';

export const AboutProduct = ({ product }) => {
  const [phone, setPhone] = useState('Contact Seller');

  let dateDay;
  if (product) {
    dateDay = Math.floor(
      (new Date() - new Date(product.updated)) / (1000 * 60 * 60 * 24),
    );
  }

  const showPhoneNo = () => {
    phone === 'Contact Seller' ? setPhone(product.telephone) : setPhone('Contact Seller');
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
          p: 4,
          width: '45%',
          // flexGrow: 1,
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
              {dateDay === 0 ? 'Updated: Today' : `Updated: ${dateDay} days ago`}
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
              Seller: {product.user_name}
            </Typography>
          </Box>
          <Typography align="left" component="p" variant="body5" sx={{ mt: 1 }}>
            {product.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            align="left"
            component="h1"
            variant="h3"
            sx={{ color: 'primary.dark' }}
          >
            {product.price}€
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              my: 1,
              px: 4,
              width: '220px',
              bgcolor: 'primary.dark',
              justifyContent: 'flex-start',
            }}
            startIcon={<Phone />}
            onClick={showPhoneNo}
          >
            {phone}
          </Button>
        </Box>
      </Paper>
    </Grow>
  );
};
