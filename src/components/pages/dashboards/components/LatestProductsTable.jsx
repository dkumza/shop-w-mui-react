import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function createData(id, title, custID, date, status) {
  return { id, title, custID, date, status };
}

export default function LatestProductsTable({ api }) {
  const navigate = useNavigate();

  const newRows = api
    .slice(0, 10)
    .map((data) =>
      createData(
        data.id,
        data.title,
        data.user_id,
        new Date(data.updated).toLocaleString('lt-LT'),
        data.isDeleted,
      ),
    );

  const linkToProduct = (productID) => {
    navigate(`/product/${productID}`);
  };

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderColor: '#f5f5f5' }}>
      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newRows.map((row) => (
            <TableRow
              id="prod-id"
              key={row.id}
              onClick={() => linkToProduct(row.id)}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                ':hover': { backgroundColor: '#faf5ff', cursor: 'pointer' },
              }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.custID}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    backgroundColor: row.status === 0 ? '#57b583' : '#dd593f',
                    textAlign: 'center',
                    borderRadius: 1,
                    color: 'white',
                    width: 88,
                    px: 1,
                  }}
                >
                  {row.status === 0 ? 'Active' : 'Deleted'}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
