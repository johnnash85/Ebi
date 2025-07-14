import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { connect } from "react-redux";
import * as actions from "redux/actions/stockActions";
import { Translate, I18n } from "react-redux-i18n";

//function FormDialog() {
const FormDialog = (props) => {
    // const { className, history, ...rest } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.newItem(values, props.token);
        setOpen(false);
    };

    const [values, setValues] = useState({
        symbol: props.item.symbol,
        operator: "",//props.item.quantity ||
        price: 0.01,//props.item.price ||
        open_at: new Date().toISOString().split('T')[0],//props.item.open_at || 
        id: props.user_id
    });


    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
    const option_operator = [
        {
            value: "<",
            label: "<",
        },
        {
            value: ">",
            label: ">",
        },
    ];

    return (
        <div style={{ "display": "inline" }}>
            <Button color="primary"
                variant="contained"
                size="small"
                onClick={handleClickOpen}>
                Alert
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Alert Stock Price Entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Data Alert
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="symbol"
                        name="symbol"
                        required="true"
                        label="Symbol"
                        type="text"
                        value={values.symbol}
                        onChange={handleChange}
                        //fullWidth
                        disabled
                        variant="standard"
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
                        variant="standard"
                        select
                        // eslint-disable-next-line react/jsx-sort-props
                        SelectProps={{ native: true }}
                        value={values.market}
                    >
                        <option key={"0"} value={"0"}>
                            {"Select operator"}
                        </option>
                        {option_operator.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    {"  "}
                    <TextField

                        margin="dense"
                        id="price"
                        name="price"
                        required="true"
                        label="Price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={values.price}
                        onChange={handleChange}
                        // fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">  <Translate value="cancel" /></Button>
                    <Button onClick={handleSave} variant="outlined">  <Translate value="save" /></Button>
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

    };
}
const mapDispatchToProps = dispatch => ({
    newItem: (params, token) =>
        dispatch(actions.newItem({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
