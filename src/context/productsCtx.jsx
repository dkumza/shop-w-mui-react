import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './autCtx';
import { enqueueSnackbar } from 'notistack';

const CATs_URL = 'http://localhost:3000/api/categories';
const SUB_CATs_URL = 'http://localhost:3000/api/sub-category';
const SUB_Cats_ALL = 'http://localhost:3000/api/sub-categories';
const PRODUCTS_URL = `http://localhost:3000/api/products`;

const ProductsContext = createContext({
  cats: null,
  subCats: null,
  products: null,
});

ProductsContext.displayName = 'ProductsCtx';

export const ProductsContextProvider = ({ children }) => {
  const [cats, setCats] = useState(null);
  const [sub, setSub] = useState(null);
  const [allSub, setAllSub] = useState(null);
  const { token, logout } = useAuthContext();

  // fetch categories from API
  useEffect(() => {
    axios
      .get(CATs_URL)
      .then((res) => {
        setCats(res.data);
      })
      .catch((error) => {
        console.log('error ===', error);
        // const errorA = error.response.data.msg;
        // enqueueSnackbar(errorA, { variant: 'warning' });
        logout();
      });
  }, []);

  // fetch sub-categories from API
  useEffect(() => {
    axios
      .get(SUB_Cats_ALL)
      .then((res) => {
        setAllSub(res.data);
      })
      .catch((err) => {
        console.warn('ERROR: ', err);
      });
  }, []);

  const fetchSubCats = (id) => {
    axios
      .get(`${SUB_CATs_URL}/${id}`)
      .then((res) => {
        setSub(res.data);
      })
      .catch((err) => {
        console.warn('ERROR: ', err);
      });
  };

  const ctxValues = { cats, fetchSubCats, sub, allSub };

  return (
    <ProductsContext.Provider value={ctxValues}>{children}</ProductsContext.Provider>
  );
};

export function useProductsContext() {
  return useContext(ProductsContext);
}
