import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    textAlign: "center",
    height: theme.spacing(8),
  },
  button: {
    backgroundColor: "green",
  },
}));

const Filter = ({ getTo, getFrom, filter, reset, to, from }) => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.paper}>
        <form onSubmit={filter}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <TextField
                type="date"
                label="From"
                value={from}
                onChange={getFrom}
                variant="outlined"
                required={true}
                fullWidth
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="To"
                value={to}
                onChange={getTo}
                size="small"
                type="date"
                variant="outlined"
                required={true}
                fullWidth
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                fullWidth
                className={classes.button}
              >
                Filter
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="default"
                size="large"
                fullWidth
                onClick={reset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default Filter;
