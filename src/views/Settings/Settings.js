import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Notifications, Taxes, Import_, Reset } from './components';
import { connect } from "react-redux";
import * as actions from "redux/actions/settingActions";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = (props) => {

  const { className, ...rest } = props;

  const classes = useStyles();

  //const [setting, setList] = useState(props.setting);

  useEffect(() => {
    props.loadItem(props.user_id, props.token);
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={7}
          xs={12}
        >
          <Notifications />
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
        >
          <Taxes />
          <Reset />
        </Grid>

        <Grid
          item
          md={12}
          xs={12}
        >
          <Import_ />
        </Grid>
      </Grid>
    </div>
  );
};

function mapStateToProps(reducer) {
  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    setting: reducer.setting.item
  };
}

const mapDispatchToProps = dispatch => ({
  loadItem: (user_id, token) =>
    dispatch(actions.loadItem({ user_id, token })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
//export default ;
