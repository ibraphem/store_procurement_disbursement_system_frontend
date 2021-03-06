import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const PurchaseSearch = ({
  keyword,
  filter,
  resetFilter,
  searchWord,
  company,
  action,
}) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label={`Items for ${action}`}
        size="small"
        value={searchWord}
        variant="outlined"
        onChange={keyword}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {filter === null ? (
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
    </>
  );
};

export default PurchaseSearch;
