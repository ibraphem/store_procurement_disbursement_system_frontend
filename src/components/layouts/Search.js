import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const Search = ({ keywords, resetFilter, searchWord }) => {
  console.log(searchWord);
  return (
    <div style={{ float: "right", marginBottom: 10 }}>
      <TextField
        size="small"
        variant="outlined"
        value={searchWord}
        placeholder="Search..."
        onChange={keywords}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchWord === "" ? (
                <IconButton disableRipple={true} size="small">
                  <SearchIcon />
                </IconButton>
              ) : (
                <IconButton
                  disableRipple={true}
                  size="small"
                  onClick={resetFilter}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
