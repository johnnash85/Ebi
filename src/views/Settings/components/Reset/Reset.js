
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    Divider,
    FormControlLabel,
    Checkbox,
    Typography,
    Button,
    TextField
} from '@material-ui/core';
import { connect } from "react-redux";
import * as actions from "redux/actions/settingActions";
import { Translate, I18n } from "react-redux-i18n";

const useStyles = makeStyles(() => ({
    root: {},
    item: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

const Reset = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        // option_tax: (props.item && props.item.option_tax) || 0,
        // stock_tax: (props.item && props.item.stock_tax) || 0,
        // tax_id: props.item && props.item.id,
        id: props.user_id,
    });

    // const handleChange = (event) => {
    //     event.persist();
    //     setValues({
    //         ...values,
    //         [event.target.name]: event.target.value,
    //     });
    // };

    const handleReset = () => {
        props.reset(values, props.token);
    };

    useEffect(() => {
        setValues({
            // option_tax: (props.item && props.item.option_tax) || 0,
            // stock_tax: (props.item && props.item.stock_tax) || 0,
            // tax_id: props.item && props.item.id,
            id: props.user_id,
        });
    }, [props.item]);

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <form>
                <CardHeader
                    subheader={<Translate value="reset_all" />}
                    title={<Translate value="reset" />}
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={12}
                        wrap="wrap"
                    >

                        <Grid
                            className={classes.item}
                            item
                            md={6}
                            sm={6}
                            xs={12}
                        >
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={handleReset}
                            >
                                <Translate value="reset" />
                            </Button>
                        </Grid>
                        {/* <Grid
                            className={classes.item}
                            item
                            md={6}
                            sm={6}
                            xs={12}
                        >
                            <TextField
                                margin="dense"
                                id="stock_tax"
                                name="stock_tax"
                                required="true"
                                label={<Translate value="close_stock" />}
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={values.stock_tax}
                                onChange={handleChange}
                                // fullWidth
                                variant="outlined"
                            />
                        </Grid> */}
                    </Grid>
                </CardContent>
                {/* <Divider />
                <CardActions>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleSave}
                    >
                        <Translate value="save" />
                    </Button>
                </CardActions> */}
            </form>
        </Card>

    );
};

Reset.propTypes = {
    className: PropTypes.string
};

function mapStateToProps(reducer) {
    // console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        item: reducer.setting.item,
        success: reducer.setting.success
    };
}

const mapDispatchToProps = dispatch => ({
    reset: (params, token) =>
        dispatch(actions.reset({ params, token })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Reset);
// || (props.item && props.item.option_tax) || 0 || (props.item && props.item.stock_tax) || 0

/**
 *  setValues({
            ...values,
            option_tax: (props.item && props.item.option_tax) || 0,
            stock_tax: (props.item && props.item.stock_tax) || 0,
            tax_id: props.item && props.item.id,
        });
 */