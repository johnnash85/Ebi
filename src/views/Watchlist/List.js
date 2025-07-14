import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { Table, Toolbar } from "./components";
import { connect } from "react-redux";
import * as actions_stock from "redux/actions/watchStockActions";
import * as actions_list from "redux/actions/watchListActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const List = (props) => {

  const classes = useStyles();
  const { className, history, ...rest } = props;
  const [list, setList] = useState(props.list);

  useEffect(() => {
    props.loadListWatchList(props.user_id, props.token);
    props.loadListStock({ id: props.user_id }, props.token);
  }, list);

  return (
    <div className={classes.root}>
      <Toolbar />
      <div className={classes.content}>
        <Table />
      </div>
    </div>
  );
};

List.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
};

function mapStateToProps(reducer) {
  //console.log(reducer);
  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    list: reducer.watchStock.list,
    error: reducer.watchStock.error,
    loading: reducer.watchStock.loading,
  };
}
const mapDispatchToProps = dispatch => ({
  loadListStock: (params, token) =>
    dispatch(actions_stock.loadList({ params, token })),
  loadListWatchList: (user_id, token) =>
    dispatch(actions_list.loadList({ user_id, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);