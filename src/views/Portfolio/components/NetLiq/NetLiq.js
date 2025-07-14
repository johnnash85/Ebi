import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyIcon from '@material-ui/icons/Money';
import { Translate, I18n } from "react-redux-i18n";

const useStyles = makeStyles(theme => ({
  root: {
    height: '90%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(0),
    display: 'flex',
    alignItems: 'center'
  },
  down: {
    color: theme.palette.error.dark
  },
  downValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  },
  up: {
    color: theme.palette.success.dark
  },
  upValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

const NetLiq = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const currency = "USD";

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              <Translate value="netliq" />
            </Typography>
            <div style={{ "display": "flex" }}>
              <Typography variant="h3" >${(parseFloat(props.net) + parseFloat(props.balance)).toFixed(2)} </Typography><small style={{ "padding": "8px" }}>{currency}</small>
            </div>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>

        <Typography>
          <Translate value="current_invested" />{" $" + props.net}
        </Typography>
        <div className={classes.difference}>
          {
            props.plp > 0 ?
              (<React.Fragment>
                <ArrowUpwardIcon className={classes.up} />
                <Typography
                  className={classes.upValue}
                  variant="body2"
                >
                  {props.plp}%
                </Typography>
              </React.Fragment>)
              :
              (<React.Fragment>
                <ArrowDownwardIcon className={classes.down} />
                <Typography
                  className={classes.downValue}
                  variant="body2"
                >
                  {props.plp}%
                </Typography>
              </React.Fragment>)
          }
        </div>
      </CardContent>
    </Card >
  );
};

NetLiq.propTypes = {
  className: PropTypes.string
};

export default NetLiq;

/**
 * <MoneyIcon className={classes.icon} />
 * //ArrowDownwardIcon
//  
 *  <Typography
            className={classes.caption}
            variant="caption"
          >
            <Translate value="x_month" />
          </Typography>
 */