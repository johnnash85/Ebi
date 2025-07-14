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
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { connect } from "react-redux";
import * as actions from "redux/actions/notificationActions";
import * as actions_comment from "redux/actions/commentActions";
import { Translate, I18n } from "react-redux-i18n";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';

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

function Notification(props) {
    const classes = useStyles();
    const { className, ...rest } = props;
    const history = useHistory();


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
            props.loadList({ id: props.user_id }, props.token);
        }
    };
    /*
        useEffect(() => {
    
        }, [props.notification]);
    */
    const onClick = (item) => {
        props.loadItem({ comment_id: item.aux_id, id: props.user_id }, props.token).then(() => {
            history.push('/comment');
        });

        // props.loadListComment({ id: props.user_id }, props.token);
    }

    //  <RouterLink to="/comment"> </RouterLink>

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

                        <ListItemButton onClick={() => { onClick(item) }}>

                            <ListItemIcon>
                                <Avatar className={classes.avatar}>
                                    <MailIcon />
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={<Translate value={item.message} />}
                                secondary={
                                    <div style={{
                                        "flexDirection": "column",
                                        "display": "flex"
                                    }}>
                                        <span style={{
                                            "textOverflow": "ellipsis",
                                            "whiteSpace": "nowrap",
                                            "overflow": "hidden",
                                            "textAlign": "left"
                                        }}>{item.detail}</span>
                                        <span>{item.created_at}</span>
                                    </div>
                                } />

                        </ListItemButton>

                    </ListItem>
                ))}
            </List>

        </Box>
    );

    return (
        <React.Fragment>
            <IconButton color="inherit" onClick={toggleDrawer("right", true)}>
                <Badge
                    badgeContent={(props.count === null) ? props.notification : props.count}
                    color="secondary"
                >
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <SwipeableDrawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer("right", true)}
            >
                {list("right")}
            </SwipeableDrawer>
        </React.Fragment>
    );
}

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        notification: reducer.session.auth.notification,
        count: reducer.notification.count,

        list: reducer.notification.list,
        error: reducer.notification.error,
        loading: reducer.notification.loading,
    };
}
const mapDispatchToProps = dispatch => ({
    loadList: (params, token) =>
        dispatch(actions.loadList({ params, token })),
    setCount: (count) =>
        dispatch(actions.setCount({ count })),
    ////////////////////
    loadItem: (params, token) =>
        dispatch(actions_comment.loadItem({ params, token })),
    //setItem: (item) =>
    //   dispatch(actions_comment.setItem({ item })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
/**
 * index % 2 === 0 ? <InboxIcon /> : 
 */
