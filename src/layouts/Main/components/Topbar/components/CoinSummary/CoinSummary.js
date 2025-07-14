import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

const schema = {
    name: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 100
        }
    },
}

const FormDialog = (props) => {

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle> Summary Coin</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Incoming and outgoing coins
                    </DialogContentText>
                    <Divider />
                    <div style={{}}>
                        <div style={{ "display": "flex", "justifyContent": "space-between", "marginTop": "5px" }}>
                            <span> Incoming: </span> <span style={{ "fontWeight": "bold" }}>0</span>
                        </div>
                        <div style={{ "display": "flex", "justifyContent": "space-between", "marginTop": "5px" }}>
                            <span>Outgoing: </span> <span style={{ "fontWeight": "bold" }}>0</span>
                        </div>
                        <div style={{ "display": "flex", "justifyContent": "space-between", "marginTop": "5px" }}>
                            <span>Total: </span><span style={{ "fontWeight": "bold" }}>0</span>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Close</Button>
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
