import {
    Comments,
    // StockSummary,
    // LatestSales,
} from './components';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from "react-redux";
import Card from '@mui/material/Card';
import Indicator from 'components/Indicator';
import MarketWinLow from 'components/MarketWinLow';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Comment = (props) => {
    const classes = useStyles();
    const [list, setList] = useState({});

    useEffect(() => {
        // props.loadList(props.user_id, props.token);
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
                    xl={8}
                    xs={12}
                >
                    <Comments />
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
    // loadList: (user_id, token) =>
    //   dispatch(actions.loadListLatesroi({ user_id, token })), <StockCategory />
});
export default connect(mapStateToProps, mapDispatchToProps)(Comment);

/**<Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}

                >
                    <StockSummary />
                </Grid> */