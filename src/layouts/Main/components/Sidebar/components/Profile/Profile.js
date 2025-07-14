import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, auth, ...rest } = props;

  const classes = useStyles();


  //Siguiendo  /Seguidores
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={auth.avatar}
        to={"/profile/" + auth.id}
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        @{auth.username}
      </Typography>

    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  auth: PropTypes.object,
};

function mapStateToProps(reducer) {
  //console.log(reducer);
  return {
    auth: reducer.session.auth,

  };
}

export default connect(mapStateToProps, null)(Profile);
/**
 *  <div style={{ "display": "flex", "justifyContent": "space-around", "width": "100%", "alignItems": "center" }}>
        <Typography variant="body2">{"Following:"}</Typography>
        <Typography variant="body1">{auth.follower}</Typography>
        <Typography variant="body2">{"Followers:"}</Typography>
        <Typography variant="body1">{auth.followme}</Typography>
      </div>
 */

