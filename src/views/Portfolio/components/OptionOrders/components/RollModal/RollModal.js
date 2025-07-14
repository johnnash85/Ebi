import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import { connect } from "react-redux";
import * as actions from "redux/actions/optionOrderActions";
import * as actions_dashboard from "redux/actions/dashboardActions";
import { Translate, I18n } from "react-redux-i18n";
import InputDate from 'components/InputDate';
import { element } from 'prop-types';

function counterRoll(reference) {

    if (reference.indexOf('Roll') >= 0) {
        var text = reference.substring(0, reference.indexOf('Roll'));
        var sec = reference.substring(reference.indexOf('Roll') + 4, reference.length);
        sec = parseInt(sec) + 1;
        return text + "Roll" + sec;
    }
    return reference + "Roll1";
}

function getCloseAt(expire_at) {
    if (expire_at && new Date(expire_at) < new Date())
        return new Date(expire_at).toISOString().split('T')[0];

    return new Date().toISOString().split('T')[0];
}

const FormDialog = (props) => {
    const { item, ...rest } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setValues({
            symbol: item.symbol,
            quantity: item.quantity,
            close_price: props.price || Math.abs(item.close_price) || 0.01,
            open_price: Math.abs(item.open_price) || 0.01,
            strike: item.strike,
            strike_temp: item.strike,
            //close_at: new Date().toISOString().split('T')[0],
            open_at: new Date().toISOString().split('T')[0],
            expire_at: new Date(props.item.expire_at).toISOString().split('T')[0],
            close_at: getCloseAt(props.item.expire_at),// 
            market: item.market,
            option_kind: item.option_kind,
            option_id: item.id,
            reference: counterRoll(item.reference || ""),
            id: props.user_id
        });
        if (item.sub_order.length > 1) {
            setStrategy({
                ...strategy,
                leg: item.sub_order,
                symbol: item.sub_order.length > 1 && item.sub_order[0].symbol,
            });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        if (item.sub_order.length > 1)
            props.rollStrategy({
                ...strategy,
                close_at: values.close_at,
                open_at: values.open_at,
                reference: values.reference,
                expire_at: values.expire_at
            }, props.token);
        else
            props.rollItem(values, props.token);

        props.loadListIndicator(props.user_id, props.token);
        setOpen(false);
    };

    const handleSaveShare = (event) => {
        if (item.sub_order.length > 1)
            props.rollStrategy({
                ...strategy,
                share: true,
                close_at: values.close_at,
                open_at: values.open_at,
            }, props.token);
        else
            props.rollItem({
                ...values,
                share: true,
            }, props.token);

        props.loadListIndicator(props.user_id, props.token);
        setOpen(false);

    };

    const [values, setValues] = useState({
        symbol: item.symbol,
        quantity: item.quantity,
        close_price: props.price || Math.abs(item.close_price) || 0.01,
        open_price: Math.abs(item.open_price) || 0.01,
        strike: item.strike,
        strike_temp: item.strike,
        //close_at: new Date().toISOString().split('T')[0],
        open_at: new Date().toISOString().split('T')[0],
        expire_at: new Date(props.item.expire_at).toISOString().split('T')[0],
        close_at: getCloseAt(props.item.expire_at),// 
        market: item.market,
        option_kind: item.option_kind,
        option_id: item.id,
        reference: counterRoll(item.reference || ""),
        id: props.user_id
    });

    const [strategy, setStrategy] = useState({
        symbol: item.sub_order.length > 1 && item.sub_order[0].symbol,
        name: "",
        id: props.user_id,
        share: false,
        leg: item.sub_order,
        close_at: "",
        open_at: "",
    });


    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const option_kind = [
        {
            value: "CALL",
            label: "Call",
        },
        {
            value: "PUT",
            label: "Put",
        },
    ];

    const option_market_open = [
        {
            value: "SELL",
            label: "STO",
        },
        {
            value: "BUY",
            label: "BTO",
        },
    ];
    const option_market_close = [
        {
            value: "SELL",
            label: "STC",
        },
        {
            value: "BUY",
            label: "BTC",
        },
    ];

    const handleChangeLeg = (i, e) => {
        let leg = strategy.leg;
        if (!leg[i].strike_temp)
            leg[i].strike_temp = props.item.sub_order[i].strike;
        leg[i][e.target.name] = e.target.value;
        setStrategy(strategy => ({
            ...strategy,
            leg: leg
        }));
    }

    return (
        <div style={{ "display": "inline" }}>
            <Button color="primary"
                size="small"
                variant="contained"
                onClick={handleClickOpen}>
                Roll
            </Button>
            <Dialog open={open}
                onClose={handleClose}
                fullWidth={"true"}
                maxWidth={"sm"}
                key={props.key}
            >
                <DialogTitle> Option Roll  {item.symbol}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Data Option Roll
                    </DialogContentText>
                    {
                        (item.sub_order.length > 1) ?
                            (
                                strategy.leg.map((element, index) => (
                                    <React.Fragment>
                                        <div style={{ "flexDirection": "row", "display": "flex" }}>
                                            <TextField
                                                margin="dense"
                                                id="quantity"
                                                name="quantity"
                                                required="true"
                                                label="Quantity"
                                                type="number"
                                                min="1"
                                                value={element.quantity}
                                                onChange={e => handleChangeLeg(index, e)}
                                                // fullWidth
                                                sx={{ m: 1, width: '7ch' }}
                                                disabled
                                                variant="standard"
                                            />

                                            <TextField
                                                margin="dense"
                                                id="market"
                                                name="market"
                                                required="true"
                                                label="Kind"
                                                type="text"
                                                onChange={e => handleChangeLeg(index, e)}
                                                // fullWidth
                                                sx={{ m: 1, width: '10ch' }}
                                                variant="standard"
                                                disabled
                                                select
                                                // eslint-disable-next-line react/jsx-sort-props
                                                SelectProps={{ native: true }}
                                                value={(element.market === "SELL" ? "BUY" : "SELL")}
                                            >
                                                <option key={"0"} value={"0"}>
                                                    {"STC/BTC"}
                                                </option>
                                                {option_market_close.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>

                                            <TextField
                                                margin="dense"
                                                id="option_kind"
                                                name="option_kind"
                                                required="true"
                                                label="Kind"
                                                type="text"
                                                onChange={e => handleChangeLeg(index, e)}
                                                // fullWidth
                                                sx={{ m: 1, width: '10ch' }}
                                                variant="standard"
                                                disabled
                                                select
                                                // eslint-disable-next-line react/jsx-sort-props
                                                SelectProps={{ native: true }}
                                                value={element.option_kind}
                                            >
                                                <option key={"0"} value={"0"}>
                                                    {"Call/Put"}
                                                </option>
                                                {option_kind.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>

                                            <TextField
                                                margin="dense"
                                                id="strike_temp"
                                                name="strike_temp"
                                                required="true"
                                                label="Strike"
                                                type="number"
                                                min="0.01"
                                                step="0.01"
                                                inputProps={{
                                                    step: 0.1,
                                                }}
                                                value={element.strike_temp || element.strike}
                                                onChange={e => handleChangeLeg(index, e)}
                                                // fullWidth
                                                disabled
                                                sx={{ m: 1, width: '10ch' }}
                                                variant="standard"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="close_price"
                                                name="close_price"
                                                label="Close Price"
                                                type="number"
                                                min="0.01"
                                                step="0.01"
                                                inputProps={{
                                                    step: 0.01,
                                                }}
                                                //fullWidth
                                                sx={{ m: 1, width: '10ch' }}
                                                value={element.close_price || Math.abs(element.open_price)}
                                                variant="standard"
                                                onChange={e => handleChangeLeg(index, e)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                            />
                                        </div>
                                        <div style={{ "flexDirection": "row", "display": "flex" }}>
                                            <TextField
                                                margin="dense"
                                                id="quantity"
                                                name="quantity"
                                                required="true"
                                                label="Quantity"
                                                type="number"
                                                min="1"
                                                value={element.quantity}
                                                onChange={e => handleChangeLeg(index, e)}
                                                // fullWidth
                                                sx={{ m: 1, width: '7ch' }}
                                                disabled
                                                variant="standard"
                                            />

                                            <TextField
                                                margin="dense"
                                                id="market"
                                                name="market"
                                                required="true"
                                                label="Kind"
                                                type="text"
                                                onChange={e => handleChangeLeg(index, e)}
                                                // fullWidth
                                                sx={{ m: 1, width: '10ch' }}
                                                variant="standard"
                                                disabled
                                                select
                                                // eslint-disable-next-line react/jsx-sort-props
                                                SelectProps={{ native: true }}
                                                value={element.market}
                                            >
                                                <option key={"0"} value={"0"}>
                                                    {"STO/BTO"}
                                                </option>
                                                {option_market_open.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>

                                            <TextField
                                                margin="dense"
                                                id="option_kind"
                                                name="option_kind"
                                                required="true"
                                                label="Kind"
                                                type="text"
                                                onChange={e => handleChangeLeg(index, e)}
                                                // fullWidth
                                                sx={{ m: 1, width: '10ch' }}
                                                variant="standard"
                                                disabled
                                                select
                                                // eslint-disable-next-line react/jsx-sort-props
                                                SelectProps={{ native: true }}
                                                value={element.option_kind}
                                            >
                                                <option key={"0"} value={"0"}>
                                                    {"Call/Put"}
                                                </option>
                                                {option_kind.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                            <TextField
                                                margin="dense"
                                                id="strike"
                                                name="strike"
                                                required="true"
                                                label="Strike"
                                                type="number"
                                                min="0.01"
                                                step="0.01"
                                                inputProps={{
                                                    step: 0.1,
                                                }}
                                                value={element.strike}
                                                onChange={e => handleChangeLeg(index, e)}
                                                // fullWidth
                                                sx={{ m: 1, width: '10ch' }}
                                                variant="standard"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                            />
                                            {"  "}
                                            <TextField
                                                margin="dense"
                                                id="open_price"
                                                name="open_price"
                                                required="true"
                                                label="Prmn/Debit"
                                                type="number"
                                                min="0.01"
                                                step="0.01"
                                                inputProps={{
                                                    step: 0.01,
                                                }}
                                                value={Math.abs(element.open_price)}
                                                onChange={e => handleChangeLeg(index, e)}
                                                // fullWidth
                                                sx={{ m: 1, width: '10ch' }}
                                                variant="standard"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                            />
                                        </div>
                                    </React.Fragment>))) :
                            (
                                <React.Fragment>
                                    <div style={{ "flexDirection": "row", "display": "flex" }}>
                                        <TextField
                                            margin="dense"
                                            id="quantity"
                                            name="quantity"
                                            required="true"
                                            label="Quantity"
                                            type="number"
                                            min="1"
                                            value={values.quantity}
                                            onChange={handleChange}
                                            // fullWidth
                                            sx={{ m: 1, width: '7ch' }}
                                            disabled
                                            variant="standard"
                                        />

                                        <TextField
                                            margin="dense"
                                            id="market"
                                            name="market"
                                            required="true"
                                            label="Kind"
                                            type="text"
                                            onChange={handleChange}
                                            // fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                            disabled
                                            select
                                            // eslint-disable-next-line react/jsx-sort-props
                                            SelectProps={{ native: true }}
                                            value={(item.market === "SELL" ? "BUY" : "SELL")}
                                        >
                                            <option key={"0"} value={"0"}>
                                                {"STC/BTC"}
                                            </option>
                                            {option_market_close.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>

                                        <TextField
                                            margin="dense"
                                            id="option_kind"
                                            name="option_kind"
                                            required="true"
                                            label="Kind"
                                            type="text"
                                            onChange={handleChange}
                                            // fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                            disabled
                                            select
                                            // eslint-disable-next-line react/jsx-sort-props
                                            SelectProps={{ native: true }}
                                            value={values.option_kind}
                                        >
                                            <option key={"0"} value={"0"}>
                                                {"Call/Put"}
                                            </option>
                                            {option_kind.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>

                                        <TextField
                                            margin="dense"
                                            id="strike_temp"
                                            name="strike_temp"
                                            required="true"
                                            label="Strike"
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            inputProps={{
                                                step: 0.1,
                                            }}
                                            value={values.strike_temp}
                                            onChange={handleChange}
                                            // fullWidth
                                            disabled
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="close_price"
                                            name="close_price"
                                            label="Close Price"
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            inputProps={{
                                                step: 0.01,
                                            }}
                                            //fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            value={values.close_price}
                                            variant="standard"
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                        />
                                    </div>
                                    <div style={{ "flexDirection": "row", "display": "flex" }}>
                                        <TextField
                                            margin="dense"
                                            id="quantity"
                                            name="quantity"
                                            required="true"
                                            label="Quantity"
                                            type="number"
                                            min="1"
                                            value={values.quantity}
                                            onChange={handleChange}
                                            // fullWidth
                                            sx={{ m: 1, width: '7ch' }}
                                            disabled
                                            variant="standard"
                                        />

                                        <TextField
                                            margin="dense"
                                            id="market"
                                            name="market"
                                            required="true"
                                            label="Kind"
                                            type="text"
                                            onChange={handleChange}
                                            // fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                            disabled
                                            select
                                            // eslint-disable-next-line react/jsx-sort-props
                                            SelectProps={{ native: true }}
                                            value={item.market}
                                        >
                                            <option key={"0"} value={"0"}>
                                                {"STO/BTO"}
                                            </option>
                                            {option_market_open.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>

                                        <TextField
                                            margin="dense"
                                            id="option_kind"
                                            name="option_kind"
                                            required="true"
                                            label="Kind"
                                            type="text"
                                            onChange={handleChange}
                                            // fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                            disabled
                                            select
                                            // eslint-disable-next-line react/jsx-sort-props
                                            SelectProps={{ native: true }}
                                            value={values.option_kind}
                                        >
                                            <option key={"0"} value={"0"}>
                                                {"Call/Put"}
                                            </option>
                                            {option_kind.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                        <TextField
                                            margin="dense"
                                            id="strike"
                                            name="strike"
                                            required="true"
                                            label="Strike"
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            inputProps={{
                                                step: 0.1,
                                            }}
                                            value={values.strike}
                                            onChange={handleChange}
                                            // fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                        />
                                        {"  "}
                                        <TextField
                                            margin="dense"
                                            id="open_price"
                                            name="open_price"
                                            required="true"
                                            label="Prmn/Debit"
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            inputProps={{
                                                step: 0.01,
                                            }}
                                            value={values.open_price}
                                            onChange={handleChange}
                                            // fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                        />
                                    </div>
                                </React.Fragment>
                            )
                    }
                    < div style={{ "flexDirection": "row", "display": "flex", "justifyContent": "space-between" }}>
                        <InputDate
                            id="open_at"
                            name="open_at"
                            required="true"
                            placeHolder={"Roll At"}
                            label="Roll At(dd/mm/yyyy)"
                            value={values.open_at}
                            onChange={handleChange}
                            variant="lined"
                            min="1900-01-01"
                            max={new Date().toISOString().split('T')[0]}
                            disabled={false}
                        />

                        <TextField
                            margin="dense"
                            id="expire_at"
                            name="expire_at"
                            required="true"
                            label="Expire At(dd/mm/yyyy)"
                            type="date"
                            value={values.expire_at}
                            onChange={handleChange}
                            variant="standard"
                            sx={{ m: 1, width: '14ch' }}
                        />


                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        variant="outlined"
                    ><Translate value="cancel" /></Button>
                    <Button onClick={handleSaveShare}
                        variant="outlined"
                    ><Translate value="save_share" /></Button>
                    <Button onClick={handleSave}
                        variant="outlined"
                    ><Translate value="save" /></Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

    };
}
const mapDispatchToProps = dispatch => ({
    rollItem: (params, token) =>
        dispatch(actions.rollItem({ params, token })),
    rollStrategy: (params, token) =>
        dispatch(actions.rollStrategy({ params, token })),
    ////////////////////////////////
    loadListIndicator: (user_id, token) =>
        dispatch(actions_dashboard.loadListIndicator({ user_id, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
/**
 *  
 */