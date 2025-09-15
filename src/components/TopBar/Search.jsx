import React, { useState } from "react";
import {
  FormControl,
  InputAdornment,
  TextField,
  IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const TypeSearch = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <FormControl sx={{ width: '100%', maxWidth: 500 }}>
      <TextField
        size="small"
        variant="outlined"
        placeholder="Search anything..."
        value={searchValue}
        onChange={handleChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#e8f2ff',
            borderRadius: '10px',
            border: 'none', 
            '& fieldset': {
              border: 'none', 
            },
            '&:hover fieldset': {
              border: 'none', 
            },
            '&.Mui-focused fieldset': {
              border: 'none', 
            },
            '&.Mui-focused': {
              backgroundColor: '#e8f2ff', 
            },
            height: '30px', 
            fontSize: '12px',
          },
          '& .MuiOutlinedInput-input': {
            padding: '8px 0',
            '&::placeholder': {
              color: '#8b9cb8', 
              opacity: 1,
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon 
                sx={{ 
                  color: '#8b9cb8', 
                  fontSize: '20px',
                  marginLeft: '8px'
                }} 
              />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                sx={{ 
                  color: '#8b9cb8',
                  marginRight: '4px'
                }}
              >
                <ClearIcon sx={{ fontSize: '18px' }} />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </FormControl>
  );
};

export default TypeSearch;
