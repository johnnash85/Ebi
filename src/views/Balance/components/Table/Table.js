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
import * as actions from "redux/actions/balanceActions";
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
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: "center",
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
    alertify.confirm(I18n.t("warning"), I18n.t("delete") + "?",
      function () {
        props.removeItem(props.token, { balance_id: item.id, id: props.user_id });
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
                  <TableCell align="left">Id</TableCell>
                  <TableCell>Kind</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Balance</TableCell>
                  <TableCell align="right">Created Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.list.map((item) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={item.id}
                  >
                    <TableCell style={stylesLocal.cell}>
                      {item.id}
                    </TableCell>
                    <TableCell style={stylesLocal.cell}>{item.kind_transaction}</TableCell>
                    <TableCell style={stylesLocal.cell}>
                      {
                        (item.description)
                      }
                    </TableCell>
                    <TableCell style={stylesLocal.cell} align="right">
                      {item.value > 0
                        ? (<span style={{ "color": "green", "fontWeight": "bold" }}> {"+"}{(item.value).toFixed(2)}</span>)
                        :
                        (<span style={{ "color": "red", "fontWeight": "bold" }}> {""}{(item.value).toFixed(2)}</span>)
                      }
                    </TableCell>
                    <TableCell style={stylesLocal.cell} align="right">
                      <span style={{ "fontWeight": "bold" }}>
                        {(item.balance).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell style={stylesLocal.cell} align="right">
                      {moment(item.created_at).zone("+00:00").format("DD/MM/YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
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

    list: reducer.balance.list,
    error: reducer.balance.error,
    loading: reducer.balance.loading,

    search: reducer.balance.search,

    loadingMore: reducer.balance.loadingMore,
    pageSize: reducer.balance.page_size,
    pageCount: reducer.balance.page_count,

  };
}

const mapDispatchToProps = dispatch => ({
  loadMore: (params, token) =>
    dispatch(actions.loadListScroll({ params, token })),
  //removeItem: (token, params) =>
  //  dispatch(actions.removeItem({ token, params })),

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
