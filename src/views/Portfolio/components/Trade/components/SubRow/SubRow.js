
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { collectFormValues } from 'validate.js';
import "./styles.css";
import { connect, ReactReduxContext } from "react-redux";
import * as actions from "redux/actions/optionTradeActions";
import { Link as RouterLink } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { Translate, I18n } from "react-redux-i18n";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { EntryModalOption } from '../../components';

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
    const { className, subItem, name, ...rest } = props;

    const [open, setOpen] = useState(false);


    return (
        <React.Fragment>
            <TableRow hover key={props.key} selected={true}>
                <TableCell style={stylesLocal.subcell} align="right">
                    {subItem.call.open_interest}
                </TableCell>
                <TableCell style={stylesLocal.subcell} align="right">
                    {subItem.call.delta}
                </TableCell>
                <TableCell style={stylesLocal.subcell} align="right">
                    {subItem.call.volume}
                </TableCell>
                <TableCell style={stylesLocal.subcell} align="right">
                    {
                        subItem.call.bid && (
                            <EntryModalOption
                                market={"SELL"}
                                option_kind={"CALL"}
                                strike_price={subItem.strike_price}
                                name={name}
                                symbol={subItem.ticker}
                                expire_at={subItem.expiration_date}
                                price={subItem.call.bid.toFixed(2)}
                            />
                        )
                    }
                </TableCell>
                <TableCell style={stylesLocal.subcell} align="right">
                    {
                        subItem.call.ask && (
                            <EntryModalOption
                                market={"BUY"}
                                option_kind={"CALL"}
                                strike_price={subItem.strike_price}
                                name={name}
                                symbol={subItem.ticker}
                                expire_at={subItem.expiration_date}
                                price={subItem.call.ask.toFixed(2)}
                            />
                        )
                    }
                </TableCell>
                <TableCell style={{
                    padding: "5px",
                    fontWeight: "bold",
                    color: "black"
                }} align="center">
                    {subItem.strike_price.toFixed(2)}
                </TableCell>
                <TableCell style={stylesLocal.subcell} align="right">
                    {
                        subItem.put.bid && (
                            <EntryModalOption
                                market={"SELL"}
                                option_kind={"PUT"}
                                strike_price={subItem.strike_price}
                                name={name}
                                symbol={subItem.ticker}
                                expire_at={subItem.expiration_date}
                                price={subItem.put.bid.toFixed(2)}
                            />
                        )
                    }

                </TableCell>
                <TableCell style={stylesLocal.subcell} align="right">
                    {
                        subItem.put.ask && (
                            <EntryModalOption
                                market={"BUY"}
                                option_kind={"PUT"}
                                strike_price={subItem.strike_price}
                                name={name}
                                symbol={subItem.ticker}
                                expire_at={subItem.expiration_date}
                                price={subItem.put.ask.toFixed(2)}
                            />
                        )
                    }

                </TableCell>

                <TableCell style={stylesLocal.subcell} align="right">
                    {subItem.put.volume}
                </TableCell>

                <TableCell tyle={stylesLocal.subcell} align="right">
                    {subItem.put.delta}
                </TableCell>
                <TableCell style={stylesLocal.cell} align="right">
                    {subItem.put.open_interest}
                </TableCell>

            </TableRow>

        </React.Fragment>
    )
}

SubRow.propTypes = {
    className: PropTypes.string
};

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {

        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        //option: reducer.event.option,

        listOption: reducer.optionTrade.list,
    };
}
const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SubRow);

/**
 <GraphicModal item={subOrder} key={props.key} />
   <GraphicModal item={element} key={props.key} />
 */