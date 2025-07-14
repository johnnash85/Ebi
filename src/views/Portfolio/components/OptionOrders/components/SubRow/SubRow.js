
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
    Typography
} from '@material-ui/core';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import CloseModal from '../CloseModal';
import RollModal from '../RollModal';
import RollHistoryModal from '../RollHistoryModal';
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
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { Translate, I18n } from "react-redux-i18n";
import GraphicModal from '../GraphicModal';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

const SubRow = props => {
    const { className, subOrder, order, ...rest } = props;

    const [open, setOpen] = useState(false);

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

    const getPriceOption = (item) => {
        //let expiration = dateToYMD(moment(item.expire_at).zone("+00:00").format('YYYY-MM-DD'));
        let expiration = moment(item.expire_at).zone("+00:00").format('YYMMDD');
        let kind = item.option_kind === "CALL" ? "C" : "P";
        let strike = item.strike * 1000;
        let ticker = "O:" + item.symbol + expiration + kind + strike.toFixed(0).padStart(8, 0);
        let quote = (props.option[ticker] && props.option[ticker].c) || item.option_price;
        return quote && +quote.toFixed(2);
    }


    return (
        <React.Fragment>
            <TableRow hover key={props.key} selected={true}>
                <TableCell style={stylesLocal.subcell} align="center">
                    {
                        subOrder.counter > 1 ? (<IconButton
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                        </IconButton>

                        ) : (<IconButton
                            size="small"
                        ><FiberManualRecordIcon /> </IconButton>)
                    }
                </TableCell>
                <TableCell ></TableCell>
                <TableCell component="th" scope="row" style={stylesLocal.subcell} align="right">
                    {subOrder.open_at && moment(subOrder.open_at).zone("+00:00").format('DD/MM/YYYY')}
                </TableCell>
                <TableCell style={stylesLocal.subcell} align="right">{subOrder.counter > 1 ? subOrder.quantity : ((subOrder.market === "SELL" ? "-" : "+") + subOrder.quantity + (subOrder.option_kind === "CALL" ? "C" : "P"))}</TableCell>
                <TableCell style={stylesLocal.subcell} align="right">  {subOrder.counter === 1 && subOrder.strike} </TableCell>
                <TableCell style={stylesLocal.subcell} align="right">  {(subOrder.open_price).toFixed(2)} </TableCell>
                <TableCell style={stylesLocal.subcell} align="right">
                    {(subOrder.open_trade).toFixed(2)}
                </TableCell>
                <TableCell style={stylesLocal.subcell} align="right">  {subOrder.counter === 1 && (subOrder.market === "SELL" ? ((subOrder.strike - subOrder.open_price).toFixed(2)) : ((subOrder.strike + subOrder.open_price).toFixed(2)))}
                </TableCell>
                <TableCell style={{
                    "padding": "5px",
                    // "fontWeight": "bold",
                    "color": new Date(subOrder.expire_at) < new Date() ? "red" : "black"
                }}>
                    {subOrder.expire_at && moment(subOrder.expire_at).zone("+00:00").format('DD/MM/YYYY')}
                </TableCell>
                <TableCell style={stylesLocal.subcell} align="right">{subOrder.expire_at && (Math.trunc((new Date(subOrder.expire_at).getTime() - Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 0, 0, 0)) / (1000 * 60 * 60 * 24)))}</TableCell>

                <TableCell style={{
                    padding: "5px",
                    fontWeight: "bold",
                    color: "black"
                }} align="right">
                    {subOrder.counter === 1 && (
                        <React.Fragment>
                            {getPriceOption(subOrder)}
                            <Tooltip
                                enterDelay={100}
                                title="Price delay 15min"
                            >
                                < AccessTimeIcon fontSize="small"
                                    style={{
                                        "position": "relative",
                                        "top": "5px"
                                    }}
                                />
                            </Tooltip>
                        </React.Fragment>)
                    }
                </TableCell>
                <TableCell style={stylesLocal.cell} align="right">
                    {
                        subOrder.counter === 1 && getPriceOption(subOrder) > 0 && (
                            subOrder.market === "SELL" ? (
                                <span style={{ "color": subOrder.open_price - getPriceOption(subOrder) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                    {((subOrder.open_price - getPriceOption(subOrder)) * subOrder.quantity * 100).toFixed(2)}
                                </span>
                            ) : (
                                <span style={{ "color": subOrder.open_price + getPriceOption(subOrder) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                    {((subOrder.open_price + getPriceOption(subOrder)) * subOrder.quantity * 100).toFixed(2)}
                                </span>
                            )
                        )
                    }
                </TableCell>
                <TableCell style={stylesLocal.subcell} align="right">
                    {
                        subOrder.counter === 1 && getPriceOption(subOrder) > 0 && (
                            subOrder.market === "SELL" ? (
                                <span style={{ "color": subOrder.open_price - getPriceOption(subOrder) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                    {(((subOrder.open_price - getPriceOption(subOrder)) / Math.abs(subOrder.open_price)) * 100).toFixed(2)}{"%"}
                                </span>
                            ) : (
                                <span style={{ "color": subOrder.open_price + getPriceOption(subOrder) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                    {(((subOrder.open_price + getPriceOption(subOrder)) / Math.abs(subOrder.open_price)) * 100).toFixed(2)}{"%"}
                                </span>
                            )
                        )
                    }
                </TableCell>
                <TableCell style={stylesLocal.subcell} className="cell_edit">
                    {
                        order.expire_at ? (
                            <TableCell style={stylesLocal.cell}>
                                <Typography variant="inherit" noWrap>

                                </Typography>
                            </TableCell>
                        )
                            :
                            (
                                <TableCell className="cell_edit" style={stylesLocal.cell}>
                                    <ReferenceModal
                                        key={props.key}
                                        item={subOrder}
                                    />
                                    <Typography variant="inherit" noWrap>
                                        {subOrder.reference}
                                    </Typography>
                                </TableCell>
                            )
                    }
                </TableCell>
                <TableCell style={stylesLocal.cell} align="right">
                    {
                        subOrder.counter === 1 ? (
                            subOrder.roll_accum && (
                                <RollHistoryModal
                                    item={subOrder}
                                    key={props.key}
                                    color={subOrder.roll_accum < 0 ? "red" : "green"}
                                />
                            )
                        ) :
                            (
                                subOrder.roll_accum && (
                                    <span style={{
                                        "padding": "5px",
                                        "color": subOrder.roll_accum < 0 ? "red" : "green"
                                    }} >
                                        {subOrder.roll_accum}
                                    </span>
                                )
                            )
                    }
                </TableCell>
                <TableCell style={stylesLocal.subcell}>

                    <React.Fragment>
                        <CloseModal
                            item={subOrder}
                            key={props.key}
                            price={getPriceOption(subOrder)}
                        />
                        {" "}
                        <RollModal
                            item={subOrder}
                            key={props.key}
                            price={getPriceOption(subOrder)}
                        />
                        {" "}
                        <IconButton
                            size="small"
                            onClick={() => { onClickDelete(subOrder) }}
                        >
                            <Delete />
                        </IconButton>

                    </React.Fragment>

                </TableCell>
            </TableRow>
            <div style={{ "display": open ? "contents" : "none" }}>
                {
                    open && subOrder.sub_order.map((element, index) => (
                        <TableRow hover key={index} >
                            <TableCell style={stylesLocal.subcell}></TableCell>
                            <TableCell style={stylesLocal.subcell}></TableCell>
                            <TableCell style={stylesLocal.subcell}></TableCell>
                            <TableCell style={stylesLocal.subcell} align="right">{((element.market === "SELL" ? "-" : "+") + element.quantity + (element.option_kind === "CALL" ? "C" : "P"))}</TableCell>
                            <TableCell style={stylesLocal.subcell} align="right">  {element.strike} </TableCell>
                            <TableCell style={stylesLocal.subcell} align="right">  {(element.open_price).toFixed(2)} </TableCell>
                            <TableCell style={stylesLocal.subcell} align="right">
                                {(element.open_trade).toFixed(2)}
                            </TableCell>
                            <TableCell style={stylesLocal.subcell} align="right">  {(element.market === "SELL" ? ((element.strike - element.open_price).toFixed(2)) : ((element.strike + element.open_price).toFixed(2)))}
                            </TableCell>
                            <TableCell style={{
                                "padding": "5px",
                                // "fontWeight": "bold",
                                "color": new Date(element.expire_at) < new Date() ? "red" : "black"
                            }}>
                                {element.expire_at && moment(element.expire_at).zone("+00:00").format('DD/MM/YYYY')}
                            </TableCell>
                            <TableCell style={stylesLocal.subcell} align="right">  {element.expire_at && (Math.trunc((new Date(element.expire_at).getTime() - Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 0, 0, 0)) / (1000 * 60 * 60 * 24)))}</TableCell>

                            <TableCell style={{
                                padding: "5px",
                                fontWeight: "bold",
                                color: "black"
                            }} align="right">
                                {getPriceOption(element)}
                                <Tooltip
                                    enterDelay={100}
                                    title="Price delay 15min"
                                >
                                    < AccessTimeIcon fontSize="small" style={{
                                        "position": "relative",
                                        "top": "5px"
                                    }} />
                                </Tooltip>
                            </TableCell>
                            <TableCell style={stylesLocal.cell} align="right">
                                {
                                    getPriceOption(element) > 0 && (
                                        element.market === "SELL" ? (
                                            <span style={{ "color": element.open_price - getPriceOption(element) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                                {((element.open_price - getPriceOption(element)) * (element.quantity) * 100).toFixed(2)}
                                            </span>
                                        ) : (
                                            <span style={{ "color": element.open_price + getPriceOption(element) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                                {((element.open_price + getPriceOption(element)) * (element.quantity) * 100).toFixed(2)}
                                            </span>
                                        )
                                    )
                                }
                            </TableCell>
                            <TableCell style={stylesLocal.subcell} align="right"> {
                                getPriceOption(element) > 0 && (
                                    element.market === "SELL" ? (
                                        <span style={{ "color": element.open_price - getPriceOption(element) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                            {(((element.open_price - getPriceOption(element)) / Math.abs(element.open_price)) * 100).toFixed(2)}{"%"}
                                        </span>
                                    ) : (
                                        <span style={{ "color": element.open_price + getPriceOption(element) < 0 ? "red" : "green", "fontWeight": "bold" }}>
                                            {(((element.open_price + getPriceOption(element)) / Math.abs(element.open_price)) * 100).toFixed(2)}{"%"}
                                        </span>
                                    )
                                )
                            }
                            </TableCell>
                            <TableCell style={stylesLocal.subcell} >

                            </TableCell>
                            <TableCell style={stylesLocal.cell} align="right">
                                {
                                    element.roll_accum && (
                                        <RollHistoryModal
                                            item={element}
                                            key={props.key}
                                            color={element.roll_accum < 0 ? "red" : "green"}
                                        />
                                    )
                                }
                            </TableCell>
                            <TableCell style={stylesLocal.subcell}>
                                <CloseModal
                                    item={element}
                                    key={props.key}
                                    price={getPriceOption(element)}
                                />
                                {" "}
                                <RollModal
                                    item={element}
                                    key={props.key}
                                    price={getPriceOption(element)}
                                />
                                {" "}
                                <IconButton
                                    size="small"
                                    onClick={() => { onClickDelete(element) }}
                                >
                                    <Delete />

                                </IconButton>

                            </TableCell>
                        </TableRow>
                    ))
                }
            </div>
        </React.Fragment>
    )
}

SubRow.propTypes = {
    className: PropTypes.string
};

function mapStateToProps(reducer) {
    // console.log(reducer);
    return {

        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        option: reducer.event.option

    };
}
const mapDispatchToProps = dispatch => ({
    removeItem: (token, params) =>
        dispatch(actions.removeItem({ token, params })),
    updateReference: (token, params) =>
        dispatch(actions.updateReference({ token, params })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubRow);

/**
 <GraphicModal item={subOrder} key={props.key} />
   <GraphicModal item={element} key={props.key} />
 */