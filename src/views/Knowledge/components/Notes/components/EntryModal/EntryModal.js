import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { connect } from "react-redux";
import * as actions from "redux/actions/noteActions";
import { Translate, I18n } from "react-redux-i18n";

const FormDialog = (props) => {

    const [dialogState, setDialogState] = useState({
        values: {
            title: "",
            id: props.user_id,
        },
        isValid: false,
    });

    const [open, setOpen] = React.useState(false);

    useEffect(() => {

        setDialogState(dialogState => ({
            ...dialogState,
            isValid: dialogState.values.title.length === 0
        }));
    }, [dialogState.values]);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        event.persist();
        setDialogState(dialogState => ({
            ...dialogState,
            values: {
                ...dialogState.values,
                [event.target.name]: event.target.value
            },
        }));
    }

    const handleSave = (event) => {
        // event.preventDefault();
        if (dialogState.values.title === "") {
            return;
        }
        props.newItem(dialogState.values, props.token);
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <Translate value="new" />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Title Note</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Title Note
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        required
                        label="Title"
                        type="text"
                        onChange={handleChange}
                        fullWidth
                        value={dialogState.values.title}
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        variant="outlined"><Translate value="cancel" /></Button>
                    <Button onClick={handleSave}
                        disabled={dialogState.isValid}
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