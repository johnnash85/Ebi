import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import { connect } from "react-redux";
import * as actions from "redux/actions/sessionActions";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { Translate, I18n } from "react-redux-i18n";

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    pwdnew: '',
    pwdold: '',
    confirm: '',
    id: props.user_id,
    isValid: false
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
      isValid: (values.pwdnew.length > 1 && values.confirm.length > 1) ? true : false
    });
  }

  const onClick = event => {
    if (values.pwdnew !== values.confirm) {
      alertify.error("Passwords new are not the same");
      return;
    }
    props.resetPassword(values, props.token);
    setValues({
      ...values,
      pwdold: '',
      pwdnew: '',
      confirm: '',
      isValid: false
    });
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader={<Translate value="update_password" />}
          title={<Translate value="password" />}
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label={<Translate value="password_current" />}
            name="pwdold"
            onChange={handleChange}
            type="password"
            value={values.pwdold}
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            fullWidth
            label={<Translate value="password_new" />}
            name="pwdnew"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.pwdnew}
            variant="outlined"
            autoComplete="off"
          />
          <TextField
            fullWidth
            label={<Translate value="password_confirm" />}
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
            autoComplete="off"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={onClick}
            disabled={!values.isValid}
          >
            <Translate value="save" />
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

//export default ;

function mapStateToProps(reducer) {
  //  console.log(reducer);
  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    item: reducer.session.auth,
    // error: reducer.session.error,
    // loading: reducer.session.loading,
  };
}
const mapDispatchToProps = dispatch => ({
  // loadProfile: (user_id, token) =>
  //  dispatch(actions.loadItem({ user_id, token })),
  resetPassword: (params, token) => dispatch(actions.resetItem({ params, token }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Password);