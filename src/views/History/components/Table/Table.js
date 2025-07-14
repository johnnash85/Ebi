import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Button,
  IconButton,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@material-ui/core";
import UploadFile from "@material-ui/icons/Backup"; //   Publish
import DownloadFile from '@material-ui/icons/CloudDownload';
import Edit from "@material-ui/icons/Edit";
import { getInitials } from "helpers";
import { connect } from "react-redux";
import * as actions from "redux/actions/historyActions";
import Delete from "@material-ui/icons/Delete";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MiniLoader from "components/MiniLoader";
import { Translate, I18n } from "react-redux-i18n";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  actions: {
    justifyContent: "center",
  },
  avatar: {
    marginRight: '7px',
    height: 30,
    width: 30,
    flexDirection: 'row',
    position: "absolute",
    borderRadius: "5px"
  },
}));

const stylesLocal = {
  subcell: {
    padding: "5px"
  },
  cell: {
    padding: "5px"
  }
};

function pl(items) {
  var pl = 0;
  items.map(item => {
    pl = pl + (item.open_trade + item.close_trade - item.tax);
  });
  return pl.toFixed(2);
}

const Table_ = (props) => {
  const { className, list, history, ...rest } = props;

  const classes = useStyles();

  const [selectedList, setSelectedList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    // const { list } = props;

    let selectedList;

    if (event.target.checked) {
      selectedList = list.map((item) => item.id);
    } else {
      selectedList = [];
    }
    setSelectedList(selectedList);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedList.indexOf(id);
    let newSelectedList = [];

    if (selectedIndex === -1) {
      newSelectedList = newSelectedList.concat(selectedList, id);
    } else if (selectedIndex === 0) {
      newSelectedList = newSelectedList.concat(selectedList.slice(1));
    } else if (selectedIndex === selectedList.length - 1) {
      newSelectedList = newSelectedList.concat(selectedList.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedList = newSelectedList.concat(
        selectedList.slice(0, selectedIndex),
        selectedList.slice(selectedIndex + 1)
      );
    }

    setSelectedList(newSelectedList);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const onClickDelete = (item) => {
    //  console.log(item);
    alertify.confirm(I18n.t("warning"), I18n.t("delete") + "?",
      function () {
        props.removeItem(
          {
            history_id: item.id,
            symbol: item.symbol,
            id: props.user_id
          }
          , props.token);
      },
      function () {

      });
  };

  const onClickLoadMore = () => {
    props.loadMore(
      {
        index: props.pageCount,
        id: props.user_id,
        search: props.search,
      }, props.token)
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Symbol</TableCell>
                  <TableCell>Kind</TableCell>
                  <TableCell>Qtt</TableCell>
                  <TableCell>Open Price</TableCell>
                  <TableCell>Close Price</TableCell>
                  <TableCell>Open Date</TableCell>
                  <TableCell>Close Date</TableCell>
                  <TableCell>Expire Date</TableCell>
                  <TableCell>Reference</TableCell>
                  <TableCell align="right">Stk</TableCell>
                  <TableCell align="right">Open Trade</TableCell>
                  <TableCell align="right">Close Trade</TableCell>
                  <TableCell align="right">Tax</TableCell>
                  <TableCell align="right">P/L</TableCell>
                  <TableCell align="right">P/L %</TableCell>
                  <TableCell align="right">A</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.list.map((item) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={item.id}
                    selected={item.open_at === item.close_at}

                  >
                    <TableCell style={stylesLocal.cell}>
                      <img
                        className={classes.avatar}
                        src={item.icon_url}
                      />
                      <RouterLink to={"/stock/" + item.symbol} style={{ "fontWeight": "bold", "color": "black", "marginLeft": "35px" }}>{item.symbol.toUpperCase()}</RouterLink>
                      {
                        item.dividend === "1" && (<StarIcon fontSize="small" style={{
                          "top": "2px",
                          "position": "relative",
                          "height": "12px"
                        }} />)
                      }

                    </TableCell>
                    <TableCell style={stylesLocal.cell}>{item.kind}</TableCell>
                    <TableCell style={stylesLocal.cell}>
                      {item.counter && item.counter > 1
                        ?
                        (item.quantity)
                        :
                        ((item.market === "SELL" ? "-" : "+") + (item.quantity) + (item.kind === "OPTION" ? (item.option_kind === "CALL" ? "C" : "P") : ("")))
                      }
                    </TableCell>
                    <TableCell style={stylesLocal.cell}>{item.open_price}{" "}{item.kind === "OPTION" && (item.market === "SELL" ? "STO" : "BTO")}</TableCell>
                    <TableCell style={stylesLocal.cell}>{item.close_price}{" "}{item.kind === "OPTION" && (item.market === "SELL" ? "BTC" : "STC")}</TableCell>
                    <TableCell style={stylesLocal.cell}>
                      {moment(item.open_at).zone("+00:00").format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell style={stylesLocal.cell}>
                      {moment(item.close_at).zone("+00:00").format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell style={stylesLocal.cell}>
                      {item.kind === "OPTION" && moment(item.expire_at).zone("+00:00").format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell style={stylesLocal.cell} >
                      {item.reference}
                    </TableCell>
                    <TableCell style={stylesLocal.cell} align="right">{item.kind === "OPTION" && item.strike}</TableCell>
                    <TableCell style={stylesLocal.cell} align="right">
                      {item.open_trade}
                    </TableCell>
                    <TableCell style={stylesLocal.cell} align="right">
                      {item.close_trade}
                    </TableCell>
                    <TableCell style={stylesLocal.cell} align="right">
                      {item.tax}
                    </TableCell>
                    <TableCell style={stylesLocal.cell} align="right">
                      {
                        (item.open_price + item.close_price) < 0 ?
                          (
                            <span style={{ "color": "red" }}>{(item.open_trade + item.close_trade - item.tax).toFixed(2)}</span>
                          )
                          :
                          (
                            <span style={{ "color": "green" }}>{(item.open_trade + item.close_trade - item.tax).toFixed(2)}</span>
                          )
                      }

                    </TableCell>
                    <TableCell style={stylesLocal.cell} align="right">{
                      (item.open_price + item.close_price) < 0 ?
                        (
                          <span style={{ "color": "red" }}> {(((item.open_trade + item.close_trade) / (Math.abs(item.open_trade))) * 100).toFixed(2)}{"%"}</span>
                        ) :
                        (
                          <span style={{ "color": "green" }}> {(((item.open_trade + item.close_trade) / (Math.abs(item.open_trade))) * 100).toFixed(2)}{"%"}</span>
                        )

                    }
                    </TableCell>
                    <TableCell style={stylesLocal.cell}>
                      {
                        item.counter && item.counter > 1
                          ? (<></>)
                          : (<IconButton
                            size="small"
                            onClick={() => { onClickDelete(item) }}
                          >
                            <Delete />
                          </IconButton>)
                      }

                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={13}>Total</TableCell>
                  <TableCell align="right">${pl(list)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        {
          props.pageSize === 25 && (
            props.loadingMore ? (
              <MiniLoader />
            ) : (
              <Button className="Link" onClick={onClickLoadMore}>
                <Translate value="load_more" />
              </Button>
            )
          )
        }

      </CardActions>
    </Card>
  );
};

Table_.propTypes = {
  className: PropTypes.string,
  list: PropTypes.array.isRequired,
  history: PropTypes.object
};

function mapStateToProps(reducer) {
  //console.log(reducer);
  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    auth: reducer.session.auth,

    list: reducer.history.list,
    error: reducer.history.error,
    loading: reducer.history.loading,

    search: reducer.history.search,

    loadingMore: reducer.history.loadingMore,
    pageSize: reducer.history.page_size,
    pageCount: reducer.history.page_count,

  };
}

const mapDispatchToProps = dispatch => ({
  loadMore: (params, token) =>
    dispatch(actions.loadListScroll({ params, token })),
  removeItem: (params, token) =>
    dispatch(actions.removeItem({ params, token })),

});
export default connect(mapStateToProps, mapDispatchToProps)(Table_);
/**.slice((page * rowsPerPage), (rowsPerPage * (page + 1)))
 *  <TablePagination
          component="div"
          count={list.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
 * <TableCell>
                      {item.year}
                    </TableCell>
                    <TableCell>
                      {item.color}
                    </TableCell>
                     <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedList.length === list.length}
                      color="primary"
                      indeterminate={
                        selectedList.length > 0 &&
                        selectedList.length < list.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>

                   <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedList.indexOf(item.id) !== -1}
                        color="primary"
                        onChange={(event) => handleSelectOne(event, item.id)}
                        value="true"
                      />
                    </TableCell>
 */
