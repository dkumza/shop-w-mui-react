import { StarBorder, StarRate } from '@mui/icons-material';
import { useProductsContext } from '../../../context/productsCtx';
import { useState } from 'react';

export const FavoriteIcon = ({ prodID }) => {
  const [star, setStar] = useState(false);

  const { handleAddFav, handleRemFav } = useProductsContext();
  return (
    <>
      {!star && (
        <StarBorder
          onClick={() => {
            handleAddFav(prodID);
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
            handleRemFav(prodID);
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
