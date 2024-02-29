import { useAuthContext } from '../../../../context/autCtx';
import { Box, Typography } from '@mui/material';

export const ShowName = () => {
  const { name } = useAuthContext();
  return (
    <>
      <Box sx={{ backgroundColor: 'primary.dark', p: 2, py: 3, borderRadius: 5, my: 2 }}>
        <Typography variant="h6">Working as</Typography>
        <p>{name}</p>
      </Box>
    </>
  );
};
