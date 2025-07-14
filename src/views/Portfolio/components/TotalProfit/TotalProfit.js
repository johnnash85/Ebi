import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Translate, I18n } from "react-redux-i18n";

const useStyles = makeStyles(theme => ({
  root: {
    height: '90%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  down: {
    color: "#FFFFFF"
  },
  downValue: {
    color: "#FFFFFF",
    marginRight: theme.spacing(1)
  },
  up: {
    color: "#FFFFFF"
  },
  upValue: {
    color: "#FFFFFF",
    marginRight: theme.spacing(1)
  }
}));
/**
 * 
 * theme.palette.error.dark
 * theme.palette.error.dark,
 * theme.palette.success.dark
 * theme.palette.success.dark,
 */
const TotalProfit = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

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
              color="inherit"
              gutterBottom
              variant="body2"
            >
              <Translate value="balance" />
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              {"$ "}{props.balance}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <Typography style={{ "color": "#FFFFFF" }}>
          <Translate value="total_invested" />{" $" + props.capital}
        </Typography>

      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
/**
 *  <div className={classes.difference}>
          {
            1 > 0 ?
              (<React.Fragment>
                <ArrowUpwardIcon className={classes.up} />
                <Typography
                  className={classes.upValue}
                  variant="body2"
                >
                  {"0"}%
                </Typography>
              </React.Fragment>)
              :
              (<React.Fragment>
                <ArrowDownwardIcon className={classes.down} />
                <Typography
                  className={classes.downValue}
                  variant="body2"
                >
                  {"0"}%
                </Typography>
              </React.Fragment>)
          }
        </div>
 */