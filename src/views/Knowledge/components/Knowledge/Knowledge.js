import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import clsx from 'clsx';
import { List, Body } from "./components";
import { connect } from "react-redux";
import * as actions_body from "redux/actions/knowledgeActions";
import * as actions_list from "redux/actions/knowledgeCategoryActions";
import { Translate, I18n } from "react-redux-i18n";

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

const Knowledge = (props) => {
    const classes = useStyles();
    const { className, history, ...rest } = props;
    const [values, setValues] = useState({
        text: (props.item && props.item.text) || ""
    });


    const onClickSelect = (item) => {
        if (item.id !== props.item.id) {
            setValues(values => ({
                ...values,
                text: item.text
            }));
            // props.setItem(item);
        }
    }

    useEffect(() => {
        props.loadList({
            id: props.user_id,
        }, props.token);
        props.loadBody({
            id: props.user_id,
            category_id: 1
        }, props.token);

    }, []);

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

                            </div>
                        }
                        title={"Knowledge"}
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
                                <Body />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                </Card>
            </div>
        </div >
    );
};

Knowledge.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};

function mapStateToProps(reducer) {
    //console.log(reducer);    
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        list: reducer.knowledge.list,
        loading: reducer.knowledge.loading,
        error: reducer.knowledge.error,

    };
}
const mapDispatchToProps = dispatch => ({

    loadList: (params, token) =>
        dispatch(actions_list.loadList({ params, token })),
    loadBody: (params, token) =>
        dispatch(actions_body.loadList({ params, token })),

});

export default connect(mapStateToProps, mapDispatchToProps)(Knowledge);