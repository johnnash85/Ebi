
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
    Typography
} from '@material-ui/core';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import CloseModal from '../CloseModal';
import RollModal from '../RollModal';
import RollHistoryModal from '../RollHistoryModal';
import SubRow from '../SubRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { collectFormValues } from 'validate.js';
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import "./styles.css";
import { connect, ReactReduxContext } from "react-redux";
import * as actions from "redux/actions/optionOrderActions";
import { Link as RouterLink } from "react-router-dom";
import ReferenceModal from '../ReferenceModal';
import GraphicModal from '../GraphicModal';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { Translate, I18n } from "react-redux-i18n";
import { makeStyles } from '@material-ui/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from "moment-timezone";
//import moment from 'moment';
const stylesLocal = {
    subcell: {
        padding: "5px",
        //fontWeight: "bold",
        //color: "black"
    },
    cell: {
        padding: "5px",
        // fontWeight: "bold",
        //    color: "black"
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
    const { className, order, ...rest } = props;

    const [open, setOpen] = useState(false);

    const classes = useStyles();

    // const [openModalReference, setOpenModalReference] = useState(false);

    // const [reference, setReference] = useState("");

    const onClickDelete = (item) => {
        alertify.confirm(I18n.t("warning"), I18n.t("delete") + "?",
            function () {
                props.removeItem(props.token, {
                    option_id: item.id,
                    strategy: item.strategy,
                    symbol: item.symbol,
                    id: props.user_id
                });
            },
            function () {

            });
    };

    const getPriceStock = (item) => {
        let quote = (props.stock[item.symbol] && props.stock[item.symbol].c) || item.price;
        return quote && quote.toFixed(2);
    }

    //MSFT211203C00225000" ->  Ticker +  Expiration Year (YY) + month(MM) + day(DD) +   C =Calls and P = Puts + strike price * 1000 * digitis


    const getPriceOption = (item) => {
        //let expiration = dateToYMD(moment(item.expire_at).zone("+00:00").format('YYYY-MM-DD'));
        let expiration = moment(item.expire_at).zone("+00:00").format('YYMMDD');
        let kind = item.option_kind === "CALL" ? "C" : "P";
        let strike = item.strike * 1000;

        let ticker = "O:" + item.symbol + expiration + kind + strike.toFixed(0).padStart(8, 0);
        //console.log(ticker);
        let quote = (props.option[ticker] && props.option[ticker].c) || item.option_price;
        return quote && +quote.toFixed(2);
    }

    const getPriceStrategy = (rows) => {
        var priceTotal = 0;
        // var count = 0;
        rows.forEach(item => {
            if (item.counter === 1) {
                priceTotal = priceTotal + (item.market === "SELL" ? - getPriceOption(item) : getPriceOption(item));// Math.abs()
                // count++;
            }
            // else {
            //     item.sub_order.map(item_ => {
            //         if (item_.counter === 1) {
            //             cap = cap + item_.open_trade;//Math.abs();
            //             count++;
            //         }
            //         else {
            //             item_.sub_order.map(item__ => {
            //                 cap = cap + item__.open_trade;
            //                 count++;
            //             });
            //         }
            //     });
            // }
        });
        return priceTotal && +priceTotal.toFixed(2);
    }
    /*
        const handleSave = (item) => {
            setOpenModalReference(false);
            props.updateReference(props.token,
                {
                    option_id: item.id,
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
    //moment.tz(order.open_at, "America/New_York").format('DD/MM/YYYY') 
    return (
        <React.Fragment>
            <TableRow
                hover
                key={props.key}
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
                            }}> {order.counter}</span>   {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                        </IconButton>

                        ) : (<IconButton
                            size="small"
                        ><FiberManualRecordIcon /> </IconButton>)
                    }
                    <img
                        className={classes.avatar}
                        src={order.icon_url}
                    />
                    {" "}<RouterLink to={"/stock/" + order.symbol} style={{ "color": "black", "fontWeight": "bold", "marginLeft": "35px" }}>{order.symbol.toUpperCase()}</RouterLink>
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
                }} align="center">

                    {getPriceStock(order)}{" "}
                    <Tooltip
                        enterDelay={100}
                        title="Price delay 15min"
                    >
                        < AccessTimeIcon fontSize="small" style={{
                            "position": "absolute",
                        }} />
                    </Tooltip>
                </TableCell>

                <TableCell style={stylesLocal.cell} align="right">
                    {order.open_at && moment(order.open_at).zone("+00:00").format('DD/MM/YYYY')}
                </TableCell>

                <TableCell style={stylesLocal.cell} align="right">{(order.counter > 1 ? order.quantity : ((order.market === "SELL" ? "-" : "+") + order.quantity + (order.option_kind === "CALL" ? "C" : "P")))}</TableCell>

                <TableCell style={stylesLocal.cell} align="right">  {order.strike} </TableCell>

                <TableCell style={stylesLocal.cell} align="right">  {(order.open_price).toFixed(2)}</TableCell>

                <TableCell style={stylesLocal.cell} align="right">  {(order.open_trade).toFixed(2)}</TableCell>

                <TableCell style={stylesLocal.cell} align="right">  {order.market && (order.market === "SELL" ? ((order.strike - order.open_price).toFixed(2)) : ((order.strike + order.open_price).toFixed(2)))}
                </TableCell>

                <TableCell style={{
                    "padding": "5px",
                    // "fontWeight": "bold",///   moment.tz(order.expire_at, "America/New_York").format('DD/MM/YYYY')
                    "color": new Date(order.expire_at) < new Date() ? "red" : "black"
                }}>
                    {order.expire_at && moment(order.expire_at).zone("+00:00").format('DD/MM/YYYY')}
                </TableCell>

                <TableCell style={stylesLocal.cell} align="right">
                    {order.expire_at && (moment.tz(order.expire_at, "America/New_York").diff(moment().tz("America/New_York"), 'days') + 1)}{"d"}
                </TableCell>

                <TableCell style={{
                    padding: "5px",
                    fontWeight: "bold",
                    color: "black"
                }} align="right">
                    {order.counter === 1 ? (
                        <React.Fragment>
                            {getPriceOption(order)}
                            <Tooltip
                                enterDelay={100}
                                title="Price delay 15min"
                            >
                                < AccessTimeIcon fontSize="small" style={{
                                    "position": "relative",
                                    "top": "5px"
                                }} />
                            </Tooltip>
                        </React.Fragment>) :
                        (<React.Fragment>
                            {getPriceStrategy(order.sub_order)}
                            <Tooltip
                                enterDelay={100}
                                title="Price delay 15min"
                            >
                                < AccessTimeIcon fontSize="small" style={{
                                    "position": "relative",
                                    "top": "5px"
                                }} />
                            </Tooltip>
                        </React.Fragment>)
                    }
                </TableCell>
                <TableCell style={stylesLocal.cell} align="right">
                    {

                        order.counter === 1 && getPriceOption(order) > 0 ? (
                            order.market === "SELL" ? (
                                <span style={{ "color": order.open_price - getPriceOption(order) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                    {((order.open_price - getPriceOption(order)) * (order.quantity) * 100).toFixed(2)}
                                </span>
                            ) : (
                                <span style={{ "color": order.open_price + getPriceOption(order) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                    {((order.open_price + getPriceOption(order)) * (order.quantity) * 100).toFixed(2)}
                                </span>
                            )
                        ) : (
                            getPriceStrategy(order.sub_order) !== 0 && (
                                <span style={{ "color": order.open_price + getPriceStrategy(order.sub_order) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                    {((order.open_price + getPriceStrategy(order.sub_order)) * (order.quantity) * 100).toFixed(2)}
                                </span>
                            ))
                    }
                </TableCell>
                <TableCell style={stylesLocal.cell} align="right">
                    {

                        order.counter === 1 && getPriceOption(order) > 0 ? (
                            order.market === "SELL" ? (
                                <span style={{ "color": order.open_price - getPriceOption(order) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                    {(((order.open_price - getPriceOption(order)) / Math.abs(order.open_price)) * 100).toFixed(2)}{"%"}
                                </span>
                            ) : (
                                <span style={{ "color": order.open_price + getPriceOption(order) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                    {(((order.open_price + getPriceOption(order)) / Math.abs(order.open_price)) * 100).toFixed(2)}{"%"}
                                </span>
                            )
                        ) : (
                            getPriceStrategy(order.sub_order) !== 0 && (
                                <span style={{ "color": order.open_price + getPriceStrategy(order.sub_order) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                    {(((order.open_price + getPriceStrategy(order.sub_order)) / Math.abs(order.open_price)) * 100).toFixed(2)}{"%"}
                                </span>
                            )
                        )

                    }
                </TableCell>

                {order.reference ? (
                    <TableCell className="cell_edit" style={stylesLocal.cell}>
                        <ReferenceModal
                            item={order}
                        />
                        <Typography variant="inherit" noWrap>
                            {order.reference}{" "}
                        </Typography>
                    </TableCell>
                )
                    :
                    (
                        <TableCell style={stylesLocal.cell}>
                            <Typography variant="inherit" noWrap>
                                {order.reference}{" "}
                            </Typography>
                        </TableCell>
                    )
                }

                <TableCell style={stylesLocal.cell} align="right">
                    {
                        (order.counter === 1 || order.reference) && order.roll_accum && (
                            <RollHistoryModal
                                item={order}
                                key={props.key}
                                color={order.roll_accum < 0 ? "red" : "green"}
                            />
                        )
                    }
                </TableCell>
                <TableCell style={stylesLocal.cell}>
                    {
                        (order.counter === 1 || order.reference) && (
                            <React.Fragment>
                                <CloseModal
                                    item={order}
                                    key={props.key}
                                    price={getPriceOption(order)}
                                />
                                {" "}
                                <RollModal
                                    item={order}
                                    key={props.key}
                                    price={getPriceOption(order)}
                                />
                                {" "}
                                <IconButton
                                    size="small"
                                    onClick={() => { onClickDelete(order) }}
                                >
                                    <Delete />
                                </IconButton>

                            </React.Fragment>
                        )
                    }
                </TableCell>
            </TableRow>
            <div style={{ "display": open ? "contents" : "none" }}>
                {open && order.sub_order.map((subOrder, index) => (
                    <SubRow key={index} subOrder={subOrder} order={order} />
                ))}
            </div>
        </React.Fragment>
    )
}

Row.propTypes = {
    className: PropTypes.string
};

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {

        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        stock: reducer.event.stock,
        option: reducer.event.option

    };
}
const mapDispatchToProps = dispatch => ({
    removeItem: (token, params) =>
        dispatch(actions.removeItem({ token, params })),
    updateReference: (token, params) =>
        dispatch(actions.updateReference({ token, params })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Row);
/**
 * {order.open_at && moment(order.open_at).zone("+00:00").format('DD/MM/YYYY')}
 * {order.expire_at && moment(order.expire_at).zone("+00:00").format('DD/MM/YYYY')}
 *  {order.expire_at && (Math.trunc((new Date(order.expire_at).getTime() - Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 0, 0, 0)) / (1000 * 60 * 60 * 24)))}{"-"}
 *    <GraphicModal item={order} key={props.key} />
 * 
 * 
 *  <React.Fragment>
                                                <CloseModal item={subOrder} />
                                                {" "}
                                                <RollModal item={subOrder} />
                                                {" "}
                                                <IconButton
                                                    size="small"
                                                    onClick={() => { onClickDelete(subOrder) }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </React.Fragment>
 * 
 * 
 * 
 *  open={openModalReference}
                                handleClose={handleClose}
                                handleSave={() => { handleSave(order) }}
                                handleChange={handleChange}
                                name={reference}
 *    open={openModalReference}
                                handleClose={handleClose}
                                handleSave={() => { handleSave(subOrder) }}
                                handleChange={handleChange}
                                name={reference}
 *  <IconButton
                                size="small"
                                onClick={() => { onClickEdit(subOrder) }}
                            >
                                <Edit />
                            </IconButton>
 *  <IconButton
                                size="small"
                                onClick={() => { onClickEdit(order) }}
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
                                 {" "}
                            <IconButton
                                size="small"
                                onClick={() => { onClickEdit(order) }}
                            >
                                <Edit />
                            </IconButton>


                            {
                                    order.roll_accum < 0 ?

                                        <text style={{ "color": "red" }}>
                                            {order.roll_accum}
                                        </text> :
                                        <text style={{ "color": "green" }}>
                                            {order.roll_accum}
                                        </text>
                                }
                            </RollHistoryModal>

                            {
                                            subOrder.roll_accum < 0 ?


                                                <text style={{ "color": "red" }}>
                                                    {subOrder.roll_accum}
                                                </text> :
                                                <text style={{ "color": "green" }}>
                                                    {subOrder.roll_accum}
                                                </text>
                                        }
                                    </RollHistoryModal>
 */