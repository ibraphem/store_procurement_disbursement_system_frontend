import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import { URD } from "../layouts/Config";
import Search from "../layouts/Search";
import { Link } from "react-router-dom";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  tableHeadCell: {
    fontWeight: "bolder",
  },
});

const StoreTable = ({ items, company }) => {
  function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [storeItems, setStoreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const prevStoreIitems = usePrevious(storeItems);

  useEffect(async () => {
    console.log(company);
    setIsLoading(true);
    await axios
      .get(`${URD}/${company === "Uniform" ? "stores" : "store"}/${company}`)
      .then((response) => {
        setStoreItems(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [company]);

  //console.log(items);
  // console.log(storeItems);

  const getKeyword = (event) => {
    let keyword = event.target.value.toUpperCase();
    setSearchWord(keyword);
    // console.log(keyword);
    if (keyword !== "") {
      let filter = storeItems.filter((storeItem) => {
        let itemName = storeItem.item?.item_name.toUpperCase();
        console.log(itemName);
        return itemName?.indexOf(event.target.value.toUpperCase()) > -1;
      });
      setStoreItems(filter);
    } else {
      setStoreItems(items);
    }

    //
  };

  //console.log(storeItems);

  const resetFilter = () => {
    setSearchWord("");
    setStoreItems(items);
    //   setStoreItems(items);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, storeItems.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log(storeItems);

  return (
    <>
      {!isLoading ? (
        <>
          <Search
            keywords={getKeyword}
            resetFilter={resetFilter}
            searchWord={searchWord}
          />

          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              aria-label="custom pagination table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                    {company === "Uniform" ? "Uniform" : "Item Name"}
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align="center">
                    QUANTITY
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align="center">
                    UNIT PRICE
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align="center">
                    TOTAL
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align="center">
                    &nbsp;
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? storeItems.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : storeItems
                ).map((storeItem) => (
                  <TableRow
                    key={
                      company === "Uniform"
                        ? storeItem.uniform_id
                        : storeItem.item_id
                    }
                  >
                    <TableCell component="th" scope="row">
                      {company === "Uniform"
                        ? storeItem.uniform?.type
                        : storeItem.item?.item_name}
                    </TableCell>
                    <TableCell align="center">{storeItem.quantity}</TableCell>
                    <TableCell align="center">
                      &#8358;
                      {Number(storeItem.price / storeItem.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      &#8358;{Number(storeItem.price).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        to={
                          company === "Uniform"
                            ? `/${storeItem.uniform?.type}/${company}/${storeItem.uniform_id}/details`
                            : `/${storeItem.item?.item_name}/${company}/${storeItem.item_id}/details`
                        }
                      >
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#006634",
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={storeItems.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default StoreTable;
