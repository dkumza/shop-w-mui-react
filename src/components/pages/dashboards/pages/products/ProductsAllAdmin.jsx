import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { Box, Grid } from '@mui/material';

const StyledDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#f8f9fa',
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

export const ProductsAllAdmin = ({ productsAll }) => {
  // const { adminProducts } = useProductsContext();

  if (!productsAll) return;

  return (
    <Grid
      container
      sx={{
        height: '100%',
        width: '100%',
        mt: 4,
        backgroundColor: 'white',
        textAlign: 'left',
      }}
    >
      {productsAll.length > 0 ? (
        <StyledDataGrid
          rows={productsAll}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      ) : (
        <Box sx={{ p: 2 }}>No products available</Box>
      )}
    </Grid>
  );
};
