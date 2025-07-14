import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Translate, I18n } from "react-redux-i18n";

const schema = {
    name: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 100
        }
    },
}

const FormDialog = (props) => {

    const [dialogState, setDialogState] = useState({
        values: {
            name: "",
            id: props.user_id,
        },
        errors: {},
        touched: {},
        isValid: false,
    });


    useEffect(() => {
        const errors = validate(dialogState.values, schema);
        setDialogState(dialogState => ({
            ...dialogState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [dialogState.values]);

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle> Name List</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Name List
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        required
                        label="Name"
                        type="text"
                        onChange={props.handleChange}
                        fullWidth
                        value={props.name}
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}
                        variant="outlined"
                    >  <Translate value="cancel" /></Button>
                    <Button onClick={props.handleSave}
                        disabled={props.isValid}
                        variant="outlined"
                    >
                        <Translate value="save" />
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialog;

/**
 *  <Button variant="text" onClick={handleClickOpen}>
                Add List
            </Button>
 */
