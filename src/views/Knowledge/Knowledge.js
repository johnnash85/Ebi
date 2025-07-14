import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { Notes, Knowledge as Knowledge_ } from "./components";
import Tabs from "components/Tabs";
import { connect } from "react-redux";
import * as actions from "redux/actions/noteActions";
import { Translate, I18n } from "react-redux-i18n";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    content: {
        //   marginTop: theme.spacing(2),
    },
}));

const Knowledge = (props) => {
    const classes = useStyles();
    const { className, history, ...rest } = props;
    //const [list, setList] = useState(props.list);

    useEffect(() => {
        props.loadList({ id: props.user_id }, props.token);
    }, []);


    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Tabs>
                    <div label={I18n.t("notes")} className="col-12">
                        <Notes />
                    </div>
                    <div label={I18n.t("knowledge")} className="col-12">
                        <Knowledge_ />
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

Knowledge.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};

function mapStateToProps(reducer) {
    //console.log(reducer);  <Toolbar history={history} />
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        list: reducer.note.list,
        loading: reducer.note.loading,
        error: reducer.note.error,

        // search: reducer.history.search,
    };
}
const mapDispatchToProps = dispatch => ({
    loadList: (params, token) =>
        dispatch(actions.loadList({ params, token })),
    // loadListEarning: (params, token) =>
    //     dispatch(actions.loadListEarning({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Knowledge);