import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Edit from "@material-ui/icons/Edit";
import {
    IconButton
} from '@material-ui/core'
import { connect } from "react-redux";
import * as actions from "redux/actions/stockOrderActions";
import { Translate, I18n } from "react-redux-i18n";

const FormDialog = (props) => {

    const [open, setOpen] = React.useState(false);

    const [values, setValue] = useState({
        stock_id: props.item.id,
        reference: props.item.reference,
        id: props.user_id,
        symbol: props.item.symbol
    });

    const handleClickOpen = () => {
        setValue({
            stock_id: props.item.id,
            reference: props.item.reference,
            id: props.user_id,
            symbol: props.item.symbol
        });
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.updateReference(props.token, values);
        setOpen(false);
    };

    const handleChange = (event) => {
        event.persist();
        setValue(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    };


    return (
        <div style={{ "display": "inline" }}>
            <IconButton onClick={handleClickOpen} size="small">
                <Edit />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reference</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Description
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="reference"
                        name="reference"
                        required
                        label="Reference"
                        type="text"
                        onChange={handleChange}
                        fullWidth
                        value={values.reference}
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        variant="outlined"><Translate value="cancel" /></Button>
                    <Button onClick={handleSave}
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
    //  console.log(reducer);
    return {

        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

    };
}
const mapDispatchToProps = dispatch => ({
    updateReference: (token, params) =>
        dispatch(actions.updateReference({ token, params })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);

