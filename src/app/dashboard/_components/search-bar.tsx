"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import React, { useCallback, useState } from "react";

function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  const handleSearchClick = useCallback(() => {
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  return (
    <TextField
      fullWidth
      id='outlined-basic'
      label='Tìm học sinh'
      placeholder='Nhập MSSV hoặc họ tên'
      variant='outlined'
      size='small'
      onChange={handleSearchChange}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position='start'>
              <IconButton onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default SearchBar;
