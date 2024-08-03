import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Typography, Box, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { openCreateCategory } from '../../../redux/modalSlice';

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
  onChange: (value: Category | null) => void;
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
  value,
}) => {

  let dispatch = useDispatch()
  let addcategory = () => dispatch(openCreateCategory({ open: true, id: null, data: null }))
  return (
    <Autocomplete
      size='small'
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
        onChange(newValue ? newValue : null);
      }}
      renderInput={(params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField {...params} label={label} fullWidth />
          <IconButton onClick={addcategory} sx={{ marginLeft: 1 }}>
          <AddIcon />
        </IconButton>
        </Box >
      )}
value = { value }
  />
  );
};
