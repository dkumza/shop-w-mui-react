import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const CATs_URL = 'http://localhost:3000/api/categories';
const SUB_CATs_URL = 'http://localhost:3000/api/sub-categories';
const PRODUCTS_URL = `http://localhost:3000/api/products`;

const ProductsContext = createContext({
  cats: null,
  subCats: null,
  products: null,
});

ProductsContext.displayName = 'ProductsCtx';

export const ProductsContextProvider = ({ children }) => {
  const [cats, setCats] = useState(null);

  // fetch categories from API
  useEffect(() => {
    axios
      .get(CATs_URL)
      .then((res) => {
        setCats(res.data);
      })
      .catch((err) => {
        console.warn('ERROR: ', err);
      });
  }, []);
  console.log(cats);

  const ctxValues = { cats };

  return (
    <ProductsContext.Provider value={ctxValues}>{children}</ProductsContext.Provider>
  );
};

export function useProductsContext() {
  return useContext(ProductsContext);
}
