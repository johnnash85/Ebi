import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { connect } from "react-redux";
import * as actions from "redux/actions/balanceActions";
import { Translate, I18n } from "react-redux-i18n";

//function FormDialog() {
const FormDialog = (props) => {
    // const { className, history, ...rest } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setValues({
            value: 1.00,
            kind: "DEBIT",
            id: props.user_id
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.newItem(values, props.token);
        setOpen(false);
    };

    const [values, setValues] = useState({
        value: 1.00,//props.item.price ||
        kind: "DEBIT",
        //open_at: new Date().toISOString().split('T')[0],//props.item.open_at || 
        id: props.user_id
    });


    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div style={{ "display": "inline" }}>
            <Button color="primary"
                variant="contained"
                size="big"
                onClick={handleClickOpen}>
                <Translate value="withdrawal" />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>  <Translate value="withdrawal" /></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Value
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="value"
                        name="value"
                        required="true"
                        label="Value"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={values.value}
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
