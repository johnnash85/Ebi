import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  LinearProgress
} from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from "react-redux";
import * as actions from "redux/actions/reportActions";
import LinearProgressBar from "components/LinearProgressBar";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    //height: '100%'
  },
  content: {
    padding: 0
  },
  actions: {
    justifyContent: 'flex-end'
  },
}));

function pl(items) {
  var pl = 0;
  items.map(item => {
    pl = pl + (item.pl);
  });
  return pl.toFixed(2);
}

const stylesLocal = {
  subcell: {
    padding: "5px"
  },
  cell: {
    padding: "8px"
  }
};

const StrategySummary = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const theme = useTheme();

  const [list, setList] = useState(props.list);

  useEffect(() => {
    props.loadList(props.user_id, props.token);
  }, list);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        // subtitle={`${products.length} in total`}
        title={"STRATEGY "}
      />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Srategy</TableCell>
              <TableCell>Tr#</TableCell>
              <TableCell align='right'>P/l</TableCell>
              <TableCell colSpan={2}>Graphic</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.list.map((item, i) => (
              <TableRow
                divider={i < props.list.length - 1}
                key={item.id}
              >
                <TableCell style={stylesLocal.cell}>
                  {item.name}
                </TableCell>
                <TableCell style={stylesLocal.cell}>
                  {item.counter}
                </TableCell>
                <TableCell align='right' style={stylesLocal.cell}>
                  ${(item.pl).toFixed(2)}
                </TableCell>
                <TableCell colSpan={2} style={stylesLocal.cell}>
                  <LinearProgressBar
                    percent={(item.countpos / item.counter) * 100}
                    color={"green"}
                    value={((item.countpos / item.counter) * 100).toFixed(2) + "%"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card >
  );
};

StrategySummary.propTypes = {
  className: PropTypes.string
};


function mapStateToProps(reducer) {
  //console.log(reducer);
  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    list: reducer.report.listStrategy,
    error: reducer.report.errorStrategy,
    loading: reducer.report.loadingStrategy,
  };
}
const mapDispatchToProps = dispatch => ({
  loadList: (user_id, token) =>
    dispatch(actions.loadListStrategy({ user_id, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(StrategySummary);
/**
 * item.pl >= 0?: "red"
 */
