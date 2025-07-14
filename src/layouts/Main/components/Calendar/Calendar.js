import * as React from 'react';
import { useEffect } from 'react';
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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { connect } from "react-redux";
import * as actions from "redux/actions/calendarActions";


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

function Calendar(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
        if (open) {
            props.loadList({
                id: props.user_id,
                lang: props.lang
            }, props.token);
        }
    };

    useEffect(() => {

    }, []);

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {props.list.map((item, index) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar className={classes.avatar}>
                                    <CalendarMonthIcon />
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={item.message}
                                secondary={
                                    <div style={{
                                        "flexDirection": "column",
                                        "display": "flex"
                                    }}>
                                        <span style={{
                                            "textOverflow": "ellipsis",
                                            "whiteSpace": "nowrap",
                                            "overflow": "hidden",
                                            "textAlign": "left",
                                            "fontWeight": "bold"
                                        }}>{item["name_" + props.lang]}</span>
                                        <span>{item.date_at}</span>
                                        <span>{item.day}</span>
                                    </div>
                                } />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Box>
    );

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <IconButton color="inherit" onClick={toggleDrawer("right", true)} style={{
                "position": "fixed",
                "right": "0px",
                "bottom": "0px",
                //"borderRadius": "50%"
            }}>
                <CalendarMonthIcon />
            </IconButton>
            <SwipeableDrawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer("right", true)}
            >
                {list("right")}
            </SwipeableDrawer>
        </Box>
    );
}

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        list: reducer.calendar.list,
        error: reducer.calendar.error,
        loading: reducer.calendar.loading,

        lang: reducer.i18n.locale
    };
}
const mapDispatchToProps = dispatch => ({
    loadList: (params, token) =>
        dispatch(actions.loadList({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
/**
 * index % 2 === 0 ? <InboxIcon /> : 
 */
