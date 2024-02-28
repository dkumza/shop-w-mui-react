import { StarBorder, StarRate } from '@mui/icons-material';
import React from 'react';

export const FavoriteIcon = ({ addFavorite, star }) => {
  return (
    <>
      {!star && (
        <StarBorder
          onClick={() => addFavorite()}
          fontSize="large"
          className="exit-icon"
          sx={{
            position: 'absolute',
            right: '0',
            top: '0',
            color: 'primary.light',
          }}
        />
      )}
      {star && (
        <StarRate
          onClick={() => addFavorite()}
          fontSize="large"
          className="exit-icon"
          sx={{
            position: 'absolute',
            right: '0',
            top: '0',
            color: 'primary.main',
          }}
        />
      )}
    </>
  );
};
