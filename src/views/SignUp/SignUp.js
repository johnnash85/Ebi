import React, { useState, useEffect, useCallback } from 'react';
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
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from "react-redux";
import * as actions from "redux/actions/sessionActions";
import logo1 from 'assets/ebi_n.png';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import Tos from "./components/Tos";
import { Translate, I18n } from "react-redux-i18n";

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  lastN: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  }
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
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
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
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
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

  const handleBack = () => {
    history.goBack();
  };

  const register = useCallback(async () => {
    await props.Register(formState.values);
  });

  const handleSignUp = async event => {
    event.preventDefault();

    await register();
    setFormState(formState => ({
      ...formState,
      isValid: false,
      values: {},
      touched: {},
      errors: {},
    }));
    /*    console.timeLog(props.error);
   
       if (props.error)
         alertify.error(props.error);
      */
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
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                <img alt="Logo" src={logo1} style={{ height: "100px", }} />
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Bitácora de Trading / Trading Log
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Elecsotech
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignUp}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  <Translate value="create_account" />
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  <Translate value="create_email" />
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('name')}
                  fullWidth
                  helperText={
                    hasError('name') ? formState.errors.name[0] : null
                  }
                  label={<Translate value="first_name" />}
                  name="name"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.name || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('lastN')}
                  fullWidth
                  helperText={
                    hasError('lastN') ? formState.errors.lastN[0] : null
                  }
                  label={<Translate value="last_name" />}
                  name="lastN"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.lastN || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label={<Translate value="password" />}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <div className={classes.policy}>
                  <Checkbox
                    checked={formState.values.policy || false}
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    className={classes.policyText}
                    color="textSecondary"
                    variant="body1"
                  >
                    <Translate value="i_read" />{' '}
                    <Tos />
                  </Typography>
                </div>
                {hasError('policy') && (
                  <FormHelperText error>
                    {formState.errors.policy[0]}
                  </FormHelperText>
                )}
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  <Translate value="signup_now" />
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  <Translate value="have_account" />{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                  >
                    <Translate value="sign_in" />
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid >
      </Grid >
    </div >
  );
};

SignUp.propTypes = {
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
  Register: (params) =>
    dispatch(actions.register({ params })),
  Logout: () =>
    dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
//export default withRouter(SignUp);
/**
 *  <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
 * <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                    </Link>
 */
