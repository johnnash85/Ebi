import {
  SymbolSummary,
  StrategySummary,
  PL,
  Trade,
  //PlStatus
} from './components';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from "react-redux";
import * as actions from "redux/actions/reportActions";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Report = (props) => {
  const classes = useStyles();
  const [list, setList] = useState(props.dataRoi);

  useEffect(() => {
    props.loadListRoi(props.user_id, props.token);
    props.loadListTrade(props.user_id, props.token);
  }, list);

  return (
    <div className={classes.root}>

      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={6}
          md={12}
          xl={6}
          xs={12}
        >
          <PL roiYear={props.dataRoi} />
          <span style={{ "margin": "5px" }} />
          <SymbolSummary />

        </Grid>

        <Grid
          item
          lg={6}
          md={12}
          xl={6}
          xs={12}
        > <Trade numYear={props.dataTrade} />
          <span style={{ "margin": "5px" }} />
          <StrategySummary />
        </Grid>
      </Grid>
    </div>);

};

//export default Report;  <PlStatus roiYear={props.dataRoi} />

function mapStateToProps(reducer) {
  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    dataRoi: reducer.report.dataRoi,
    dataTrade: reducer.report.dataTrade,
  };
}

const mapDispatchToProps = dispatch => ({
  loadListRoi: (user_id, token) =>
    dispatch(actions.loadListLatesRoi({ user_id, token })),
  loadListTrade: (user_id, token) =>
    dispatch(actions.loadListTrade({ user_id, token })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Report);

/**
 *  lg={12}
          md={8}
          xl={3}
          xs={12}

            <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <StockCategory />
        </Grid>
 */