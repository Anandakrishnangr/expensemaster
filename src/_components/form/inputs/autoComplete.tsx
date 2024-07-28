import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Typography, Box } from '@mui/material';

// Define the interface for your data
interface Category {
  id: number;
  Name: string;
  Description: string;
}

interface CustomAutocompleteProps {
  options: Category[];
  label: string;
  descriptionLength: number;
  onChange: (value: any | null) => void;
  value: Category | null;
}

const TruncateText: React.FC<{ text: string; length: number }> = ({ text, length }) => {
  if (text.length <= length) return <>{text}</>;
  return <>{`${text.substring(0, length)}...`}</>;
};

export const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  options,
  label,
  descriptionLength,
  onChange,
  value
}) => {
  console.log({ value, options });
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => `${option?.Name ?? ''}`}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Typography variant="body1">{option.Name}</Typography>
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            (<TruncateText text={option?.Description} length={descriptionLength} />)
          </Typography>
        </Box>
      )}
      onChange={(event, newValue) => {
        onChange(newValue ? newValue: null);
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      value={value}
    />
  );
};