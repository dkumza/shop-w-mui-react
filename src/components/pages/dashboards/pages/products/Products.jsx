import { Box, Container, Typography } from '@mui/material';
import { ProductsAllAdmin } from './ProductsAllAdmin';
import { useProductsContext } from '../../../../context/productsCtx';
import { useEffect, useState } from 'react';
import { SearchAdmin } from './SearchAdmin';

export default function Products({ drawerWidth, handleSearch, filteredRes }) {
  const { adminProducts } = useProductsContext();
  const [productsAll, setProductsAll] = useState(null);

  useEffect(() => {
    if (!adminProducts) return;
    const { products } = adminProducts;
    setProductsAll(products);
  }, [adminProducts]);

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
        <SearchAdmin
          handleSearch={handleSearch}
          array={productsAll}
          textHolder="Search Products"
          field={['title', 'description']}
        />
        <ProductsAllAdmin
          productsAll={filteredRes !== null ? filteredRes : productsAll}
        />
      </Container>
    </Box>
  );
}
