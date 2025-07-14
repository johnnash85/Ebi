
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
    const { className, item, price, ...rest } = props;

    const [open, setOpen] = useState(false);
    const [strike_prev, setStrikePrev] = useState(0);

    const classes = useStyles();

    const setStrike = (value) => {

        setStrikePrev(value);

        return true;
    };
    console.log(strike_prev);

    return (

        <React.Fragment>
            <TableRow
                hover
                key={props.key}
            >
                <TableCell style={{
                    padding: "5px",
                    fontWeight: "bold",
                    color: "black"
                }} align="left">
                    {
                        <IconButton
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                        </IconButton>
                    }
                    {props.item.expiration_date}

                </TableCell>
                <TableCell align="center">



                </TableCell>

                <TableCell style={{
                    padding: "5px",
                    fontWeight: "bold",
                    color: "black"
                }} align="right">
                    {"Call"}
                </TableCell>

                <TableCell style={stylesLocal.cell} align="right">{ }</TableCell>

                <TableCell style={stylesLocal.cell} align="right">   </TableCell>

                <TableCell style={{
                    padding: "5px",
                    fontWeight: "bold",
                    color: "black"
                }} align="center">
                    {moment.tz(props.item.expiration_date, "America/New_York").diff(moment().tz("America/New_York"), "days") + 1}{"d"}
                </TableCell>

                <TableCell style={stylesLocal.cell} align="right"> </TableCell>

                <TableCell style={stylesLocal.cell} align="right">

                </TableCell>

                <TableCell style={{
                    padding: "5px",
                    fontWeight: "bold",
                    color: "black"
                }} align="right"> {"Put"}</TableCell>

                <TableCell style={{
                    padding: "5px",
                    fontWeight: "bold",
                    color: "black"
                }} align="right">



                </TableCell>
                <TableCell style={stylesLocal.cell} align="right">

                </TableCell>


            </TableRow>
            {
                <div style={{ "display": open ? "contents" : "none" }}>
                    {
                        props.item.strike_list.map((subItem, index) => (


                            <React.Fragment >



                                <SubRow
                                    key={index}
                                    subItem={subItem}
                                    //expire_at={props.item.expiration_date}
                                    name={props.name}
                                    symbol={props.symbol}
                                />

                            </React.Fragment>

                        ))
                    }
                </div>}
        </React.Fragment>
    )
}

Row.propTypes = {
    className: PropTypes.string
};

/**
 * 
 *  {
                                    price >= strike_prev && setStrike(subItem.strike_price) && price <= subItem.strike_price && (<Divider style={{ "background": "red" }} />)

                                }
                                
 {  {
        setStrikePrev(subItem.strike_price)
    }} reducer 
=
 */

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {

        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        stock: reducer.event.stock,
        option: reducer.event.option,

        listOption: reducer.optionTrade.list,

    };
}
const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Row);
/**
 *   <Tooltip 
                        enterDelay={100}
                        title="Price delay 15min"
                    >
                        < AccessTimeIcon fontSize="small" style={{
                            "position": "absolute",
                        }} />
                    </Tooltip>
 *   {order.open_at && moment(order.open_at).zone("+00:00").format('DD/MM/YYYY')}
 *  {open && order.sub_order.map((subOrder, index) => (
                    <SubRow key={index} subOrder={subOrder} order={order} />
                ))}
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