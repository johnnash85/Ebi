import {
    Fundamental,
    StockProfile,
    News,
    Indicator,
    Strategy
} from './components';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from "react-redux";
import * as actions_stock from "redux/actions/stockActions";
import * as actions_news from "redux/actions/stockNewsActions";
import Chart from 'components/Chart';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Stock = (props) => {
    const classes = useStyles();
    const [list, setList] = useState({});

    useEffect(() => {
        // console.log("entra");
        props.loadItem({
            id: props.user_id,
            symbol: props.match.params.ticker
        }, props.token);

        props.loadList({
            id: props.user_id,
            symbol: props.match.params.ticker
        }, props.token);

        props.loadIndicator({
            id: props.user_id,
            symbol: props.match.params.ticker
        }, props.token);

        props.loadStrategy({
            id: props.user_id,
            symbol: props.match.params.ticker
        }, props.token);

    }, [props.match.params.ticker]);

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
                    xl={8}
                    xs={12}
                >
                    <StockProfile />
                    <Indicator />
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
                            <Chart title="SPX500" price="3929,00" />
                            <Strategy />
                        </div>
                    </div>
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={8}
                    xs={12}
                >
                    <Fundamental />
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={8}
                    xs={12}
                > <News />
                </Grid>

            </Grid>
        </div>);
};

function mapStateToProps(reducer) {
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        item: reducer.stock.item
    };
}

const mapDispatchToProps = dispatch => ({
    loadItem: (params, token) =>
        dispatch(actions_stock.loadItem({ params, token })),

    loadList: (params, token) =>
        dispatch(actions_news.loadList({ params, token })),
    loadIndicator: (params, token) =>
        dispatch(actions_news.loadIndicator({ params, token })),
    loadStrategy: (params, token) =>
        dispatch(actions_news.loadStrategy({ params, token })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Stock);