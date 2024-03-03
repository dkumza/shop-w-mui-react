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
  { field: 'name', headerName: 'Username', width: 220 },

  {
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'telephone',
    headerName: 'Phone No',
    width: 220,
  },
  {
    field: 'created_at',
    headerName: 'Created',
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
];

export const CustomersAllAdmin = ({ users }) => {
  if (!users) return;

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
      {users.length > 0 ? (
        <StyledDataGrid
          rows={users}
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
