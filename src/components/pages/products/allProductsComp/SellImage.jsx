import { Box, Button, Typography } from '@mui/material';

import sellImg from '../../../../utils/images/sell-2.jpg';
import { useNavigate } from 'react-router-dom';

export const SellImage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: 600,
          mb: 2,
          boxShadow: 12,
          transform: 'rotate(1deg)',
        }}
      >
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
            transform: 'rotate(-1deg)',
            // alignItems: 'center',

            p: 4,
            top: '25%',
            left: '3%',
            backgroundColor: 'white',
            width: 420,
            height: 330,
          }}
        >
          <Typography variant="h2" sx={{ color: 'black', mb: 2, fontSize: 50 }}>
            Sell your items with a simple click...
          </Typography>
          <Button
            onClick={() => navigate('/sell')}
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
