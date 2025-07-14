import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
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
    Typography,
} from '@material-ui/core';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import CloseModal from '../CloseModal';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { collectFormValues } from 'validate.js';
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import "./styles.css";
import { connect } from "react-redux";
import * as actions from "redux/actions/stockOrderActions";
import { Link as RouterLink } from "react-router-dom";
import ReferenceModal from '../ReferenceModal';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { Translate, I18n } from "react-redux-i18n";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { makeStyles } from '@material-ui/styles';

const stylesLocal = {
    subcell: {
        padding: "5px",
        // fontWeight: "bold",
        color: "black"
    },
    cell: {
        padding: "5px",
        // fontWeight: "bold",
        color: "black"
    },
    avatar: {

    }
};
const useStyles = makeStyles(theme => ({
    avatar: {
        marginRight: '7px',
        height: 30,
        width: 30,
        flexDirection: 'row',
        position: "absolute",
        borderRadius: "5px"

    },

}));

const Row = props => {
    const { className, order, key, ...rest } = props;

    const [open, setOpen] = useState(false);

    const classes = useStyles();

    // const [openModalReference, setOpenModalReference] = useState(false);

    //const [reference, setReference] = useState("");

    const onClickDelete = (item) => {

        alertify.confirm(I18n.t("warning"), I18n.t("delete") + "?",
            function () {
                if (item.counter > 1)
                    props.removeSymbol(props.token, { symbol: item.symbol, id: props.user_id });
                else
                    props.removeItem(props.token, { stock_id: item.id, symbol: item.symbol, id: props.user_id });
            },
            function () {

            });
    };
    /*
        const onClickEdit = (item) => {
            setReference(item.reference);
            setOpenModalReference(true);
        };
    
        const handleClose = (item) => {
            setOpenModalReference(false);
            setReference("");
        };
    
        const handleSave = (item) => {
            setOpenModalReference(false);
            props.updateReference(props.token,
                {
                    stock_id: item.id,
                    reference: reference,
                    symbol: item.symbol,
                    id: props.user_id,
                });
            setReference("");
        };
    
        const handleChange = (event) => {
            setReference(event.target.value);
        };
    */
    //const pending = "Pending";

    const getPrice = (item) => {
        let quote = (props.stock[item.symbol] && props.stock[item.symbol].c) || item.price;
        return quote && +quote.toFixed(2);
    }

    return (
        <React.Fragment>
            <TableRow
                hover
                key={key}
            >
                <TableCell style={stylesLocal.cell}>
                    {
                        order.counter > 1 ? (<IconButton
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            <span style={{
                                "fontSize": "12px",
                                "fontWeight": "700",
                                "position": "absolute",
                                "left": "0px"
                            }}> {order.counter}</span>       {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                        </IconButton>

                        ) : (<IconButton
                            size="small"
                        ><FiberManualRecordIcon /> </IconButton>)
                    }
                    <img
                        className={classes.avatar}
                        src={order.icon_url}
                    />
                    {" "} <RouterLink to={"/stock/" + order.symbol} style={{ "color": "black", "fontWeight": "bold", "marginLeft": "35px" }}>{order.symbol.toUpperCase()}</RouterLink>
                    {
                        order.dividend === "1" && (<StarIcon fontSize="small" style={{
                            "top": "2px",
                            "position": "relative",
                            "height": "12px"
                        }} />)
                    }
                </TableCell>
                <TableCell style={{
                    padding: "5px",
                    fontWeight: "bold",
                    color: "black"
                }} align="right">

                    {getPrice(order)}{" "}
                    <Tooltip
                        enterDelay={100}
                        title="Price delay 15min"
                    >
                        < AccessTimeIcon fontSize="small" style={{
                            "position": "absolute",
                        }} />
                    </Tooltip>
                </TableCell>
                <TableCell style={stylesLocal.cell} align="right">{order.quantity}</TableCell>
                <TableCell style={stylesLocal.cell} align="right">  {(order.open_price).toFixed(2)}</TableCell>
                <TableCell style={stylesLocal.cell} align="right">  {(order.open_trade).toFixed(2)}</TableCell >
                <TableCell style={stylesLocal.cell} align="right">  {(order.quantity * getPrice(order)).toFixed(2)}</TableCell >
                <TableCell style={stylesLocal.cell} align="right">
                    {
                        getPrice(order) > 0 && (
                            order.market === "SELL" ?
                                (
                                    <span style={{ "color": order.open_price - parseFloat(getPrice(order)) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                        {(order.quantity * (order.open_price - parseFloat(getPrice(order)))).toFixed(2)}
                                    </span>
                                ) : (
                                    <span style={{ "color": order.open_price + parseFloat(getPrice(order)) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                        {(order.quantity * (order.open_price + parseFloat(getPrice(order)))).toFixed(2)}
                                    </span>
                                )
                        )
                    }

                </TableCell>
                <TableCell style={stylesLocal.cell} align="right">
                    {
                        getPrice(order) > 0 && (
                            order.market === "SELL" ?
                                (
                                    <span style={{ "color": order.open_price - parseFloat(getPrice(order)) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                        {((((order.open_price - parseFloat(getPrice(order))) / Math.abs(order.open_price))) * 100).toFixed(2)}{"%"}
                                    </span>
                                ) :
                                (
                                    <span style={{ "color": order.open_price + parseFloat(getPrice(order)) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                        {((((order.open_price + parseFloat(getPrice(order))) / Math.abs(order.open_price))) * 100).toFixed(2)}{"%"}
                                    </span>
                                )
                        )
                    }
                </TableCell>
                <TableCell style={stylesLocal.cell} align="center">
                    {order.open_at && moment(order.open_at).zone("+00:00").format('DD/MM/YYYY')}
                </TableCell>
                <TableCell className="cell_edit" style={stylesLocal.cell}>
                    <ReferenceModal
                        item={order}
                        key={props.key}
                    />
                    <Typography variant="inherit" noWrap>
                        {order.reference}{" "}
                    </Typography>
                </TableCell>
                <TableCell style={stylesLocal.cell}>
                    <CloseModal
                        key={props.key}
                        item={order}
                        price={getPrice(order)}
                    />
                    {" "}
                    <IconButton
                        size="small"
                        onClick={() => { onClickDelete(order) }}
                    >
                        <Delete />
                    </IconButton>
                </TableCell>
            </TableRow>
            <div style={{ "display": open ? "contents" : "none" }}>
                {open && order.sub_order.map((subOrder) => (
                    <TableRow hover key={subOrder.id} selected={true}>
                        <TableCell style={stylesLocal.subcell}>{""}</TableCell>
                        <TableCell style={stylesLocal.subcell}>{""}</TableCell>
                        <TableCell style={stylesLocal.subcell} align="right">{subOrder.quantity}</TableCell>
                        <TableCell style={stylesLocal.subcell} align="right">{subOrder.open_price}</TableCell>
                        <TableCell style={stylesLocal.subcell} align="right">
                            {(subOrder.open_trade).toFixed(2)}
                        </TableCell>
                        <TableCell style={stylesLocal.subcell} align="right">  {(subOrder.quantity * getPrice(order)).toFixed(2)}</TableCell >
                        <TableCell style={stylesLocal.subcell} align="right">
                            {
                                getPrice(order) > 0 && (
                                    subOrder.market === "SELL" ?
                                        (
                                            <span style={{ "color": subOrder.open_price - parseFloat(getPrice(order)) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                                {(subOrder.quantity * (subOrder.open_price - parseFloat(getPrice(order)))).toFixed(2)}
                                            </span>
                                        )
                                        :
                                        (
                                            <span style={{ "color": subOrder.open_price + parseFloat(getPrice(order)) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                                {(subOrder.quantity * (subOrder.open_price + parseFloat(getPrice(order)))).toFixed(2)}
                                            </span>
                                        )
                                )
                            }

                        </TableCell>
                        <TableCell style={stylesLocal.subcell} align="right">
                            {
                                getPrice(order) > 0 && (
                                    subOrder.market === "SELL" ?
                                        (
                                            <span style={{ "color": order.open_price - parseFloat(getPrice(order)) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                                {((((subOrder.open_price - parseFloat(getPrice(order))) / Math.abs(subOrder.open_price))) * 100).toFixed(2)}{"%"}
                                            </span>
                                        ) :
                                        (
                                            <span style={{ "color": subOrder.open_price + parseFloat(getPrice(order)) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                                {((((subOrder.open_price + parseFloat(getPrice(order))) / Math.abs(subOrder.open_price))) * 100).toFixed(2)}{"%"}
                                            </span>
                                        )
                                )
                            }

                        </TableCell>
                        <TableCell component="th" scope="row" style={stylesLocal.subcell} align="center">
                            {subOrder.open_at && moment(subOrder.open_at).zone("+00:00").format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell style={stylesLocal.subcell} className="cell_edit">
                            <ReferenceModal
                                item={subOrder}
                            />
                            <Typography variant="inherit" noWrap>
                                {subOrder.reference}{" "}
                            </Typography>
                        </TableCell>
                        <TableCell style={stylesLocal.subcell} >
                            <CloseModal
                                key={props.key}
                                item={subOrder}
                                price={getPrice(order)}
                            />
                            {" "}
                            <IconButton
                                size="small"
                                onClick={() => { onClickDelete(subOrder) }}
                            >
                                <Delete />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </div>
        </React.Fragment>
    )
}
Row.propTypes = {
    className: PropTypes.string
};



function mapStateToProps(reducer) {
    // console.log(reducer);
    return {

        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        stock: reducer.event.stock

    };
}
const mapDispatchToProps = dispatch => ({
    removeItem: (token, params) =>
        dispatch(actions.removeItem({ token, params })),
    removeSymbol: (token, params) =>
        dispatch(actions.removeSymbol({ token, params })),

    updateReference: (token, params) =>
        dispatch(actions.updateReference({ token, params })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Row);
/**
 *   {order.counter === 1 && (
                         </React.Fragment>
                    )}
                        <React.Fragment>
 * 
 *  {
                        order.counter === 1 && (
                                    </React.Fragment>
                )
                    }
                            <React.Fragment>


 *   <IconButton
                                size="small"
                                onClick={() => { onClickEdit(order) }}
                            >
                                <Edit />
                            </IconButton>
 *   open={openModalReference}
                                handleClose={handleClose}
                                handleSave={() => { handleSave(order) }}
                                handleChange={handleChange}
                                name={reference}
 *  open={openModalReference}
                                handleClose={handleClose}
                                handleSave={() => { handleSave(subOrder) }}
                                handleChange={handleChange}
                                name={reference}
                                 <IconButton
                                size="small"
                                onClick={() => { onClickEdit(subOrder) }}
                            >
                                <Edit />
                            </IconButton>
 *  {" "}
                                <IconButton
                                    size="small"
                                    onClick={() => { onClickEdit(order) }}
                                >
                                    <Edit />
                                </IconButton>
 */