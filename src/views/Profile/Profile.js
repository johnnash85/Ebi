import {
    Comments,
    AccountProfile,
} from './components';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from "react-redux";
import * as actions_profile from "redux/actions/profileActions";
import * as actions_comment from "redux/actions/commentActions";
import MarketWinLow from 'components/MarketWinLow';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Profile = (props) => {
    const classes = useStyles();
    const [list, setList] = useState({});

    useEffect(() => {
        const follower_id = props.match.params.follower_id;
        props.loadItem({
            id: props.user_id,
            follower_id: follower_id
        }, props.token);
        props.loadList({
            id: props.user_id,
            follower_id: follower_id
        }, props.token);
    }, list);

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                >
                    <div style={{}}>
                        <AccountProfile />
                        <Comments />
                    </div>
                </Grid>
                <Grid
                    item
                    lg={4}
                    md={6}
                    xl={3}
                    xs={12}
                >
                    <div style={{
                        "position": "fixed",
                        "width": "26%"
                    }}>
                        <div style={{}}>
                            <MarketWinLow />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>);

};

//export default Report;

function mapStateToProps(reducer) {
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,
    };
}

const mapDispatchToProps = dispatch => ({
    loadItem: (params, token) =>
        dispatch(actions_profile.loadItem({ params, token })),
    loadList: (params, token) =>
        dispatch(actions_comment.loadListProfile({ params, token })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);