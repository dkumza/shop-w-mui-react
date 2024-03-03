import { Box, Container, Grid, Typography } from '@mui/material';
import { ProductsAllAdmin } from './ProductsAllAdmin';
import { useProductsContext } from '../../../../context/productsCtx';
import { useEffect, useState } from 'react';
import { SearchAdmin } from './SearchAdmin';

export default function Products({ drawerWidth }) {
  const { adminProducts } = useProductsContext();
  const [productsAll, setProductsAll] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    if (!adminProducts) return;
    const { products } = adminProducts;
    setProductsAll(products);
  }, [adminProducts]);

  const handleSearch = (value) => {
    console.log(value);
    if (productsAll) {
      // search by each word separated by space
      const searchWords = value.toLowerCase().split(' ');

      const result = productsAll.filter((p) =>
        searchWords.every(
          (word) =>
            p.title.toLowerCase().includes(word) ||
            p.description.toLowerCase().includes(word),
        ),
      );

      setFilteredProducts(result);
    }
  };

  return (
    <Box
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
        ml: { md: `${drawerWidth}px` },
        p: 1,
        pt: 14,

        backgroundColor: '#fafafa',
        height: '100vh',
      }}
    >
      <Container maxWidth="lg">
        <Typography component="h1" variant="h4">
          Products
        </Typography>
        <SearchAdmin handleSearch={handleSearch} textHolder="Search Products" />
        <ProductsAllAdmin
          productsAll={filteredProducts !== null ? filteredProducts : productsAll}
        />
      </Container>
    </Box>
  );
}
