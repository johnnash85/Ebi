import React, { Component, useEffect } from "react";
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@mui/material/MenuItem';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "redux/actions/marketWinLowActions";
import LinearProgressBar from "components/LinearProgressBar";
import Tabs from "components/Tabs";
//import "./Loader.css";
const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: "5px",
    top: "7px",
    position: "relative",
    marginRight: "10px"
  },
  row: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    // paddingInline: "25px",
    //paddingBottom: "10px",

  }
}));

const MarketWinLow = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  useEffect(() => {
    props.loadingWinners({ id: props.user_id, search: props.search }, props.token);
    props.loadingLosers({ id: props.user_id, search: props.search }, props.token);
  }, [props.listWinners]);

  return (
    <Tabs>
      <div label={"Winners"} >
        <Card style={{ "marginTop": "10px", "marginBottom": "10px" }}>
          <CardHeader
            title={<Typography variant="h2" style={{ "fontWeight": "bold" }}>{"Stock Winners"} </Typography>}
          //subheader={props.item.created_at}
          />
          <CardContent>
            {
              props.listWinners.map((item) => (
                <MenuItem key={item.id} value={item.id} className={classes.row} onClick={() => { }}>
                  <div>
                    <img
                      className={classes.avatar}
                      src={item.icon_url}
                    />
                    <Link to={"/stock/" + item.symbol} component={RouterLink} style={{ "fontWeight": "bold" }}>{item.symbol}</Link>
                  </div>

                  <LinearProgressBar
                    style={{ "width": "250px" }}
                    percent={item.porcent}
                    color={"green"}
                    value={item.porcent + "%"}
                  />
                </MenuItem>
              ))
            }
          </CardContent>
        </Card>
      </div>
      <div label={"Losers"} >
        <Card style={{ "marginTop": "10px", "marginBottom": "10px" }}>
          <CardHeader
            title={<Typography variant="h2" style={{ "fontWeight": "bold" }}>{"Stock Losers"} </Typography>}
          //subheader={props.item.created_at}
          />
          <CardContent>
            {
              props.listLosers.map((item) => (
                <MenuItem key={item.id} value={item.id} className={classes.row} onClick={() => { }}>
                  <div>
                    <img
                      className={classes.avatar}
                      src={item.icon_url}
                    />
                    <Link to={"/stock/" + item.symbol} component={RouterLink} style={{ "fontWeight": "bold" }}>{item.symbol}</Link>
                  </div>

                  <LinearProgressBar
                    style={{ "width": "250px" }}
                    percent={Math.abs(item.porcent)}
                    color={"red"}
                    value={item.porcent + "%"}
                  />
                </MenuItem>
              ))
            }
          </CardContent>
        </Card>
      </div>
    </Tabs>

  );
}

function mapStateToProps(reducer) {

  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    listWinners: reducer.marketWinLow.listWinners,
    loadingWinners: reducer.marketWinLow.loadingWinners,
    errorWinners: reducer.marketWinLow.errorWinners,

    loadingLosers: reducer.marketWinLow.loadingLosers,
    listLosers: reducer.marketWinLow.listLosers,
    errorLosers: reducer.marketWinLow.errorLosers,
  };
}
const mapDispatchToProps = dispatch => ({
  loadingWinners: (params, token) =>
    dispatch(actions.loadListWinners({ params, token })),
  loadingLosers: (params, token) =>
    dispatch(actions.loadListLosers({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketWinLow);
/**
 *     <Typography variant="inherit" noWrap>
              {item.porcent}%
            </Typography>
 */