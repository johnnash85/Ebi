import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
    Divider,
    Grid,
    IconButton
} from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import validate from 'validate.js';
import InputAdornment from '@mui/material/InputAdornment';
import { connect } from "react-redux";
import * as actions from "redux/actions/optionOrderActions";
import * as actions_stock from "redux/actions/stockActions";
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
    /*   market: {
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
       },*/
}

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

const FormDialog = (props) => {

    const [open, setOpen] = React.useState(false);

    const [dialogState, setDialogState] = useState({
        isValid: false,
        values: {
            symbol: "",
            name: "",
            open_at: new Date().toISOString().split('T')[0],
            id: props.user_id,
            reference: "",
            share: false,
            quantity: 1,
            expire_at: new Date().toISOString().split('T')[0],
            leg: [
                {
                    open_price: 0.01,
                    strike: 1,
                    market: "",
                    option_kind: "",
                    expire_at: new Date().toISOString().split('T')[0],
                    quantity: 1,
                }
            ]
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

    const handleClickOpen = () => {
        setOpen(true);
        setDialogState({
            isValid: false,
            values: {
                symbol: "",
                name: "",
                open_at: new Date().toISOString().split('T')[0],
                id: props.user_id,
                reference: "",
                share: false,
                quantity: 1,
                expire_at: new Date().toISOString().split('T')[0],
                leg: [
                    {
                        open_price: 0.01,
                        strike: 1,
                        market: "",
                        option_kind: "",
                        expire_at: new Date().toISOString().split('T')[0],
                        quantity: 1,
                    }
                ]
            },
            touched: {},
            errors: {}
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.newStrategy(dialogState.values, props.token);
        setOpen(false);
    };

    const handleSaveShare = (event) => {
        props.newStrategy({ ...dialogState.values, share: true }, props.token);
        setOpen(false);
    };

    const handleChange = (event) => {
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
        } else props.resetList();
    };

    const handleChangeLeg = (i, e) => {
        let leg = dialogState.values.leg;
        if (i === 0 && e.target.name === "expire_at") {
            for (let i = 0; i < leg.length; i++) {
                leg[i][e.target.name] = e.target.value;
            }
        } else
            leg[i][e.target.name] = e.target.value;

        setDialogState(dialogState => ({
            ...dialogState,
            values: {
                ...dialogState.values,
                leg: leg
            },
        }));
    };

    const handleChangeStrategy = (event) => {
        event.persist();
        setDialogState(dialogState => ({
            ...dialogState,
            values: {
                ...dialogState.values,
                [event.target.name]: event.target.value,
            },
        }));

        addLegStrategy(event.target.value);
    }

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

    /*const getLeg = (strategy) => {
        let leg = 0;
        option_strategy.forEach(element => {
            if (element.value === strategy)
                leg = element.leg;
        });
        return leg;
    }*/

    const addLegStrategy = (strategy) => {

        switch (strategy) {
            case "Calendar":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        leg: [
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "SELL",
                                option_kind: "",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            },
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "BUY",
                                option_kind: "",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            }
                        ],
                    },
                }));
                break;

            case "Diagonal":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        leg: [
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "SELL",
                                option_kind: "",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            },
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "BUY",
                                option_kind: "",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            }
                        ],
                    },
                }));
                break;

            case "Straddle":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        leg: [
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "SELL",
                                option_kind: "CALL",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            },
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "SELL",
                                option_kind: "CALL",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            }
                        ],
                    },
                }));
                break;

            case "IronCondor":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        leg: [
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "BUY",
                                option_kind: "CALL",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            },
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "SELL",
                                option_kind: "CALL",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            },
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "SELL",
                                option_kind: "PUT",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            },
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "BUY",
                                option_kind: "PUT",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            }
                        ],
                    },
                }));
                break;

            case "IronButterfly":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        leg: [
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "BUY",
                                option_kind: "CALL",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            },
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "SELL",
                                option_kind: "CALL",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            },
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "BUY",
                                option_kind: "CALL",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            },

                        ],
                    },
                }));
                break;

            case "CallCreditSpread":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        leg: [
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "BUY",
                                option_kind: "CALL",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            },
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "SELL",
                                option_kind: "CALL",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            }
                        ],
                    },
                }));
                break;

            case "PutCreditSpread":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        leg: [
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "BUY",
                                option_kind: "PUT",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            },
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "SELL",
                                option_kind: "PUT",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            }
                        ],
                    },
                }));
                break;

            case "CallDebitSpread":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        leg: [
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "SELL",
                                option_kind: "CALL",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            },
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "BUY",
                                option_kind: "CALL",
                                expire_at: dialogState.values.expire_at,
                                quantity: dialogState.values.quantity,
                            }
                        ],
                    },
                }));
                break;

            case "PutDebitSpread":
                setDialogState(dialogState => ({
                    ...dialogState,
                    values: {
                        ...dialogState.values,
                        leg: [
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "SELL",
                                option_kind: "PUT",
                                expire_at: dialogState.values.expire_at,
                                quantity: "1",
                            },
                            {
                                open_price: 0.01,
                                strike: 1,
                                market: "BUY",
                                option_kind: "PUT",
                                expire_at: dialogState.values.expire_at,
                                quantity: "1",
                            }
                        ],
                    },
                }));
                break;

            default: break;
        }
    }

    const handleAdd = (event) => {
        if (dialogState.values.leg.length < 4)
            setDialogState(dialogState => ({
                ...dialogState,
                values: {
                    ...dialogState.values,
                    leg: [
                        ...dialogState.values.leg,
                        {
                            quantity: 1,
                            open_price: 0.01,
                            strike: 1,
                            market: "",
                            option_kind: "",
                            expire_at: new Date().toISOString().split('T')[0],
                        }
                    ],
                },
            }));
    };

    const handleRemove = (i) => {
        let leg = dialogState.values.leg;
        leg.splice(i, 1);
        setDialogState(dialogState => ({
            ...dialogState,
            values: {
                ...dialogState.values,
                leg: leg,
            },
        }));
    }
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

    const option_strategy =
        [
            {
                value: "Calendar",//hay Put y Call
                label: "Calendar",
                leg: 2
            },
            {
                value: "Diagonal",
                label: "Diagonal",
                leg: 2
            },
            {
                value: "Straddle",
                label: "Straddle",
                leg: 2
            },
            {
                value: "Strangle",//hay call y put
                label: "Strangle",
                leg: 2
            },
            {
                value: "IronCondor",
                label: "IronCondor",
                leg: 4
            },
            {
                value: "IronButterfly",
                label: "IronButterfly",
                leg: 4
            },

            {
                value: "CallCreditSpread",
                label: "CallCreditSpread",
                leg: 2
            },
            {
                value: "PutCreditSpread",
                label: "PutCreditSpread",
                leg: 2
            },
            {
                value: "CallDebitSpread",
                label: "CallDebitSpread",
                leg: 2
            },
            {
                value: "PutDebitSpread",
                label: "PutDebitSpread",
                leg: 2
            },
            {
                value: "Another",
                label: "Another",
                leg: 1
            },
        ];

    const hasError = field =>
        dialogState.touched[field] && dialogState.errors[field] ? true : false;

    return (
        <div style={{
            "paddingInlineEnd": "10px"
        }}>
            <Button variant="outlined" onClick={handleClickOpen}>

                <Translate value="strategy" />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={"true"}
                maxWidth={"md"}
            >
                <DialogTitle> Option Strategy Entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Data Option Strategy
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="symbol"
                        name="symbol"
                        required="true"
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
                        {
                            dialogState.values.leg.map((element, index) => (
                                <div style={{
                                    "display": "flex",
                                    "width": "100%",
                                    "justifyContent": "space-between",
                                }} >

                                    <TextField
                                        margin="dense"
                                        id="quantity"
                                        name="quantity"
                                        required="true"
                                        label="Quantity"
                                        type="number"
                                        min="1"
                                        value={element.quantity || ""}
                                        onChange={e => handleChangeLeg(index, e)}
                                        // fullWidth
                                        sx={{ m: 1, width: '10ch' }}
                                        variant="standard"
                                    />
                                    {"  "}
                                    <TextField
                                        margin="dense"
                                        id="market"
                                        name="market"
                                        required="true"
                                        label="Kind market"
                                        type="text"
                                        onChange={e => handleChangeLeg(index, e)}
                                        // fullWidth
                                        sx={{ m: 1, width: '10ch' }}
                                        variant="standard"
                                        select
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={element.market || ""}
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
                                    {"  "}
                                    <TextField
                                        margin="dense"
                                        id="option_kind"
                                        name="option_kind"
                                        required="true"
                                        label="Kind option"
                                        type="text"
                                        onChange={e => handleChangeLeg(index, e)}
                                        // fullWidth
                                        sx={{ m: 1, width: '10ch' }}
                                        variant="standard"
                                        select
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={element.option_kind || ""}
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
                                    {"  "}
                                    <TextField
                                        margin="dense"
                                        id="expire_at"
                                        name="expire_at"
                                        required="true"
                                        label="Expire At(dd/mm/yyyy)"
                                        type="date"
                                        value={element.expire_at || ""}
                                        onChange={e => handleChangeLeg(index, e)}
                                        variant="standard"
                                    />
                                    {" "}
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
                                        value={element.strike || 1}
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
                                        label="Premiun/Debit"
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        inputProps={{
                                            step: 0.01,
                                        }}
                                        value={element.open_price || 0.01}
                                        onChange={e => handleChangeLeg(index, e)}
                                        // fullWidth
                                        sx={{ m: 1, width: '10ch' }}
                                        variant="standard"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                    />
                                    {"  "}
                                    <IconButton onClick={() => handleRemove(index)} style={{
                                    }}><DeleteIcon />
                                    </IconButton>
                                </div>
                            ))
                        }
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
                    <Button onClick={handleAdd}
                        variant="outlined"
                    ><Translate value="add_leg" /></Button>
                    <Button onClick={handleClose}
                        variant="outlined"
                    ><Translate value="cancel" /></Button>
                    <Button onClick={handleSaveShare}
                        variant="outlined"
                        disabled={!dialogState.isValid}
                    ><Translate value="save_share" /></Button>
                    <Button onClick={handleSave}
                        variant="outlined"
                        disabled={!dialogState.isValid}>
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

        item: {},

        list: reducer.stock.list,
        error: reducer.stock.error,
        loading: reducer.stock.loading,

    };
}
const mapDispatchToProps = dispatch => ({
    newStrategy: (params, token) =>
        dispatch(actions.newStrategy({ params, token })),
    searchList: (params, token) =>
        dispatch(actions_stock.searchList({ params, token })),
    resetList: () =>
        dispatch(actions_stock.resetList({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);


/**
 *   <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                    </div>
 *  <div>
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
                                margin="dense"
                                id="expire_at"
                                name="expire_at"
                                required="true"
                                label="Expire Date "
                                type="date"
                                value={dialogState.values.expire_at || ""}
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
 */