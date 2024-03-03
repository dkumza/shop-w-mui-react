import { Box, Container, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { useProductsContext } from '../../../../context/productsCtx';

const StyledDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#fafafa',
  },
  width: '100%',
});

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'title', headerName: 'Product title', width: 180 },
  { field: 'cat_id', headerName: 'Category', width: 120 },
  {
    field: 'sub_id',
    headerName: 'Subcategory',
    width: 120,
  },
  {
    field: 'price',
    headerName: 'Price EUR',
    width: 120,
  },
  {
    field: 'updated',
    headerName: 'Updated',
    width: 220,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            textAlign: 'center',
            borderRadius: 1,
            width: 88,
            px: 1,
          }}
        >
          {new Date(params.value).toLocaleString('lt-LT')}
        </Box>
      );
    },
  },
  {
    field: 'isDeleted',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            bgcolor: params.value === 0 ? '#57b583' : '#dd593f',
            textAlign: 'center',
            borderRadius: 1,
            color: 'white',
            width: 88,
            px: 1,
          }}
        >
          {params.value === 0 ? 'Active' : 'Deleted'}
        </Box>
      );
    },
  },
];

export default function Products({ drawerWidth }) {
  const { adminProducts } = useProductsContext();

  if (!adminProducts) return;

  const { products } = adminProducts;

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
        <Grid
          container
          sx={{
            height: '100%',
            width: '100%',
            mt: 1,
            backgroundColor: 'white',
            textAlign: 'left',
          }}
        >
          <StyledDataGrid
            rows={products}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Grid>
      </Container>
    </Box>
  );
}
