import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './autCtx';
import { useLocation } from 'react-router-dom';
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
  const initialState = {
    products: null,
    cats: null,
    sub: null,
    allSub: null, //diff sub for diff components to play around
  };

  const [state, setState] = useState(initialState);
  const { token, logout } = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') return;
    axios
      .get(PRODUCTS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const apiProd = res.data;
        setState((prevState) => ({ ...prevState, products: apiProd }));
      })
      .catch((error) => {
        console.log('error ===', error);
        const errAPI = error.response.data.msg;
        enqueueSnackbar(errAPI, { variant: 'warning' });
        logout();
      });
  }, []);

  // fetch categories from API
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') return;
    axios
      .get(CATs_URL)
      .then((res) => {
        const apiCats = res.data;
        setState((prevState) => ({ ...prevState, cats: apiCats }));
      })
      .catch((error) => {
        console.log('error ===', error);
        logout();
      });
  }, []);

  // fetch sub-categories from API
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') return;
    axios
      .get(SUB_Cats_ALL)
      .then((res) => {
        const apiSubC = res.data;
        setState((prevState) => ({ ...prevState, allSub: apiSubC }));
      })
      .catch((err) => {
        console.warn('ERROR: ', err);
      });
  }, []);

  const fetchSubCats = (id) => {
    axios
      .get(`${SUB_CATs_URL}/${id}`)
      .then((res) => {
        const apiSubC = res.data;
        setState((prevState) => ({ ...prevState, sub: apiSubC }));
      })
      .catch((err) => {
        console.warn('ERROR: ', err);
      });
  };

  const ctxValues = { initialState, fetchSubCats };

  return (
    <ProductsContext.Provider value={ctxValues}>{children}</ProductsContext.Provider>
  );
};

export function useProductsContext() {
  return useContext(ProductsContext);
}
