import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { connect } from "react-redux";
import * as actions from "redux/actions/optionOrderActions";
import * as actions_dashboard from "redux/actions/dashboardActions";
import { Translate, I18n } from "react-redux-i18n";
import InputDate from 'components/InputDate';
import { loadListEarning } from 'redux/actions/discoverActions';

function getCloseAt(expire_at) {
    if (expire_at && new Date(expire_at) < new Date())
        return new Date(expire_at).toISOString().split('T')[0];

    return new Date().toISOString().split('T')[0];
}
const FormDialog = props => {

    const { item, ...rest } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setValues({
            close_price: props.price || Math.abs(item.close_price) || 0.01,
            open_price: item.open_price || 0.01,
            option_id: item.id,
            close_at: getCloseAt(props.item.expire_at),// 
            symbol: item.symbol,
            id: props.user_id,
            quantity: item.quantity,
            market: item.market === 'BUY' ? 'STC' : 'BTC',
            //total: item.open_price,
            strike: item.strike,
            option_kind: item.option_kind,
            quantity_tmp: item.quantity,
            isValid: true
        });
        if (item.sub_order.length > 1) {
            setStrategy({
                ...strategy,
                leg: item.sub_order,
                symbol: item.sub_order.length > 1 && item.sub_order[0].symbol,
            });
            // let leg = item.sub_order;
            // for (let i = 0; i < item.sub_order.length; i++) {
            //     leg[i].close_price= props.price || Math.abs(item.open_price) || 0.01;
            // }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [values, setValues] = useState({
        close_price: props.price || Math.abs(item.close_price) || 0.01,
        open_price: item.open_price || 0.01,
        option_id: item.id,
        close_at: getCloseAt(props.item.expire_at),// 
        symbol: item.symbol,
        id: props.user_id,
        quantity: item.quantity,
        market: item.market === 'BUY' ? 'STC' : 'BTC',
        //total: item.open_price,
        strike: item.strike,
        option_kind: item.option_kind,
        quantity_tmp: item.quantity,
        isValid: true
    });

    const [strategy, setStrategy] = useState({
        symbol: item.sub_order.length > 1 && item.sub_order[0].symbol,
        name: "",
        id: props.user_id,
        share: false,
        leg: item.sub_order
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
    }, [item]);

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value,

        }));
    };

    const handleSave = () => {
        if (item.sub_order.length > 1)
            props.updateStrategy(strategy, props.token);
        else
            props.updateItem(values, props.token);

        props.loadListIndicator(props.user_id, props.token);
        setOpen(false);
    };

    const handleSaveShare = (event) => {
        if (item.sub_order.length > 1)
            props.updateStrategy({ ...strategy, share: true }, props.token);
        else
            props.updateItem({ ...values, share: true }, props.token);

        setOpen(false);
    };

    const handleChangeLeg = (i, e) => {
        let leg = strategy.leg;
        if (i === 0 && e.target.name === "close_at") {
            for (let i = 0; i < leg.length; i++) {
                leg[i][e.target.name] = e.target.value;
            }
        } else
            leg[i][e.target.name] = e.target.value;
        setStrategy(strategy => ({
            ...strategy,
            leg: leg
        }));
    }

    return (
        <div style={{ "display": "inline" }}>
            <Button
                color="primary"
                size="small"
                variant="contained"
                onClick={handleClickOpen}>
                <Translate value="close" />
            </Button>
            <Dialog open={open} onClose={handleClose} key={props.key}>
                <DialogTitle> Option Close {item.symbol}</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Enter Data Option - Strike {item.strike}
                    </DialogContentText>
                    {
                        (item.sub_order.length > 1) ?
                            (
                                strategy.leg.map((element, index) => (
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
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                        />
                                        {"  "}
                                        <TextField
                                            margin="dense"
                                            id="option_kind"
                                            name="option_kind"
                                            // required="true"
                                            label="Kind Option"
                                            type="text"
                                            value={element.option_kind}
                                            // onChange={e => handleChangeLeg(index, e)}
                                            // fullWidth
                                            disabled={true}
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                        />
                                        {"  "}
                                        <TextField
                                            margin="dense"
                                            id="strike"
                                            name="strike"
                                            // required="true"
                                            label="Strike"
                                            type="number"
                                            min="1"
                                            value={element.strike}
                                            onChange={e => handleChangeLeg(index, e)}
                                            // fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                            disabled={true}
                                        />
                                        {"  "}
                                        <TextField
                                            margin="dense"
                                            id="market"
                                            name="market"
                                            //required="true"
                                            label="Kind market"
                                            type="text"
                                            //onChange={handleChange}
                                            // fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                            disabled={true}
                                            value={element.market === 'BUY' ? 'STC' : 'BTC'}
                                        />
                                        {"  "}
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="close_price"
                                            name="close_price"
                                            label="Trade Price"
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            inputProps={{
                                                step: 0.01,
                                            }}
                                            // fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            value={element.close_price || Math.abs(element.open_price)}
                                            variant="standard"
                                            onChange={e => handleChangeLeg(index, e)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                        />
                                        <InputDate
                                            id="close_at"
                                            name="close_at"
                                            required="true"
                                            placeHolder={"Close At"}
                                            label="Close At(dd/mm/yyyy)"
                                            value={element.close_at || new Date().toISOString().split('T')[0]}
                                            onChange={e => handleChangeLeg(index, e)}
                                            variant="lined"
                                            min="1900-01-01"
                                            max={new Date().toISOString().split('T')[0]}
                                            disabled={false}
                                        />
                                    </div>
                                ))
                            )
                            :
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
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                        />
                                        {"  "}
                                        <TextField
                                            margin="dense"
                                            id="option_kind"
                                            name="option_kind"
                                            required="true"
                                            label="Kind Option"
                                            type="text"
                                            value={values.option_kind}
                                            // onChange={e => handleChangeLeg(index, e)}
                                            // fullWidth
                                            disabled={true}
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                        />
                                        {"  "}
                                        <TextField
                                            margin="dense"
                                            id="strike"
                                            name="strike"
                                            // required="true"
                                            label="Strike"
                                            type="number"
                                            min="1"
                                            value={values.strike}
                                            onChange={handleChange}
                                            // fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                            disabled={true}
                                        />
                                        {"  "}
                                        <TextField
                                            margin="dense"
                                            id="market"
                                            name="market"
                                            //required="true"
                                            label="Kind market"
                                            type="text"
                                            //onChange={handleChange}
                                            // fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            variant="standard"
                                            disabled={true}
                                            value={values.market}
                                        />
                                        {"  "}
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="close_price"
                                            name="close_price"
                                            label="Trade Price"
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            inputProps={{
                                                step: 0.01,
                                            }}
                                            // fullWidth
                                            sx={{ m: 1, width: '10ch' }}
                                            value={values.close_price}
                                            variant="standard"
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                        />
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
                                    <Typography style={{
                                        "paddingTop": "10px",
                                    }}>
                                        {(values.quantity * parseFloat(values.close_price) * 100).toFixed(2)} {"USD. P/L = " + ((values.open_price + (values.market === "BUY" ? - parseFloat(values.close_price) : parseFloat(values.close_price))) * 100 * values.quantity).toFixed(2)}
                                    </Typography>
                                </React.Fragment>
                            )
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        variant="outlined"
                    ><Translate value="cancel" /></Button>
                    <Button onClick={handleSaveShare}
                        variant="outlined"
                        disabled={!values.isValid}
                    ><Translate value="save_share" /></Button>
                    <Button onClick={handleSave}
                        variant="outlined"
                        disabled={!values.isValid}
                    ><Translate value="save" /></Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

FormDialog.propTypes = {
    item: PropTypes.object
};

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

    };
}
const mapDispatchToProps = dispatch => ({
    updateItem: (params, token) =>
        dispatch(actions.updateItem({ params, token })),
    updateStrategy: (params, token) =>
        dispatch(actions.updateStrategy({ params, token })),
    //////////////////////////////
    loadListIndicator: (user_id, token) =>
        dispatch(actions_dashboard.loadListIndicator({ user_id, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);