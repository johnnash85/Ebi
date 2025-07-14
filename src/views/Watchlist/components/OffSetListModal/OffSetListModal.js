import React, { useState, useEffect } from 'react';
//import validate from 'validate.js';
//import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { Link as RouterLink } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import Delete from "@material-ui/icons/Delete";
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    IconButton,
} from '@material-ui/core'
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { connect } from "react-redux";
//import * as actions_watch from "redux/actions/watchStockActions";
//import * as actions_stock from "redux/actions/stockActions";
import * as actions_list from "redux/actions/watchListActions";

const useStyles = makeStyles((theme) => ({
    root: {},

    spacer: {
        flexGrow: 1,
    },
    importButton: {
        marginRight: theme.spacing(1),
    },
    exportButton: {
        marginRight: theme.spacing(1),
    },
    searchInput: {
        marginRight: theme.spacing(1),
    },
    row: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        padding: "10px"
    }
}));
const FormDialog = (props) => {
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
        // props.resetList();
    };

    const onClickRemove = (item) => {
        setOpen(false);
        props.removeItem({
            id: props.user_id,
            list_id: item.id
        }, props.token);
        // props.resetList();
    }

    return (
        <div>
            <IconButton variant="outlined" onClick={handleClickOpen}  >
                <SettingsIcon />
            </IconButton>
            <Dialog
                fullWidth={true}
                maxWidth={"xs"}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle> {"Select List"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"List must be empty"}
                    </DialogContentText>
                    <Divider />
                    <div style={{}}>
                        {
                            props.list.map((item) => (
                                <MenuItem key={item.id} value={item.id} className={classes.row} onClick={() => { onClickRemove(item) }}>
                                    <Typography variant="inherit" noWrap>
                                        {item.name}
                                    </Typography>
                                    <ListItemIcon>
                                        <Delete fontSize="small" />
                                    </ListItemIcon>
                                </MenuItem>
                            ))
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

//export default FormDialog;
function mapStateToProps(reducer) {
    //  console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        list: reducer.watchList.list,

    };
}
const mapDispatchToProps = dispatch => ({
    //   newItem: (params, token) =>
    //       dispatch(actions_watch.newItem({ params, token })),
    //   resetList: () =>
    //       dispatch(actions_stock.resetList({})),
    removeItem: (params, token) =>
        dispatch(actions_list.removeItem({ params, token })),

});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
/** .list.map((element) => {  sm md lg xl xs
                                return <WatchItem item={element} />
                                 <Button onClick={handleClose}>Add</Button>
                            }) */