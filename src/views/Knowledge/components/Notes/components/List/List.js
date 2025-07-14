import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "redux/actions/noteActions";
import { Translate, I18n } from "react-redux-i18n";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Avatar,
    Typography,
    Divider,
    IconButton,
    LinearProgress
} from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MiniLoader from "components/MiniLoader";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        marginTop: theme.spacing(2),
    },
}));

const List_ = (props) => {
    const classes = useStyles();
    const { className, history, ...rest } = props;

    // const [selectedIndex, setSelectedIndex] = React.useState(1);
    /*
        useEffect(() => {
            props.loadList({
                id: props.user_id,
                symbol: props.symbol
            }, props.token);
        }, props.item);
    */

    return (
        <div style={{// "height": "calc(100vh - 170px)" 
        }}>
            <div style={{
                // "overflowY": "auto",
                // "height": "inherit"
            }}>
                <List>
                    {
                        props.list.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { props.onClick(item) }}
                                        selected={props.item.id === item.id}>
                                        <ListItemText primary={item.title} />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))
                    }
                </List>
                {
                    props.pageSize === 25 && (
                        props.loadingMore ? (
                            <MiniLoader />
                        ) : (
                            <div style={{
                                "display": "flex",
                                "justifyContent": "center",
                                "padding": "10px"
                            }}>
                                <Button className="Link">
                                    <Translate value="load_more" />
                                </Button>
                            </div>
                        )
                    )
                }

            </div>
        </div >
    );
}
List_.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};

function mapStateToProps(reducer) {
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        list: reducer.note.list,
        loading: reducer.note.loading,
        error: reducer.note.error,

        item: reducer.note.item,

        pageCount: reducer.note.page_count,
        pageSize: reducer.note.page_size,
        loadingMore: reducer.note.loadingMore,
    };
}
const mapDispatchToProps = dispatch => ({
    loadList: (params, token) =>
        dispatch(actions.loadList({ params, token })),
    setItem: (item) =>
        dispatch(actions.setItem({ item })),
});

export default connect(mapStateToProps, mapDispatchToProps)(List_);