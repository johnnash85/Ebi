import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from "react-redux";
import * as actions from "redux/actions/sessionActions";//
//import logo from '../../assets/logo2.png';
import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { Translate, I18n } from "react-redux-i18n";

const schema = {
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 64
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
    quoteContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    quote: {
        backgroundColor: theme.palette.neutral,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    quoteInner: {
        textAlign: 'center',
        flexBasis: '600px'
    },
    quoteText: {
        color: theme.palette.black,
        fontWeight: 300
    },
    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.black
    },
    bio: {
        color: theme.palette.black
    },
    contentContainer: {},
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    socialButtons: {
        marginTop: theme.spacing(3)
    },
    socialIcon: {
        marginRight: theme.spacing(1)
    },
    sugestion: {
        marginTop: theme.spacing(2)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    signInButton: {
        margin: theme.spacing(2, 0)
    }
}));

const Recovery = props => {
    const { history } = props;

    const classes = useStyles();

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });

    useEffect(() => {
        props.error && alertify.error(props.error);
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

    const handleBack = () => {
        history.goBack();
    };

    const handleChange = event => {
        event.persist();

        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true
            }
        }));
    };

    const handleRecovery = async event => {
        event.preventDefault();
        await props.Recovery(formState.values.email);
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
            <Grid
                className={classes.grid}
                container
            >
                <Grid
                    className={classes.content}
                    item
                    lg={12}
                    xs={12}
                >
                    <div className={classes.content}>
                        <div className={classes.contentBody}>
                            <form
                                className={classes.form}
                                onSubmit={handleRecovery}
                            >
                                <Typography
                                    className={classes.title}
                                    variant="h2"
                                >
                                    <Translate value="recovery_password" />
                                </Typography>

                                <Typography
                                    align="center"
                                    className={classes.sugestion}
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    <Translate value="recovery_email" />
                                </Typography>
                                <TextField
                                    className={classes.textField}
                                    error={hasError('email')}
                                    helperText={
                                        hasError('email') ? formState.errors.email[0] : null
                                    }
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.email || ''}
                                    variant="outlined"
                                />

                                <Button
                                    className={classes.signInButton}
                                    color="primary"
                                    disabled={!formState.isValid}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    <Translate value="recovery_now" />
                                </Button>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    <Translate value="don_have_account" /> {' '}
                                    <Link
                                        component={RouterLink}
                                        to="/signup"
                                        variant="h6"
                                    >
                                        <Translate value="sign_up" />
                                    </Link>
                                    {' '} <Translate value="or" />  {' '}
                                    <Link
                                        component={RouterLink}
                                        to="/login"
                                        variant="h6"
                                    >
                                        <Translate value="sign_in" />
                                    </Link>
                                </Typography>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

Recovery.propTypes = {
    history: PropTypes.object
};

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {
        error: reducer.session.error,
        success: reducer.session.success,
    };
}

const mapDispatchToProps = dispatch => ({
    Recovery: (email) =>
        dispatch(actions.recovery({ email })),
    Logout: () =>
        dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recovery);