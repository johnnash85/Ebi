import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { connect } from "react-redux";
import * as actions_stock from "redux/actions/stockOrderActions";
import * as actions_dashboard from "redux/actions/dashboardActions";
import { validate } from 'validate.js';
import { Translate, I18n } from "react-redux-i18n";
import InputDate from 'components/InputDate';

const FormDialog = (props) => {

    const { item, ...rest } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setValues({
            stock_id: item.id || undefined,
            open_price: item.open_price || 0.01,
            symbol: item.symbol,
            quantity: item.quantity,
            close_price: props.price || Math.abs(item.open_price) || 0,//
            close_at: new Date().toISOString().split('T')[0],//props.item.open_at || 
            market: item.market === 'BUY' ? 'SELL' : 'BUY',
            id: props.user_id,
            quantity_tmp: item.quantity,
            counter: item.counter,
            isValid: true
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        if (item.counter > 1)
            props.updateSymbol(values, props.token);
        else
            props.updateItem(values, props.token);
        setOpen(false);

        props.loadListIndicator(props.user_id, props.token);
    };

    const handleSaveShare = (event) => {
        if (item.counter > 1)
            props.updateSymbol({ ...values, share: true }, props.token);
        else
            props.updateItem({ ...values, share: true }, props.token);
        setOpen(false);
    };

    const [values, setValues] = useState({
        stock_id: item.id || undefined,
        open_price: item.open_price || 0.01,
        symbol: item.symbol,
        quantity: item.quantity,
        close_price: props.price || Math.abs(item.open_price) || 0,//
        close_at: new Date().toISOString().split('T')[0],//props.item.open_at || 
        market: item.market === 'BUY' ? 'SELL' : 'BUY',
        id: props.user_id,
        quantity_tmp: item.quantity,
        counter: item.counter,
        isValid: true
    });

    const validate = (item) => {
        if (item.quantity > item.quantity_tmp)
            return { quantity: "Quantity is wrong" };
        if (item.quantity.length === 0)
            return { quantity: "Quantity is empty" };
        return null;
    }

    useEffect(() => {
        const errors = validate(values);
        setValues(values => ({
            ...values,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [values.quantity]);


    const handleChange = (event) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value,

        }));
    };

    return (
        <div key={props.key} style={{ "display": "inline" }}>
            <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={handleClickOpen}>
                <Translate value="close" />
            </Button>
            <Dialog open={open} onClose={handleClose} fullHeight={true}>
                <DialogTitle> Stock Close {item.symbol}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Data Stock
                    </DialogContentText>
                    <div style={{ "flexDirection": "row", "display": "flex" }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="quantity"
                            name="quantity"
                            label="Quantity"
                            type="number"
                            min="1"
                            // fullWidth
                            sx={{ m: 1, width: '15ch' }}
                            variant="standard"
                            onChange={handleChange}
                            value={values.quantity}
                        />
                        {"  "}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="close_price"
                            name="close_price"
                            label="Price"
                            type="number"
                            min="0.01"
                            step="0.01"
                            inputProps={{
                                step: 0.01,
                            }}
                            onChange={handleChange}
                            value={values.close_price}
                            //   fullWidth
                            sx={{ m: 1, width: '15ch' }}
                            variant="standard"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                        {"  "}
                        <InputDate
                            id="close_at"
                            name="close_at"
                            required="true"
                            placeHolder={"Close At"}
                            label="Close At(dd/mm/yyyy)"
                            value={values.close_at}
                            onChange={handleChange}
                            variant="lined"
                            min="1900-01-01"
                            max={new Date().toISOString().split('T')[0]}
                            disabled={false}
                        />
                    </div>
                    {
                        values.counter === 1 && (
                            <Typography style={{
                                "paddingTop": "10px",
                            }}>
                                {(values.quantity * parseFloat(values.close_price)).toFixed(2)} {"USD. P/L = " + (values.quantity * ((values.market === "BUY" ? - parseFloat(values.close_price) : parseFloat(values.close_price)) + values.open_price)).toFixed(2)}
                            </Typography>
                        )
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        variant="outlined"><Translate value="cancel" /></Button>
                    <Button onClick={handleSaveShare}
                        variant="outlined"
                        disabled={!values.isValid}
                    > <Translate value="save_share" /></Button>
                    <Button onClick={handleSave}
                        variant="outlined"
                        disabled={!values.isValid}
                    > <Translate value="save" /></Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function mapStateToProps(reducer) {
    // console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token
    };
}
const mapDispatchToProps = dispatch => ({
    updateItem: (params, token) =>
        dispatch(actions_stock.updateItem({ params, token })),
    updateSymbol: (params, token) =>
        dispatch(actions_stock.updateSymbol({ params, token })),
    ////////////////////////////////
    loadListIndicator: (user_id, token) =>
        dispatch(actions_dashboard.loadListIndicator({ user_id, token })),

});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);