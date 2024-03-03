import { Box, Button, Typography } from '@mui/material';

import sellImg from '../../../../utils/images/sell-2.jpg';

export const SellImage = () => {
  return (
    <>
      <Box sx={{ position: 'relative', height: 600, mb: 2 }}>
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            borderRadius: 3,
          }}
          src={sellImg}
          alt=""
        />
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'center',

            p: 4,
            top: '25%',
            left: '3%',
            backgroundColor: 'white',
            width: 420,
            height: 330,
          }}
        >
          <Typography variant="h2" sx={{ color: 'black', mb: 2 }}>
            Time to sell your used stuff?
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: '100%',
              // backgroundColor: 'secondary.light',
            }}
          >
            Sell
          </Button>
        </Box>
      </Box>
    </>
  );
};
