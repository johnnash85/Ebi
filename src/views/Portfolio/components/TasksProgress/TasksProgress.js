import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import LinearProgressBar from "../../../../components/LinearProgressBar";
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const TasksProgress = props => {
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
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              <Translate value="position_month" />
            </Typography>
            <Typography variant="h3">{props.position.stock + props.position.option}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <Typography>
          {"Stock = " + props.position.stock} {" "}
          {"Option = " + props.position.option}
        </Typography>
        <Typography>{"PDT = " + props.pdt.count} {" "}
          {"Day = " + props.pdt.day}</Typography>
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
/**
 *  <LinearProgressBar
          percent={Math.abs(props.roi)}
          color={props.roi >= 0 ? "green" : "red"}
          style={{ paddingTop: "30px" }}
        />
 */