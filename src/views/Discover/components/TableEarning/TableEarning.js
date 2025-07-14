import React, { useState, useEffect } from "react";
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
import * as actions from "redux/actions/discoverActions";
import Delete from "@material-ui/icons/Delete";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MiniLoader from "components/MiniLoader";
import { Translate, I18n } from "react-redux-i18n";

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
        height: 25,
        width: 25,
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

    const onClickIn = (item) => {
        // props.setPatient(item);
    };

    const onClickDelete = (item) => {
        props.removeItem(props.token, { patient_id: item.id, id: props.user_id });
    };

    const onClickLoadMore = () => {
        props.loadMore(
            {
                index: props.pageCount,
                id: props.user_id,
            }, props.token)
    };


    useEffect(() => {
        //props.loadListDividend({ id: props.user_id }, props.token);
        props.loadList({ id: props.user_id }, props.token);
    }, []);

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
                                    <TableCell align="right">Last</TableCell>
                                    <TableCell align="right">EarningDate</TableCell>
                                    <TableCell align="right">Information</TableCell>
                                    <TableCell align="right">Estimation</TableCell>
                                    <TableCell align="right">Surprise</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((item) => (
                                    <TableRow
                                        className={classes.tableRow}
                                        hover
                                        key={item.id}
                                        selected={selectedList.indexOf(item.id) !== -1}
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
                                        <TableCell style={stylesLocal.cell}>{item.name}</TableCell>
                                        <TableCell style={stylesLocal.cell}>{item.exchange}</TableCell>
                                        <TableCell style={stylesLocal.cell} align="right">{'$ '}{item.price}</TableCell>
                                        <TableCell style={stylesLocal.cell} align="right">
                                            {moment(item.earning_at).zone("+00:00").format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell style={stylesLocal.cell} align="right">
                                            {item.information}
                                        </TableCell>
                                        <TableCell style={stylesLocal.cell} align="right">
                                            {item.estimation}
                                        </TableCell>
                                        <TableCell style={stylesLocal.cell} align="right">
                                            {item.surprise}
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
        </Card >
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

        list: reducer.discover.list,
        error: reducer.discover.error,
        loading: reducer.discover.loading,

        loadingMore: reducer.discover.loadingMore,
        pageSize: reducer.discover.page_size,
        pageCount: reducer.discover.page_count,

    };
}

const mapDispatchToProps = dispatch => ({
    loadList: (params, token) =>
        dispatch(actions.loadListEarning({ params, token })),
    loadMore: (params, token) =>
        dispatch(actions.loadListEarningScroll({ params, token })),

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
