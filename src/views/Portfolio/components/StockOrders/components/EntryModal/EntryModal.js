import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
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
import * as actions from "redux/actions/stockOrderActions";
import * as actions_stock from "redux/actions/stockActions";
import * as actions_dashboard from "redux/actions/dashboardActions";
import * as actions_event from "redux/actions/eventActions";
import ListStockSelect from 'components/ListStockSelect';
import { Translate, I18n } from "react-redux-i18n";
import InputDate from 'components/InputDate';

const schema = {
    symbol: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 300
        }
    },
}

const FormDialog = (props) => {
    // const { className, history, ...rest } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setDialogState({
            isValid: false,
            values: {
                symbol: "",
                quantity: 1,
                open_price: 0.01,
                market: "BUY",
                open_at: new Date().toISOString().split('T')[0],
                id: props.user_id,
                name: ""
            },
            touched: {},
            errors: {}
        });

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (event) => {
        // event.preventDefault();
        if (dialogState.values.symbol === "") {
            return;
        }
        props.newItem(dialogState.values, props.token);
        props.loadListIndicator(props.user_id, props.token);
        props.suscribeStock(dialogState.values);
        setOpen(false);
    };

    const handleSaveShare = (event) => {
        if (dialogState.values.symbol === "") {
            return;
        }
        props.newItem({ ...dialogState.values, share: true }, props.token);
        props.loadListIndicator(props.user_id, props.token);
        props.suscribeStock(dialogState.values);
        setOpen(false);
    };

    const [dialogState, setDialogState] = useState({
        isValid: false,
        values: {
            symbol: "",
            quantity: 1,
            open_price: 0.01,
            market: "BUY",
            open_at: new Date().toISOString().split('T')[0],
            id: props.user_id,
            name: ""
        },
        touched: {},
        errors: {}
    });




    useEffect(() => {
        const errors = validate(dialogState.values, schema);
        setDialogState(dialogState => ({
            ...dialogState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [dialogState.values]);

    const handleChangeSymbol = (event) => {
        event.persist();
        if (event.target.value.trim() !== dialogState.values.symbol) {
            setDialogState(dialogState => ({
                ...dialogState,
                values: {
                    ...dialogState.values,
                    [event.target.name]: event.target.value.trim(),
                    name: ""
                },
                touched: {
                    ...dialogState.touched,
                    [event.target.name]: true
                }
            }));
            props.searchList({ id: props.user_id, search: event.target.value }, props.token);
        } else props.resetList();
    };

    const handleChange = event => {
        event.persist();
        setDialogState(dialogState => ({
            ...dialogState,
            values: {
                ...dialogState.values,
                [event.target.name]: event.target.value
            },
            touched: {
                ...dialogState.touched,
                [event.target.name]: true
            }
        }));
    };

    const option_market = [
        {
            value: "BUY",
            label: "Buy",
        },
        {
            value: "SELL",
            label: "Sell",
        },
    ];

    const hasError = field =>
        dialogState.touched[field] && dialogState.errors[field] ? true : false;

    const onClickSelected = (item) => {
        setDialogState(dialogState => ({
            ...dialogState,
            values: {
                ...dialogState.values,
                symbol: item.symbol,
                name: item.name
            },
        }));
        props.resetList();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <Translate value="new" />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Stock Entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Data Stock
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="symbol"
                        name="symbol"
                        required
                        label="Symbol"
                        type="text"
                        value={dialogState.values.symbol && dialogState.values.symbol.toLocaleUpperCase()}
                        onChange={handleChangeSymbol}
                        //fullWidth
                        sx={{ m: 1, width: '15ch' }}
                        variant="standard"
                        autoComplete="off"
                        error={hasError('symbol')}
                        helperText={
                            hasError('symbol') ? dialogState.errors.symbol[0] : null
                        }
                    />
                    {
                        dialogState.values.symbol.length > 0 && props.list.length > 0 && (< ListStockSelect list={props.list} onClickSelected={onClickSelected} />)
                    }

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label=" "
                        disabled
                        type="text"
                        value={dialogState.values.name}
                        //fullWidth
                        sx={{ m: 1, width: '35ch' }}
                        variant="standard"
                        autoComplete="off"
                    />
                    <div style={{ "flexDirection": "row", "display": "flex" }}>
                        <TextField
                            margin="dense"
                            id="quantity"
                            name="quantity"
                            required="true"
                            label="Quantity"
                            type="number"
                            min="1"
                            value={dialogState.values.quantity}
                            onChange={handleChange}
                            // fullWidth
                            sx={{ m: 1, width: '10ch' }}
                            variant="standard"
                        />
                        {"  "}
                        <TextField
                            //size="small"
                            margin="dense"
                            id="open_price"
                            name="open_price"
                            required="true"
                            label="Price"
                            type="number"
                            min="0.01"
                            step="0.01"
                            inputProps={{
                                step: 0.01,
                            }}
                            value={dialogState.values.open_price}
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
                            id="market"
                            name="market"
                            required="true"
                            label="Kind"
                            type="text"
                            onChange={handleChange}
                            // fullWidth
                            sx={{ m: 1, width: '10ch' }}
                            variant="standard"
                            select
                            // eslint-disable-next-line react/jsx-sort-props
                            SelectProps={{ native: true }}
                            value={dialogState.values.market}
                        >
                            <option key={"0"} value={"0"}>
                                {"Sell/Buy"}
                            </option>
                            {option_market.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <InputDate
                            id="open_at"
                            name="open_at"
                            required="true"
                            placeHolder={"Open at"}
                            label="Open At(dd/mm/yyyy)"
                            value={dialogState.values.open_at}
                            onChange={handleChange}
                            variant="lined"
                            min="1900-01-01"
                            max={new Date().toISOString().split('T')[0]}
                            disabled={false}
                        />
                    </div>
                    <Typography style={{
                        "paddingTop": "10px",
                    }}>
                        {" $ "}{(dialogState.values.quantity * dialogState.values.open_price).toFixed(2)}{" USD"}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        variant="outlined"><Translate value="cancel" /></Button>
                    <Button onClick={handleSaveShare}
                        variant="outlined"
                        disabled={!dialogState.isValid}
                    ><Translate value="save_share" /></Button>
                    <Button onClick={handleSave}
                        variant="outlined"
                        disabled={!dialogState.isValid}
                    >  <Translate value="save" /></Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function mapStateToProps(reducer) {
    //  console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        list: reducer.stock.list,
        error: reducer.stock.error,
        loading: reducer.stock.loading,
    };
}
const mapDispatchToProps = dispatch => ({
    newItem: (params, token) =>
        dispatch(actions.newItem({ params, token })),
    /////////////////////////////
    searchList: (params, token) =>
        dispatch(actions_stock.searchList({ params, token })),
    resetList: () =>
        dispatch(actions_stock.resetList({})),
    ////////////////////////////////
    loadListIndicator: (user_id, token) =>
        dispatch(actions_dashboard.loadListIndicator({ user_id, token })),
    /////////////////////////
    suscribeStock: (data) =>
        dispatch(actions_event.suscribeStock(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
