import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
//import { AccountProfile, AccountDetails, Password } from './components';
import { connect } from "react-redux";
import validate from 'validate.js';
import * as actions from "redux/actions/sessionActions";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { useLocation } from "react-router-dom"
import { Translate, I18n } from "react-redux-i18n";

const schema = {
    pwd_new: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    },
    pwd_new1: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    },

};
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%'
    },
    grid: {
        height: '100%'
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentBody: {
        flexGrow: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'

    },
    title: {
        margin: '10px',
        textAlign: 'center'
    },
    textField: {
        marginBottom: theme.spacing(2)
    },
    Button: {
        //margin: theme.spacing(2)
    }
}));

const params = new URLSearchParams(window.location.pathname);

const Reset = (props) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const { history } = props;

    const classes = useStyles();

    const [formState, setFormState] = useState({
        isValid: false,
        values: {
            token: params.get("t"),
        },
        touched: {},
        errors: {}
    });

    useEffect(() => {
        props.error && alertify.error(props.error);
        // console.log(params.get("t"));
        if (props.success) {
            alertify.success(props.success);
            history.push('/login');
        }
        props.Logout();
        const errors = validate(formState.values, schema);
        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));

    }, [formState.values]);

    const handleChange = event => {
        event.persist();

        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]: event.target.value
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true
            }
        }));
    };

    const handleActivate = async event => {
        event.preventDefault();

        if (formState.values.pwd_new !== formState.values.pwd_new1) {
            alertify.error("Passwords are not the same");
            return;
        }
        await props.Activate(formState.values);
        setFormState(formState => ({
            ...formState,
            isValid: false,
            values: {},
            touched: {},
            errors: {},
        }));
    };

    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.contentBody}>
                    <form
                        className={classes.form}
                        onSubmit={handleActivate}
                    > <Typography
                        className={classes.title}
                        variant="h2"
                    >
                            <Translate value="reset_password" />
                        </Typography>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                        >
                            <Translate value="update_password" />
                        </Typography>
                        <TextField
                            className={classes.textField}
                            error={hasError('pwd_new')}
                            fullWidth
                            helperText={
                                hasError('pwd_new') ? formState.errors.pwd_new[0] : null
                            }
                            label={<Translate value="password" />}
                            name="pwd_new"
                            id="pwd_new"
                            onChange={handleChange}
                            type="password"
                            value={formState.values.pwd_new || ''}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            error={hasError('pwd_new1')}
                            fullWidth
                            helperText={
                                hasError('pwd_new1') ? formState.errors.pwd_new1[0] : null
                            }
                            label={<Translate value="password_again" />}
                            name="pwd_new1"
                            id="pwd_new1"
                            onChange={handleChange}
                            type="password"
                            value={formState.values.pwd_new1 || ''}
                            variant="outlined"
                        />
                        <Button
                            className={classes.Button}
                            color="primary"
                            disabled={!formState.isValid}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        // onClick={onClickLogin}
                        >
                            <Translate value="update" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

//export default Account;
Reset.propTypes = {
    history: PropTypes.object
};


function mapStateToProps(reducer) {
    //  console.log(reducer);
    return {
        error: reducer.session.error,
        success: reducer.session.success,
    };
}
const mapDispatchToProps = dispatch => ({
    Activate: (params) =>
        dispatch(actions.activate({ params })),
    Logout: () =>
        dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
/**
 *  spacing={2}
 *    <Grid
                    item
                    lg={8}
                    md={6}
                    xl={8}
                    xs={12}
                >
                    <AccountDetails />
                </Grid>
 */