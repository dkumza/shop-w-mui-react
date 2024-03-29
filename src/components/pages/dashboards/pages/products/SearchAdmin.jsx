import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import { useState } from 'react';

export function SearchAdmin({ handleSearch, textHolder, array, field }) {
  const [searchVal, setSearchVal] = useState('');
  return (
    <Box
      component="form"
      sx={{
        my: 2,
        '& > :not(style)': { my: 0, width: { xs: '100%', md: '45ch' } },
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
          handleSearch(e.target.value, array, field);
        }}
        id="outlined-basic"
        variant="outlined"
        placeholder={`${textHolder}`}
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
