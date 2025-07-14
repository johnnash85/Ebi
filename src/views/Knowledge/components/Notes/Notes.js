import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import clsx from 'clsx';
import { List, Body } from "./components";
import { connect } from "react-redux";
import * as actions from "redux/actions/noteActions";
import { Translate, I18n } from "react-redux-i18n";
import { EntryModal } from './components';
//import Divider from '@mui/material/Divider';
import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    TableSortLabel,
    Link,
    IconButton,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: theme.spacing(3),
    },
    content: {
        // height: "calc(100vh - 300px)"
    },
}));

const Notes = (props) => {
    const classes = useStyles();
    const { className, history, ...rest } = props;
    const [values, setValues] = useState({
        text: (props.item && props.item.text) || ""
    });

    const handleClickSave = (event) => {
        if (values.text.length > 0)
            props.UpdateItem({
                id: props.user_id,
                text: values.text,
                note_id: props.item.id
            }, props.token);
        else
            props.removeItem({
                id: props.user_id,
                note_id: props.item.id
            }, props.token);
    }

    const onChange = (event) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const onBlur = (event) => {
        //console.log("blur");
        if (values.text.trim().length === 0)
            props.removeItem({
                id: props.user_id,
                note_id: props.item.id
            }, props.token);

        if (values.text.trim().length > 0 && values.text !== props.item.text)
            props.updateItemHide({
                id: props.user_id,
                text: values.text,
                note_id: props.item.id
            }, props.token);
    }

    const onClickSelect = (item) => {
        //console.log(props.item);
        //console.log(item);
        // if (item.id !== props.item.id) {
        //  console.log("selected");
        setValues(values => ({
            ...values,
            text: item.text
        }));
        props.setItem(item);

        // }

        /*if (props.item === {}) {
            setValues(values => ({
                ...values,
                text: item.text
            }));
            props.setItem(item);
        }*/
    }

    /*useEffect(() => {
        // props.loadList({ id: props.user_id }, props.token);
        setValues(values => ({
            ...values,
            text: (props.item && props.item.text) || ""
        }));
    }, props.item);*/

    // useEffect(() => {
    // props.list.length === 0 && props.loadList({ id: props.user_id }, props.token);
    /*  setValues({
          text: props.item.text
      });*/
    /* return function cleanup() {
         if (values.text.length > 0) {
             props.updateItem({
                 id: props.user_id,
                 text: values.text,
                 note_id: props.item.id
             }, props.token);
 
             setValues(values => ({
                 ...values,
                 text: ""
             }));
        
         /*else
             props.removeItem({
                 id: props.user_id,
                 note_id: props.item.id
             }, props.token);*/


    //  }; }
    // }, );

    const handleClickNew = (event) => {
        // event.preventDefault();
        props.newItem({
            title: "New Note",
            id: props.user_id,
        }, props.token);
    };

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Card
                    {...rest}
                    className={clsx(classes.root, className)}
                >
                    <CardHeader
                        action={
                            <div style={{ "display": "flex" }}>
                                <Button variant="outlined" onClick={handleClickNew} style={{ "marginRight": "10px" }}>
                                    <Translate value="new" />
                                </Button>
                            </div>
                        }
                        title={"Notas"}
                    />
                    <Divider />
                    <CardContent className={classes.content}>
                        <Grid
                            container
                            spacing={4}
                        >
                            <Grid
                                item
                                lg={3}
                                md={3}
                                xl={3}
                                xs={3}
                            >
                                <List onClick={onClickSelect} />
                            </Grid>

                            <Grid
                                item
                                lg={9}
                                md={9}
                                xl={9}
                                xs={9}
                            >
                                <Body onChange={onChange} text={values.text} onBlur={onBlur} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                </Card>
            </div>
        </div >
    );
};

Notes.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};

function mapStateToProps(reducer) {
    //console.log(reducer);    
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        list: reducer.note.list,
        loading: reducer.note.loading,
        error: reducer.note.error,

        item: reducer.note.item,
    };
}
const mapDispatchToProps = dispatch => ({
    UpdateItem: (params, token) =>
        dispatch(actions.updateItem({ params, token })),
    updateItemHide: (params, token) =>
        dispatch(actions.updateItemHide({ params, token })),
    loadList: (params, token) =>
        dispatch(actions.loadList({ params, token })),
    setItem: (item) =>
        dispatch(actions.setItem({ item })),
    newItem: (params, token) =>
        dispatch(actions.newItem({ params, token })),
    removeItem: (params, token) =>
        dispatch(actions.removeItem({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);

