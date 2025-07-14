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
import * as actions from "redux/actions/watchStockActions";
import AlertModal from '../AlertModal';
import Delete from "@material-ui/icons/Delete";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

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
    justifyContent: "flex-end",
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
    padding: "8px"
  }
};

const Table_ = (props) => {
  const { className, history, ...rest } = props;

  const classes = useStyles();

  const [selectedList, setSelectedList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  /*
    const handleSelectAll = (event) => {
      const { list } = props;
  
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
  */

  const onClickDelete = (item) => {
    props.removeItem(props.token, { stock_list_id: item.id, id: props.user_id });
  };

  const pending = "Pending";

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Symbol</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Exchange</TableCell>
                  <TableCell align="right">Bid</TableCell>
                  <TableCell align="right">Ask</TableCell>
                  <TableCell align="right">Change</TableCell>
                  <TableCell align="right">Change%</TableCell>
                  <TableCell align="right">Volume</TableCell>
                  <TableCell>Act</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.list.map((item) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={item.id}
                    selected={selectedList.indexOf(item.id) !== -1}
                  >
                    <TableCell style={stylesLocal.cell}>
                      <div className={classes.nameContainer}>
                        <img
                          className={classes.avatar}
                          src={item.icon_url}
                        />
                        <RouterLink to={"/stock/" + item.symbol} style={{ "fontWeight": "bold", "color": "black", "marginLeft": "35px" }}>{item.symbol}</RouterLink>
                        {
                          item.dividend === "1" && (<StarIcon fontSize="small" style={{
                            "top": "2px",
                            "position": "relative",
                            "height": "12px"
                          }} />)
                        }
                      </div>
                    </TableCell>
                    <TableCell style={stylesLocal.cell}>{item.name}</TableCell>
                    <TableCell style={stylesLocal.cell}>{item.exchange}</TableCell>
                    <TableCell align="right" style={stylesLocal.cell}>
                      {item.bid}
                    </TableCell>
                    <TableCell align="right" style={stylesLocal.cell}>
                      {item.ask}
                    </TableCell>
                    <TableCell align="right" style={stylesLocal.cell}>
                      {item.change}
                    </TableCell>
                    <TableCell align="right" style={stylesLocal.cell}>
                      {item.change_p}
                    </TableCell>
                    <TableCell align="right" style={stylesLocal.cell}>
                      {item.volume}
                    </TableCell>
                    <TableCell style={stylesLocal.cell}>
                      <AlertModal key={item.id} item={item} />
                      {" "}
                      <IconButton
                        size="small"
                        onClick={() => { onClickDelete(item) }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
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

    list: reducer.watchStock.list,

    auth: reducer.session.auth,
  };
}

const mapDispatchToProps = dispatch => ({
  removeItem: (token, params) =>
    dispatch(actions.removeItem({ token, params })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Table_);
/**
 *       <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={list.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
 * slice(0, rowsPerPage)
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
