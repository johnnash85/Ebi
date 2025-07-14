import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import MiniLoader from "components/MiniLoader";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { CSVLink, CSVDownload } from "react-csv";
import { EntryModal, Row, EntryStrategyModal } from './components';
import { connect } from "react-redux";
import * as actions from "redux/actions/optionOrderActions";
import { Translate, I18n } from "react-redux-i18n";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};
function getCountContracts(rows) {
  var cap = 0;
  var count = 0;
  rows.forEach(item => {
    if (item.counter === 1) {
      cap = cap + item.open_trade;// Math.abs()
      count++;
    }
    else {
      item.sub_order.map(item_ => {
        if (item_.counter === 1) {
          cap = cap + item_.open_trade;//Math.abs();
          count++;
        }
        else {
          item_.sub_order.map(item__ => {
            cap = cap + item__.open_trade;
            count++;
          });
        }
      });
    }
  });

  return "Contract " + count + " = $" + cap.toFixed(2) + " USD";
}



const OptionOrders = props => {
  const { className, list, ...rest } = props;

  const classes = useStyles();

  //const [list, setList] = useState(props.list);

  useEffect(() => {
    if (props.list.length === 0)
      props.loadList(props.user_id, props.token);
  }, []);

  const headers = [
    { label: "Symbol", key: "symbol" },
    { label: "Open Date", key: "open_at" },
    { label: "Qtt", key: "quantity" },
    { label: "Stk", key: "strike" },
    { label: "Open Prc", key: "open_price" },
    { label: "Open Trd", key: "open_trade" },
    { label: "BE", key: "" },
    { label: "Exp", key: "expire_at" },
    { label: "DTE", key: "" },
    { label: "Ext", key: "" },
    { label: "NetLiq", key: "" },
    { label: "P/L", key: "" },
    { label: "P/L%", key: "" },
    { label: "Reference", key: "reference" },
  ];

  const dataCsv = () => {
    let data = [];
    /* props.list.forEach(element => {
       var item = {};
       if (element.counter === 1)
         headers.forEach(ref => {
           item = {
             ...item,
             [ref.key]: element[ref.key]
           };
         });
       else
         element.sub_order.forEach(subElement => {
           headers.forEach(ref => {
             item = {
               ...item,
               [ref.key]: subElement[ref.key]
             };
           });
         });
 
       data = data.concat(item);
     });*/
    return data;
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <div style={{ "display": "flex" }}>
            <EntryStrategyModal /> {" "}
            <EntryModal />
          </div>
        }
        title={getCountContracts(props.list)}
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                        align="right"
                      >
                        Symbol
                      </TableSortLabel>
                    </Tooltip></TableCell>
                  <TableCell>Last</TableCell>
                  <TableCell>Open Date</TableCell>
                  <TableCell align="right">
                    Qtt
                  </TableCell>
                  <TableCell align="right">Stk</TableCell>
                  <TableCell align="right">Open Prc</TableCell>
                  <TableCell align="right">Open Trd</TableCell>
                  <TableCell align="right">BE</TableCell>
                  <TableCell>Exp</TableCell>
                  <TableCell align="right">DTE</TableCell>
                  <TableCell align="right">NetLiq</TableCell>
                  <TableCell align="right">P/L</TableCell>
                  <TableCell align="right">P/L%</TableCell>
                  <TableCell>Reference</TableCell>
                  <TableCell>RollAccum</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.list.map((order, index) => (
                  <Row key={index} order={order} />
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      {
        props.loading ? (
          <CardActions style={{ "justifyContent": "center", }}>
            <MiniLoader />
          </CardActions>
        ) : <CardActions className={classes.actions}>
          <CSVLink
            data={dataCsv()}
            separator={";"}
            headers={headers}
            className="btn btn-primary"
            filename={"Ebi_stock_" + new Date().getTime() + ".csv"}
          > <Translate value="download" /> CSV
          </CSVLink>
        </CardActions>
      }
    </Card>
  );
};

OptionOrders.propTypes = {
  className: PropTypes.string
};

function mapStateToProps(reducer) {
  //console.log(reducer);
  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    list: reducer.optionOrder.list,
    error: reducer.optionOrder.error,
    loading: reducer.optionOrder.loading,
  };
}
const mapDispatchToProps = dispatch => ({
  loadList: (user_id, token) =>
    dispatch(actions.loadList({ user_id, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionOrders);
/**
 * <Button
          color="primary"
          size="small"
          variant="text"
          target="_blank"
        >
          Download PDF <ArrowRightIcon />
        </Button>
 *   <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                      //   onClick={() => { onClickDelete(item) }}
                      >
                        {"R"}
                      </Button>
                      {" "}
 *  <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[order.status]}
                          size="sm"
                        />
                        {order.status}
                      </div>
 <Button
            color="primary"
            size="small"
            variant="outlined"
          >
            Option entry
          </Button>


                  

 */
