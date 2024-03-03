import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import { useState } from 'react';

export function ProductsSearch({ handleSearch }) {
  const [searchVal, setSearchVal] = useState('');
  return (
    <Box
      component="form"
      sx={{
        my: 2,
        '& > :not(style)': { my: 0, width: '50ch' },
        width: '100%',
        bgcolor: 'white',
        p: 2,
        borderRadius: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={searchVal}
        onChange={(e) => {
          setSearchVal(e.target.value);
          handleSearch(e.target.value);
        }}
        id="outlined-basic"
        variant="outlined"
        placeholder="Search Products"
        sx={{ p: 0, m: 0 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
