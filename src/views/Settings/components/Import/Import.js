import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { Table, Toolbar } from "../../components";
import { connect } from "react-redux";
//import * as actions from "redux/actions/importActions";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        marginTop: theme.spacing(2),
    },
}));

const Import_ = (props) => {
    const classes = useStyles();
    const { className, history, ...rest } = props;
    const [list, setList] = useState(props.list);


    /*
        useEffect(() => {
          //  props.loadList(props.user_id, props.token);
        }, list);
    */
    return (
        <div >
            <Toolbar history={history} />
            <div className={classes.content}>
                <Table />
            </div>
        </div>
    );
};

Import_.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,
    };
}
const mapDispatchToProps = dispatch => ({
    //  loadList: (user_id, token) =>
    //      dispatch(actions.loadList({ user_id, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Import_);