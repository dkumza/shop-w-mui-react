import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

function createData(id, title, catID, custID, date, status) {
  return { id, title, catID, custID, date, status };
}

export default function LatestProductsTable({ api }) {
  console.log('api: ', api);

  const newRows = api
    .slice(0, 10)
    .map((row) =>
      createData(
        row.id,
        row.title,
        row.cat_id,
        row.user_id,
        new Date(row.updated).toLocaleString('lt-LT'),
        row.isDeleted,
      ),
    );

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderColor: '#f5f5f5' }}>
      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#fafafa' }}>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            {/* <TableCell>Category</TableCell> */}
            <TableCell>Customer ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newRows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              {/* <TableCell>{row.catID}</TableCell> */}
              <TableCell>{row.custID}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    backgroundColor: row.status === 0 ? '#57b583' : '#dd593f',
                    textAlign: 'center',
                    borderRadius: 1,
                    color: 'white',
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
