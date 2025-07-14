import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { TableDividend, TableEarning } from "./components";
import Tabs from "components/Tabs";
import { connect } from "react-redux";
import * as actions from "redux/actions/discoverActions";
import { Translate, I18n } from "react-redux-i18n";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        marginTop: theme.spacing(2),
    },
}));

const Discover = (props) => {
    const classes = useStyles();
    const { className, history, ...rest } = props;
    const [list, setList] = useState(props.list);

    return (
        <div className={classes.root}>

            <div className={classes.content}>
                <Tabs>
                    <div label={I18n.t("dividend")} className="col-12">
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xl={12}
                            xs={12}
                        >
                            <TableDividend list={props.list} />
                        </Grid>
                    </div>
                    <div label={I18n.t("earnings")} className="col-12">
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xl={12}
                            xs={12}
                        >
                            <TableEarning list={props.list} />
                        </Grid>
                    </div>
                </Tabs>

            </div>
        </div>
    );
};

Discover.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};

function mapStateToProps(reducer) {
    //console.log(reducer);  <Toolbar history={history} />
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        list: reducer.discover.list,
        error: reducer.discover.error,
        loading: reducer.discover.loading,

        // search: reducer.history.search,
    };
}
const mapDispatchToProps = dispatch => ({
    loadListDividend: (params, token) =>
        dispatch(actions.loadListDividend({ params, token })),
    loadListEarning: (params, token) =>
        dispatch(actions.loadListEarning({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);