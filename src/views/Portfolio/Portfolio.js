import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
  NetLiq,
  Pl,
  TasksProgress,
  TotalProfit,
  StockOrders,
  OptionOrders,
  Trade
} from './components';

import Tabs from "components/Tabs";
import { connect } from "react-redux";
import * as actions from "redux/actions/dashboardActions";


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();

  const [list, setList] = useState(props.list);

  useEffect(() => {
    props.loadListIndicator(props.user_id, props.token);
  }, props.data);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <NetLiq net={props.data.net} plp={props.data.plp} balance={props.data.balance} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Pl pl={props.data.pl} roi={props.data.roi} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress position={props.data.position || {}} pdt={props.data.pdt || {}} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit balance={props.data.balance} capital={props.data.capital} />
        </Grid>
        <Tabs>

          <div label={"Option"} className="col-12">
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <OptionOrders />
            </Grid>
          </div>
          <div label={"Stock"} className="col-12">
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <StockOrders />
            </Grid>
          </div>
          <div label={"Trade"} className="col-12">
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <Trade />
            </Grid>
          </div>
        </Tabs>
      </Grid>
    </div>
  );
};

function mapStateToProps(reducer) {
  // console.log(reducer);
  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    data: reducer.dashboard.data,
  };
}

const mapDispatchToProps = dispatch => ({
  loadListIndicator: (user_id, token) =>
    dispatch(actions.loadListIndicator({ user_id, token })),

});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);