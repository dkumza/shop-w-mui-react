import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const CITIES_URL = 'http://localhost:3000/api/cities';

export default function SelectCity({ formik }) {
  const [cities, setCities] = useState([]);
  const [open, setOpen] = useState(false);

  const loading = open && cities.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    axios
      .get(CITIES_URL)
      .then((res) => {
        if (active) {
          setCities(res.data);
        }
      })
      .catch((err) => {
        console.warn('ERROR: ', err);
      });

    return () => {
      active = false;
    };
  }, [loading]);

  return (
    <Autocomplete
      id="asyncCities"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      // Checking if the current option is the selected one by comparing their ids
      isOptionEqualToValue={(option, value) => option.id === value.id}
      // Gets the label to be displayed for each option in the dropdown by returning its name
      getOptionLabel={(option) => option.name}
      options={cities}
      loading={loading}
      // if no city selected - return 0 for validation
      onChange={(event, value) => {
        formik.setFieldValue('city', value ? value.id : 0);
      }}
      // renderInput is a prop that takes a function. This function is responsible for rendering the input component.
      // The function receives an object 'params' which contains properties and methods that can be spread onto the input component.
      renderInput={(params) => (
        <TextField
          {...params}
          margin="dense"
          label="Select City"
          id="city"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          InputProps={{
            // Spread the input props from the Autocomplete component - 'value', 'onChange'...
            ...params.InputProps,
            // EndAdornment prop is used to display a component or element at the end of the input.
            endAdornment: (
              <Fragment>
                {/* 
                  If loading - display spinner - to represent data is fetching
                */}
                {loading ? <CircularProgress color="inherit" size={20} /> : null}

                {/* 
                 Shows x and dropdown arrow icon when input field is selected
                */}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}
