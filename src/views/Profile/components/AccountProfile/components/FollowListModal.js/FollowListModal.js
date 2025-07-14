import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Link as RouterLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { connect } from "react-redux";
import * as actions from "redux/actions/followerListActions";

function FollowItem(props) {
    return (
        <React.Fragment>
            <ListItem alignItems="flex-start"
                secondaryAction={
                    props.item.IsFollow ? (
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={props.onClickFollow}
                        >
                            {"Unfollow"}
                        </Button>
                    ) : (
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={props.onClickUnFollow}
                        >
                            {"Follow"}
                        </Button>
                    )
                }

            >
                <ListItemAvatar>
                    <Avatar alt="ava" src={props.item.avatar} sx={{ bgcolor: "#9f9898", width: 56, height: 56 }} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.item.username}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {props.item.username}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="" component="li" />
        </React.Fragment>
    )
}
const FormDialog = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        props.loadList({
            id: props.user_id,
            follower_id: props.item.id,
            kind: props.kind
        }, props.token);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} disabled={!props.disabled}>
                {props.button_label}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={"true"}
                maxWidth={"xs"}
            >
                <DialogTitle> {props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.subtitle}
                    </DialogContentText>
                    <Divider />
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 350,
                            '& ul': { padding: 0 },
                        }}
                    >
                        {
                            props.list.map((element) => {
                                return <FollowItem item={element} />
                            })
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
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

        auth: reducer.session.auth,

        list: reducer.followerList.list,

    };
}
const mapDispatchToProps = dispatch => ({
    loadList: (params, token) =>
        dispatch(actions.loadList({ params, token })),

});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
// <RouterLink to="#" style={{ textDecoration: "none", color: "black" }}>{props.item.username}</RouterLink>
/**
 *  <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
 */