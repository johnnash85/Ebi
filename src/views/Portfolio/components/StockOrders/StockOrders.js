import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
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
  TableSortLabel,
  Link,
  IconButton,
} from '@material-ui/core';
import { CSVLink, CSVDownload } from "react-csv";
//import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { EntryModal, Row } from './components';
//import PlusIcon from '@material-ui/icons/Add';
import { connect } from "react-redux";
import * as actions from "redux/actions/stockOrderActions";
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
  },

}));

const stylesLocal = {
  subcell: {
    padding: "5px"
  },
  cell: {
    padding: "8px"
  }
};


function getCapital(rows) {
  var cap = 0;
  var count = 0;
  rows.map(item => {
    if (item.counter === 1) {
      cap = cap + Math.abs(item.open_trade);
      count++;
    }

    else {
      item.sub_order.map(item_ => {
        cap = cap + Math.abs(item_.open_trade);
        count++;
      });
    }
  });

  return "Position " + count + " = $" + cap.toFixed(2) + " USD";
}

const StockOrders = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [list, setList] = useState(props.list);
  //const [cap, setCap] = useState(0.0);
  const headers = [
    { label: "Symbol", key: "symbol" },
    { label: "Last", key: "last" },
    { label: "Qtt", key: "quantity" },
    { label: "Open Prc", key: "open_price" },
    { label: "Open Trd", key: "open_trade" },
    { label: "P/L", key: "pl" },
    { label: "P/L%", key: "pl" },
    { label: "Open Date", key: "open_at" },
  ];

  const dataCsv = () => {
    let data = [];
    props.list.forEach(element => {
      let item = {};
      headers.forEach(ref => {
        item = {
          ...item,
          [ref.key]: element[ref.key]
        };
      });
      data = data.concat(item);
    });
    return data;
  }

  useEffect(() => {
    if (props.list.length === 0)
      props.loadList(props.user_id, props.token);
  }, []);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <EntryModal />
        }
        title={getCapital(props.list)}
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="desc" align="left">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >Symbol</TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">Last</TableCell>
                  <TableCell align="right">Qtt</TableCell>
                  <TableCell align="right">OpnPrc</TableCell>
                  <TableCell align="right">OpnTrd</TableCell>
                  <TableCell align="right">NetLiq</TableCell>
                  <TableCell align="right">P/L</TableCell>
                  <TableCell align="right">P/L%</TableCell>
                  <TableCell align="center">OpnDate</TableCell>
                  <TableCell align="left">Reference</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  props.list.map((order, index) => (
                    <Row key={index} order={order} />
                  ))
                }
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

StockOrders.propTypes = {
  className: PropTypes.string
};

function mapStateToProps(reducer) {
  //console.log(reducer);
  return {

    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    list: reducer.stockOrder.list,
    error: reducer.stockOrder.error,
    loading: reducer.stockOrder.loading,
  };
}
const mapDispatchToProps = dispatch => ({
  loadList: (user_id, token) =>
    dispatch(actions.loadList({ user_id, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockOrders);
/**
 * enclosingCharacter={`'`}
 *  target="_blank"
 * filename={"my-file.csv"}
  className="btn btn-primary"
   onClick={() => {
    console.log("You click the link"); // 👍🏻 Your click handling logic
  }}
  asyncOnClick={true}
  onClick={(event, done) => {
    axios.post("/spy/user").then(() => {
      done(); // REQUIRED to invoke the logic of component
    });
    getUsers = (event, done) => {
    if(!this.state.loading) {
      this.setState({
        loading: true
      });
      axios.get("/api/users").then((userListJson) => {
        this.setState({
          listOfUsers: userListJson,
          loading: false
        });
        done(true); // Proceed and get data from dataFromListOfUsersState function
      }).catch(() => {
        this.setState({
          loading: false
        });
        done(false);
      });
    }
  }
 *  <Button
          color="primary"
          size="small"
          variant="text"
        >
          Download CSV <ArrowRightIcon />
        </Button>
 * align="right"Math.trunc(
 *                     <Box sx={{ margin: 1 }}>    </Table>
                    </Box>
 *      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>   </TableCell>
 *         <TableHead>
                            <TableRow>
                              <TableCell>Date</TableCell>
                              <TableCell>Customer</TableCell>
                              <TableCell align="right">Amount</TableCell>
                              <TableCell align="right">Total price ($)</TableCell>
                            </TableRow>
                          </TableHead>
 *                         <Typography variant="h6" gutterBottom component="div">
                          History
                        </Typography>
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
            Stock entry
          </Button>

                       <Button
                        color="primary"
                        variant="contained"
                        size="small"
                      //   onClick={() => { onClickDelete(item) }}
                      >
                        {"CLOSE"}
                      </Button>

                       <Link
                          component="button"
                          variant="body2"
                          onClick={() => {
                            console.info("I'm a button.");
                          }}
                        >
                          <PlusIcon style={{ "fontSize": "1rem" }} />
                        </Link>
 */
