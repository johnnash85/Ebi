import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "redux/actions/knowledgeActions";
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
import MiniLoader from "components/MiniLoader";


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

    const [values, setValues] = useState({});

    const onClisk = (event) => {
        props.loadListScroll({
            id: props.user_id,
            index: props.pageCount,
            category_id: 1
        }, props.token)
    }

    return (
        <div style={{
            "height": "calc(100vh - 270px)"
        }}>
            <div style={{
                "overflowY": "auto",
                "height": "inherit"
            }}>
                {
                    props.list.map((item, index) => (
                        <div>
                            <div style={{ "whiteSpace": "pre-wrap" }}
                                dangerouslySetInnerHTML={{ __html: item.text }}
                            /> <br />
                        </div>
                    ))
                }
                {
                    props.pageSize === 1 && (
                        props.loadingMore ? (
                            <MiniLoader />
                        ) : (
                            <div style={{
                                "display": "flex",
                                "justifyContent": "center",
                                "padding": "10px"
                            }}>
                                <Button className="Link" onClick={onClisk}>
                                    <Translate value="load_more" />
                                </Button>
                            </div>
                        )
                    )
                }
            </div>
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

        list: reducer.knowledge.list,
        loading: reducer.knowledge.loading,
        error: reducer.knowledge.error,

        pageCount: reducer.knowledge.page_count,
        pageSize: reducer.knowledge.page_size,
        loadingMore: reducer.knowledge.loadingMore,
    };
}
const mapDispatchToProps = dispatch => ({
    loadList: (params, token) =>
        dispatch(actions.loadList({ params, token })),
    loadListScroll: (params, token) =>
        dispatch(actions.loadListScroll({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);