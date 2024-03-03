import { Box, Container, Grid, Typography } from '@mui/material';
import { ProductsAllAdmin } from './ProductsAllAdmin';
import { ProductsSearch } from './ProductsSearch';
import { useProductsContext } from '../../../../context/productsCtx';
import { useEffect, useState } from 'react';

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
    if (productsAll) {
      const result = productsAll.filter(
        (p) =>
          p.title.toLowerCase().includes(value.toLowerCase()) ||
          p.description.toLowerCase().includes(value.toLowerCase()),
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
        <ProductsSearch handleSearch={handleSearch} />
        <ProductsAllAdmin
          productsAll={filteredProducts !== null ? filteredProducts : productsAll}
        />
      </Container>
    </Box>
  );
}
