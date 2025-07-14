import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
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
import * as actions_stock from "redux/actions/stockActions";
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
    market: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 50
        }
    },
    option_kind: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 50
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
                quantity: 1,
                open_price: 0.01,
                strike: 1,
                open_at: new Date().toISOString().split('T')[0],
                expire_at: new Date().toISOString().split('T')[0],
                id: props.user_id,
                share: false,
                name: "",
                symbol: "",
                reference: "",
                option_kind: "",
                market: ""
            },
            touched: {},
            errors: {}
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (event) => {
        event.preventDefault();
        if (dialogState.values.symbol === "") {

            return;
        }
        props.newItem(dialogState.values, props.token);
        props.suscribeOption(dialogState.values);
        setOpen(false);
    };

    const handleSaveShare = (event) => {
        event.preventDefault();
        if (dialogState.values.symbol === "") {

            return;
        }
        props.newItem({ ...dialogState.values, share: true }, props.token);
        props.suscribeOption(dialogState.values);
        setOpen(false);
    };

    const [dialogState, setDialogState] = useState({
        isValid: false,
        values: {
            quantity: 1,
            open_price: 0.01,
            strike: 1,
            open_at: new Date().toISOString().split('T')[0],
            expire_at: new Date().toISOString().split('T')[0],
            id: props.user_id,
            share: false,
            name: "",
            symbol: "",
            reference: "",
            option_kind: "",
            market: ""
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
        }
        else props.resetList();
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

    const option_market = [
        {
            value: "SELL",
            label: "STO",
        },
        {
            value: "BUY",
            label: "BTO",
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

    const handleChangeStrategy = (event) => {
        event.persist();

        switch (event.target.value) {
            case "CoveredCall":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        [event.target.name]: event.target.value,
                        market: "SELL",
                        option_kind: "CALL"
                    },
                }));
                break;

            case "CoveredPut":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        [event.target.name]: event.target.value,
                        market: "SELL",
                        option_kind: "PUT"
                    },
                }));
                break;

            case "NakedCall":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        [event.target.name]: event.target.value,
                        market: "SELL",
                        option_kind: "CALL"
                    },
                }));
                break;

            case "NakedPut":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        [event.target.name]: event.target.value,
                        market: "SELL",
                        option_kind: "PUT"
                    },
                }));
                break;
            default: {
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        [event.target.name]: event.target.value,
                    },
                }));
            } break;
        };
    }

    const option_strategy =
        [
            {
                value: "CoveredCall",
                label: "CoveredCall",
            },
            {
                value: "CoveredPut",
                label: "CoveredPut",
            },
            {
                value: "NakedCall",
                label: "NakedCall",
            },
            {
                value: "NakedPut",
                label: "NakedPut",
            },
            {
                value: "Another",
                label: "Another",
            },
        ];

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <Translate value="new" />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={"true"}
                maxWidth={"md"}
            >
                <DialogTitle> Option Entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Data Option
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="symbol"
                        name="symbol"
                        required
                        label="Symbol"
                        type="text"
                        onChange={handleChangeSymbol}
                        //fullWidth
                        sx={{ m: 1, width: '15ch' }}
                        autoComplete="off"
                        value={dialogState.values.symbol && dialogState.values.symbol.toLocaleUpperCase()}
                        variant="standard"
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
                        sx={{ m: 1, width: '47ch' }}
                        variant="standard"
                        autoComplete="off"
                    />
                    <TextField
                        margin="dense"
                        id="reference"
                        name="reference"
                        // required="true"
                        label="Strategy"
                        type="text"
                        onChange={handleChangeStrategy}
                        // fullWidth
                        sx={{ m: 1, width: '17ch' }}
                        variant="standard"
                        select
                        // eslint-disable-next-line react/jsx-sort-props
                        SelectProps={{ native: true }}
                        value={dialogState.values.reference}
                    >
                        <option key={"0"} value={"0"}>
                            {"Select Strategy"}
                        </option>
                        {option_strategy.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <div style={{
                        "padding": "10px"
                    }}  >
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
                            sx={{ m: 1, width: '7ch' }}
                            variant="standard"
                        />

                        <TextField
                            margin="dense"
                            id="market"
                            name="market"
                            required="true"
                            label="Kind market"
                            type="text"
                            onChange={handleChange}
                            // fullWidth
                            sx={{ m: 1, width: '12ch' }}
                            variant="standard"
                            select
                            // eslint-disable-next-line react/jsx-sort-props
                            SelectProps={{ native: true }}
                            value={dialogState.values.market}
                        >
                            <option key={"0"} value={"0"}>
                                {"STO/BTO"}
                            </option>
                            {option_market.map((option) => (
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
                            label="Kind Option"
                            type="text"
                            onChange={handleChange}
                            // fullWidth
                            sx={{ m: 1, width: '12ch' }}
                            variant="standard"
                            select
                            // eslint-disable-next-line react/jsx-sort-props
                            SelectProps={{ native: true }}
                            value={dialogState.values.option_kind}
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
                            value={dialogState.values.strike}
                            onChange={handleChange}
                            // fullWidth
                            sx={{ m: 1, width: '15ch' }}
                            variant="standard"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />

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
                            value={dialogState.values.open_price}
                            onChange={handleChange}
                            // fullWidth
                            sx={{ m: 1, width: '15ch' }}
                            variant="standard"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="expire_at"
                            name="expire_at"
                            required="true"
                            label="Expire At(dd/mm/yyyy)"
                            type="date"
                            value={dialogState.values.expire_at}
                            onChange={handleChange}
                            variant="standard"
                        />
                    </div>
                    <InputDate
                        id="open_at"
                        name="open_at"
                        required="true"
                        placeHolder={"Open At"}
                        label="Open At(dd/mm/yyyy)"
                        value={dialogState.values.open_at}
                        onChange={handleChange}
                        variant="lined"
                        min="1900-01-01"
                        max={new Date().toISOString().split('T')[0]}
                        disabled={false}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        variant="outlined"
                    ><Translate value="cancel" /></Button>
                    <Button onClick={handleSaveShare}
                        disabled={!dialogState.isValid}
                        variant="outlined"
                    ><Translate value="save_share" /></Button>
                    <Button onClick={handleSave}
                        disabled={!dialogState.isValid}
                        variant="outlined"
                    >
                        <Translate value="save" />
                    </Button>
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

        list: reducer.stock.list,
        error: reducer.stock.error,
        loading: reducer.stock.loading,
    };
}
const mapDispatchToProps = dispatch => ({
    newItem: (params, token) =>
        dispatch(actions.newItem({ params, token })),
    /////////
    searchList: (params, token) =>
        dispatch(actions_stock.searchList({ params, token })),
    resetList: () =>
        dispatch(actions_stock.resetList({})),
    ///////////////
    suscribeOption: (data) =>
        dispatch(actions_event.suscribeOption(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
