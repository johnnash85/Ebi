//import {
//   Comments,
// StockSummary,
// LatestSales,
//} from './components';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from "react-redux";
import * as actions from "../../redux/actions/dashboardActions";
import { PayPalButton } from "react-paypal-button-v2";
import { config } from "../../config";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Suscription = (props) => {
    const classes = useStyles();
    const [list, setList] = useState({});
    /*
        useEffect(() => {
            // props.loadList(props.user_id, props.token);
        }, list);
    */
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
                    <PayPalButton
                        shippingPreference={"NO_SHIPPING"}
                        options={{
                            vault: true,
                            clientId: config.paypal.clientId
                        }}
                        createSubscription={(data, actions) => {
                            return actions.subscription.create({
                                plan_id: 'P-6NE427773H0019055MNC4EYI',
                            });
                        }}
                        onApprove={(data, actions) => {
                            // Capture the funds from the transaction
                            return actions.subscription.get().then(function (details) {
                                props.history.push("/suscription");
                                return fetch("/api/suscription", {
                                    method: "post",
                                    body: JSON.stringify({
                                        order_id: data.orderID,
                                        subscription_id: data.subscriptionID,
                                        id: props.user_id,
                                        token: props.token,
                                        details: details,
                                        plan_id: 'P-6NE427773H0019055MNC4EYI',
                                    }),
                                });
                            });
                        }}
                    />
                </Grid>
                <Grid
                    item
                    lg={4}
                    md={6}
                    xl={3}
                    xs={12}
                >

                    <form action="https://www.paypal.com/donate" method="post" target="_top">
                        <input type="hidden" name="business" value="RKCGVVHU77U58" />
                        <input type="hidden" name="no_recurring" value="0" />
                        <input type="hidden" name="item_name" value="Donation for performance platform" />
                        <input type="hidden" name="currency_code" value="USD" />
                        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                        <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                    </form>

                </Grid>


            </Grid>
        </div>);

};

//export default Report; <Comments />

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
export default connect(mapStateToProps, mapDispatchToProps)(Suscription);