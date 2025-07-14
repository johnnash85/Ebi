import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from "moment";
import InputAdornment from '@mui/material/InputAdornment';
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
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
import { connect } from "react-redux";
import * as actions from "redux/actions/optionHistoryActions";
import { Translate, I18n } from "react-redux-i18n";

const stylesLocal = {
    subcell: {
        padding: "5px"
    },
    cell: {
        padding: "5px"
    }
};

const FormDialog = (props) => {
    const { item, ...rest } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        props.loadList({
            id: props.user_id,
            strategy: props.item.strategy,
            symbol: props.item.symbol,
            option_id: props.item.id
        }, props.token);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
    }, [props.list]);

    return (
        <div style={{ "display": "inline" }}>
            <Button
                size="small"
                variant="outlined"
                onClick={handleClickOpen}>
                <span style={{ "color": props.color }}>
                    {props.item.roll_accum}
                </span>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={"true"}
                maxWidth={"md"}
                key={props.key}
            >
                <DialogTitle> Option Roll History {item.symbol} RollAccum = {item.roll_accum}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Qtt</TableCell>
                                <TableCell>OpenPrc</TableCell>
                                <TableCell>ClsePrc</TableCell>
                                <TableCell>Open</TableCell>
                                <TableCell>Close</TableCell>
                                <TableCell>Expr</TableCell>
                                <TableCell align="right">Stk</TableCell>
                                <TableCell align="right">OpenTrd</TableCell>
                                <TableCell align="right">ClseTrd</TableCell>
                                <TableCell align="right">Tax</TableCell>
                                <TableCell align="right">P/L</TableCell>
                                <TableCell>Stus</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.list.map((item) => (
                                    <TableRow>
                                        <TableCell style={stylesLocal.cell}>{(item.market === "SELL" ? "-" : "+")}{item.quantity}{item.option_kind === "CALL" ? "C" : "P"}</TableCell>
                                        <TableCell style={stylesLocal.cell}>{item.open_price}{" "}{item.market === "SELL" ? "STO" : "BTO"}</TableCell>
                                        <TableCell style={stylesLocal.cell}>{item.status === "CLOSE" && item.close_price}{" "}{item.status === "CLOSE" && (item.market === "SELL" ? "BTC" : "STC")}</TableCell>
                                        <TableCell style={stylesLocal.cell}>
                                            {moment(item.open_at).zone("+00:00").format("DD/MM/YYYY")}
                                        </TableCell>
                                        <TableCell style={stylesLocal.cell}>
                                            {item.status === "CLOSE" && moment(item.close_at).zone("+00:00").format("DD/MM/YYYY")}
                                        </TableCell>
                                        <TableCell style={stylesLocal.cell}>
                                            {moment(item.expire_at).zone("+00:00").format("DD/MM/YYYY")}
                                        </TableCell>

                                        <TableCell style={stylesLocal.cell} align="right">{item.strike}</TableCell>
                                        <TableCell style={stylesLocal.cell} align="right">
                                            {item.open_trade}
                                        </TableCell>
                                        <TableCell style={stylesLocal.cell} align="right">
                                            {item.status === "CLOSE" && item.close_trade}
                                        </TableCell>
                                        <TableCell style={stylesLocal.cell} align="right">
                                            {item.status === "CLOSE" && item.tax}
                                        </TableCell>
                                        <TableCell style={stylesLocal.cell} align="right">
                                            {
                                                item.status === "CLOSE" &&
                                                (
                                                    (item.open_price + item.close_price) < 0 ?
                                                        (
                                                            <span style={{ "color": "red" }}>{(item.open_trade + item.close_trade - item.tax).toFixed(2)}</span>
                                                        )
                                                        :
                                                        (
                                                            <span style={{ "color": "green" }}>{(item.open_trade + item.close_trade - item.tax).toFixed(2)}</span>
                                                        )
                                                )
                                            }

                                        </TableCell>
                                        <TableCell style={stylesLocal.cell}>{item.status}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        variant="outlined"
                    > <Translate value="close" /></Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        list: reducer.optionHistory.list,
        error: reducer.optionHistory.error,
        loading: reducer.optionHistory.loading,

    };
}
const mapDispatchToProps = dispatch => ({
    loadList: (params, token) =>
        dispatch(actions.loadList({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
// align="left"
/**
 *   <TableCell>Reference</TableCell>
 *  <TableCell style={stylesLocal.cell} >
                                            {item.reference}
                                        </TableCell>
 */