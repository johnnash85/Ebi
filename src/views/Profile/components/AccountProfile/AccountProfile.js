import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  IconButton,
  LinearProgress
} from '@material-ui/core';
import Button from '@mui/material/Button';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { connect } from "react-redux";
import * as actions from "redux/actions/profileActions";
import FollowListModalJs from './components/FollowListModal.js';
import { Translate, I18n } from "react-redux-i18n";

const useStyles = makeStyles(theme => ({
  root: {},
  profile: {

  },
  row: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  avatar: {
    //marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, auth, ...rest } = props;

  const classes = useStyles();

  const onClickUpsetFollow = () => {
    props.upsetFollow({
      id: props.user_id,
      follower_id: props.item.id
    }, props.token);
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.profile}>
          <div className={classes.row}>
            <Avatar
              className={classes.avatar}
              src={props.item.avatar}
            />
          </div>
          <div className={classes.row}>
            <Typography
              gutterBottom
              variant="h2"
            >
              {"@"}{props.item.username}
            </Typography>
          </div>
          <div className={classes.row}>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {props.item.follow && props.item.follow.followme}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {props.item.follow && props.item.follow.follower}
            </Typography>
          </div>
          <div className={classes.row}>
            <FollowListModalJs button_label={<Translate value="following" />} item={props.item} title={<Translate value="following" />} kind={"following"} disabled={props.item.follow && props.item.follow.followme > 0} />

            <FollowListModalJs button_label={<Translate value="follower" />} item={props.item} title={<Translate value="follower" />} kind={"followers"} disabled={props.item.follow && props.item.follow.follower > 0} />
          </div>
          <div className={classes.row}>
            {
              props.item.id === auth.id ? (<></>) : (
                <CardActions>
                  <IconButton
                    color="primary"
                    variant="contained"
                    onClick={onClickUpsetFollow}
                  >
                    {
                      props.item.follow && props.item.follow.status === 1 ? (<PersonRemoveIcon />) : (<PersonAddAlt1Icon />)
                    }
                  </IconButton>
                  <IconButton >
                    <QuestionAnswerIcon />
                  </IconButton>
                </CardActions>
              )
            }
          </div>
        </div>
      </CardContent>
      <Divider />

    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  auth: PropTypes.object
};

function mapStateToProps(reducer) {
  //  console.log(reducer);
  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    auth: reducer.session.auth,

    item: reducer.profile.item,

  };
}
const mapDispatchToProps = dispatch => ({
  upsetFollow: (params, token) =>
    dispatch(actions.upsetFollow({ params, token })),

});

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);

/**
 *  <Button
              className={classes.locationText}
              color="textSecondary"
              variant="outlined"
            >
            
            </Button>
            <Button
              color="primarytextSecondary"
              variant="outlined"
            >
              {"Follower"}
            </Button>
 * Typography
 * variant="body1"
 *   <Typography
 * Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {auth.city}, {auth.country}
            </Typography>
 *  <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
         
        </div>
 *  <LinearProgress
            value={70}
            variant="determinate"
          />
 * 
 */