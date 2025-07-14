import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@material-ui/styles';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Avatar } from '@material-ui/core';
//import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PendingIcon from '@mui/icons-material/Pending';
import { connect } from "react-redux";
import * as actions from "redux/actions/pendingActions";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Translate, I18n } from "react-redux-i18n";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.success.main,
        height: 56,
        width: 56,
        marginRight: "10px"
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: theme.palette.success.dark
    },
    differenceValue: {
        color: theme.palette.success.dark,
        marginRight: theme.spacing(1)
    }
}));

function Note(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [values, setValues] = useState({
        text: (props.item && props.item.text) || ""
    });
    const handleClickOpen = () => {
        setOpen(true);
        setValues({
            ...values,
            text: (props.item && props.item.text) || ""
        });
    }

    const handleClose = () => {
        if (props.item && (props.item.text !== values.text)) {
            alertify.confirm(I18n.t("warning"), I18n.t("save_change") + "?",
                function () {
                    props.updateItem({
                        id: props.user_id,
                        text: values.text,
                        pending_id: props.item.id
                    }, props.token);
                    setOpen(false);
                },
                function () {
                    setOpen(false);
                });
        } else setOpen(false);

    }

    const handleSave = () => {
        if (values.text.length > 0) {
            props.updateItem({
                id: props.user_id,
                text: values.text,
                pending_id: props.item.id
            }, props.token);
            alertify.success("Success");
        }
        // setOpen(false);
    };

    useEffect(() => {
        props.loadItem({
            id: props.user_id,
            lang: props.lang
        }, props.token);
    }, []);

    const onChange = (event) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
        </Box>
    );

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <IconButton color="inherit" onClick={handleClickOpen} style={{
                "position": "fixed",
                "right": "0px",
                "bottom": "40px",
                //"borderRadius": "50%"
            }}>
                <PendingIcon />
            </IconButton>
            <Dialog open={open}
                onClose={handleClose}
                key={props.key}
                fullWidth={"true"}
                maxWidth={"md"}>
                <DialogTitle> Notas Pendientes</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                    </DialogContentText>
                    <div style={{}}>
                        <TextareaAutosize
                            // className="text_comment"
                            // minRows={10}
                            style={{
                                "height": "calc(100vh - 300px)",
                                "width": "100%",
                                "padding": "10px",
                                "fontFamily": "inherit",
                                "fontSize": "inherit"
                            }}
                            //maxRows={2}
                            placeholder={""}
                            //onBlur={props.onBlur}
                            //defaultValue=""
                            name="text"
                            onChange={onChange}
                            value={values.text}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        variant="outlined"
                    ><Translate value="exit" /></Button>
                    <Button onClick={handleSave}
                        variant="outlined"
                    // disabled={!values.isValid}
                    ><Translate value="save" /></Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

function mapStateToProps(reducer) {
    // console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        item: reducer.pending.item,

        lang: reducer.i18n.locale
    };
}
const mapDispatchToProps = dispatch => ({
    loadItem: (params, token) =>
        dispatch(actions.loadItem({ params, token })),
    updateItem: (params, token) =>
        dispatch(actions.updateItem({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
/**
 * index % 2 === 0 ? <InboxIcon /> : 
 */
