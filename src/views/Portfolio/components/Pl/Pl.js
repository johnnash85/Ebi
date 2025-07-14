import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { Translate, I18n } from "react-redux-i18n";
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

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
    backgroundColor: theme.palette.success.main,
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
  differenceIcon: {
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
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

const TotalUsers = props => {
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
              <Translate value="pl_month" />
            </Typography>
            <div style={{ "display": "flex" }}>
              <Typography variant="h3">${props.pl}</Typography><small style={{ "padding": "8px" }}>{currency}</small>
            </div>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          {
            props.roi > 0 ?
              (<React.Fragment>
                <ArrowUpwardIcon className={classes.up} />
                <Typography
                  className={classes.upValue}
                  variant="body2"
                >
                  {props.roi}%
                </Typography>
              </React.Fragment>)
              :
              (<React.Fragment>
                <ArrowDownwardIcon className={classes.down} />
                <Typography
                  className={classes.downValue}
                  variant="body2"
                >
                  {props.roi}%
                </Typography>
              </React.Fragment>)
          }

          <Typography
            className={classes.caption}
            variant="caption"
          >
            <Translate value="x_month" />
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalUsers.propTypes = {
  className: PropTypes.string
};

export default TotalUsers;
