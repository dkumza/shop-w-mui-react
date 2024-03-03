import { StarBorder, StarRate } from '@mui/icons-material';
import React from 'react';

export const FavoriteIcon = ({ setStar, star, handleFav, prodID }) => {
  return (
    <>
      {!star && (
        <StarBorder
          onClick={() => {
            handleFav(prodID, 'add');
            setStar((prev) => !prev);
          }}
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
          onClick={() => {
            handleFav(prodID, 'rem');
            setStar((prev) => !prev);
          }}
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
