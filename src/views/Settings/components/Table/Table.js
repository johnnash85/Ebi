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
import * as actions from "redux/actions/importActions";
import Delete from "@material-ui/icons/Delete";

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
}));

const stylesLocal = {
    subcell: {
        padding: "5px"
    },
    cell: {
        padding: "5px"
    }
};


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

    const onClick = (item) => {
        // props.setPatient(item);
    };

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {
                                        props.header.map((item) => (
                                            <TableCell>{item}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.list.map((item) => (
                                    <TableRow
                                        className={classes.tableRow}
                                        hover
                                        key={item.id}
                                    >
                                        {
                                            props.header.map((item_) => (
                                                <TableCell style={stylesLocal.cell}>
                                                    {item[item_]}
                                                </TableCell>
                                            ))
                                        }
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
    //  console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        auth: reducer.session.auth,

        list: reducer.import_.list,
        header: reducer.import_.header,

    };
}

const mapDispatchToProps = dispatch => ({
    // loadList: (user_id, token) =>
    //     dispatch(actions.loadList({ user_id, token })),

});
export default connect(mapStateToProps, mapDispatchToProps)(Table_);
/**   <TableBody>
                                {props.list.map((item) => (
                                    <TableRow
                                        className={classes.tableRow}
                                        hover
                                        key={item.id}
                                    >
                                        {
                                            item.list.map((item_, index) => (
                                                <TableCell style={stylesLocal.cell}>
                                                    {item_[index]}
                                                </TableCell>
                                            ))}
                                        }
                                    </TableRow>
                                ))}
                            </TableBody> */