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
import logo1 from 'assets/ebi_n.png';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import * as actions_event from "redux/actions/eventActions";
import { Translate, I18n } from "react-redux-i18n";

const schema = {
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
    //backgroundImage: 'url(/images/auth.jpg)',
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
    marginTop: theme.spacing(2),
    borderColor: theme.palette.text.secondary,
    fontSize: "inherit"
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      password: ""
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    props.error && alertify.error(props.error);
    props.Logout();
    props.closeConextionSocket();
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

  const handleSignIn = async event => {
    event.preventDefault();
    await props.Login(formState.values.email, formState.values.password).then(function () {
      history.push('/');
    });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleClickShowPassword = () => {
    setFormState(formState => ({
      ...formState,
      showPassword: !formState.showPassword,
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused && formState.values.password.length === 0) {
        return "Password is requerid";
      }

      return (formState.values.password.length === 0 ? "Password is requerid" : "");
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }

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
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  <Translate value="sign_in" />
                </Typography>

                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  <Translate value="login_email" />
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

                <FormControl
                  variant="outlined"
                  fullWidth
                  error={hasError('password')}
                  style={{ "marginTop": "16px" }}
                >
                  <InputLabel htmlFor="outlined-password" > <Translate value="password" /></InputLabel>
                  <OutlinedInput
                    id="outlined-password"
                    name="password"
                    type={formState.showPassword ? 'text' : 'password'}
                    value={formState.values.password || ''}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {formState.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label={<Translate value="password" />}
                  />
                  <MyFormHelperText text={
                    hasError('password') ? formState.errors.password[0] : null
                  } />
                </FormControl>
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  <Translate value="sign_now" />
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  <Translate value="don_have_account" />{' '}
                  <Link
                    component={RouterLink}
                    to="/signup"
                    variant="h6"
                  >
                    <Translate value="sign_up" />
                  </Link>
                  {' '} <Translate value="or" /> {' '}
                  <Link
                    component={RouterLink}
                    to="/recovery"
                    variant="h6"
                  >
                    <Translate value="recovery_password" />
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

SignIn.propTypes = {
  history: PropTypes.object
};

//export default withRouter(SignIn); sx={{ m: 1, width: '25ch' }}

function mapStateToProps(reducer) {
  //console.log(reducer);
  return {
    error: reducer.session.error,
    success: reducer.session.success,
  };
}

const mapDispatchToProps = dispatch => ({
  Login: (email, password /*, params*/) =>
    dispatch(actions.login({ email, password })),
  Logout: () =>
    dispatch(actions.logout()),
  closeConextionSocket: () =>
    dispatch(actions_event.closeConextionSocket({}))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
/**
 *  <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {formState.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
 * <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
 *     <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Sign in with social media
                </Typography>
                <Grid
                  className={classes.socialButtons}
                  container
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <FacebookIcon className={classes.socialIcon} />
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <GoogleIcon className={classes.socialIcon} />
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
 */