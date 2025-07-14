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
import TextareaAutosize from '@mui/base/TextareaAutosize';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        marginTop: theme.spacing(2),
    },
}));

const Body = (props) => {
    const classes = useStyles();
    const { className, history, ...rest } = props;
    //const [list, setList] = useState(props.list);

    //const [values, setValues] = useState({});

    // const onClickSend = (event) => {
    // }

    //useEffect(() => {
    // props.loadList({ id: props.user_id }, props.token);
    // }, props.text);
    // */

    return (

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
                onBlur={props.onBlur}
                //defaultValue=""
                name="text"
                onChange={props.onChange}
                value={props.text}
            />
        </div>

    );
}
Body.propTypes = {
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

        pageCount: reducer.note.page_count,
        pageSize: reducer.note.page_size,
        loadingMore: reducer.note.loadingMore,
    };
}
const mapDispatchToProps = dispatch => ({
    // loadList: (params, token) =>
    //     dispatch(actions.loadList({ params, token })),
    // loadListEarning: (params, token) =>
    //     dispatch(actions.loadListEarning({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);