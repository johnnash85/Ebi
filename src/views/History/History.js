import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { Table, Toolbar } from "./components";
import { connect } from "react-redux";
import * as actions from "redux/actions/historyActions";
//import list from "./data";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const History = (props) => {
  const classes = useStyles();
  const { className, history, ...rest } = props;
  const [list, setList] = useState(props.list);



  useEffect(() => {
    props.loadList({ id: props.user_id, search: props.search }, props.token);
  }, list);

  return (
    <div className={classes.root}>
      <Toolbar history={history} />
      <div className={classes.content}>
        <Table list={props.list} />
      </div>
    </div>
  );
};

History.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
};

function mapStateToProps(reducer) {
  //console.log(reducer);
  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    list: reducer.history.list,
    error: reducer.history.error,
    loading: reducer.history.loading,

    search: reducer.history.search,
  };
}
const mapDispatchToProps = dispatch => ({
  loadList: (params, token) =>
    dispatch(actions.loadList({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(History);