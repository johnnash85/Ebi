import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { Sidebar, Topbar, Footer, ButtonChat, SessionTimer, Pending, Calendar, } from './components';
import { connect } from "react-redux";
import * as actions_list from "redux/actions/watchListActions";
import * as actions_setting from "redux/actions/settingActions";
import * as actions_event from "redux/actions/eventActions";
import * as actions_note from "redux/actions/noteActions";
import * as actions_session from "redux/actions/sessionActions";


const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [isActive, setIsActive] = useState(true);

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  useEffect(() => {
    //props.loadListWatchList(props.user_id, props.token);
    //props.loadItem(props.user_id, props.token);//setting
    //props.loadListNotes({ id: props.user_id }, props.token);
    props.initConextionSocket(props.user_id, props.token);
  }, props.data);

  const onActive = () => {
    setIsActive(true);
  }

  const onIdle = () => {
    setIsActive(false);
    props.Logout();
    props.closeConextionSocket();
    // console.log("Idle");
    // props.history.push('/login');
  }

  //1800
  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <SessionTimer onActive={onActive} onIdle={onIdle} timeOutInterval={1800 * 1000} />
      <Topbar onSidebarOpen={handleSidebarOpen} history={props.history} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {children}
        <Footer />
        <ButtonChat market={props.market} />
        <Calendar />
        <Pending />
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

function mapStateToProps(reducer) {
  // console.log(reducer);
  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    market: reducer.session.auth.market,

    data: reducer.dashboard.data,
  };
}


const mapDispatchToProps = dispatch => ({
  loadListWatchList: (user_id, token) =>
    dispatch(actions_list.loadList({ user_id, token })),
  loadItem: (user_id, token) =>
    dispatch(actions_setting.loadItem({ user_id, token })),


  loadListNotes: (params, token) =>
    dispatch(actions_note.loadList({ params, token })),

  initConextionSocket: (user_id, token) =>
    dispatch(actions_event.initConextionSocket({ user_id, token })),
  closeConextionSocket: () =>
    dispatch(actions_event.closeConextionSocket({})),
  Logout: () =>
    dispatch(actions_session.logout({})),

});
export default connect(mapStateToProps, mapDispatchToProps)(Main);


/**
 * () => { setIsActive(true) }
 * () => { setIsActive(false) }
 */