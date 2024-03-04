import { StarBorder, StarRate } from '@mui/icons-material';
import { useProductsContext } from '../../../context/productsCtx';
import { useState } from 'react';

export const FavoriteIcon = ({ prodID, userID, fav }) => {
  const favorite = +userID === +fav;
  const [show, setShow] = useState(favorite ? favorite : false);

  const { handleAddFav, handleRemFav } = useProductsContext();
  return (
    <>
      {!show && (
        <StarBorder
          onClick={() => {
            handleAddFav(prodID);
            setShow(true);
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
      {show && (
        <StarRate
          onClick={() => {
            handleRemFav(prodID);
            setShow(false);
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
