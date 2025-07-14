import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { connect } from "react-redux";
import * as actions_session from "redux/actions/sessionActions";
import * as actions_stock from "redux/actions/stockActions";
import logo1 from 'assets/ebi_negativo.png';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import DirectionsIcon from '@mui/icons-material/Directions';
import SearchIcon from '@mui/icons-material/Search';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { CoinSummary, DropDownLang } from "./components";
import ListStockSearch from 'components/ListStockSearch';
import CloseIcon from '@mui/icons-material/Close';
import Notification from '../Notification';
import * as actions_event from "redux/actions/eventActions";
import { Translate, I18n } from "react-redux-i18n";
import * as actions_navigation from "redux/actions/navigationActions";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([{ "1": "1" }]);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    text: ""
  });

  const onClick = (event) => {
    event.preventDefault();
    props.Logout();
    props.closeConextionSocket();
  };

  const onClickCoin = (event) => {
    //event.preventDefault();
    setOpen(true);
  };
  const handleClose = (event) => {
    //event.preventDefault();
    setOpen(false);
  };

  const handleChange = event => {
    event.persist();
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    props.searchList({ id: props.user_id, search: event.target.value }, props.token);
  }

  const onClickClear = (event) => {
    setValues({
      ...values,
      text: ""
    });
    // const timer = setTimeout(() => {
    //}, 1000);
    // timer;
    //clearInterval(timer);
  };

  const onClickStock = (item) => {
    setValues({
      ...values,
      text: ""
    });
  }

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src={logo1} style={{ height: "40px", margin: "5px" }} />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Paper
          component="form"
          sx={{ paddingInline: '2px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={I18n.t("search")}
            inputProps={{ 'aria-label': 'search' }}
            value={values.text}
            onChange={handleChange}
            // onBlur={onClickClear}
            name={"text"}
            autoComplete="off"
          />
          {
            values.text.length > 0 && <IconButton type="button" sx={{ p: '5px' }} aria-label="close" onClick={onClickClear}>
              <CloseIcon />
            </IconButton>
          }

          {
            values.text.length > 0 && props.list.length > 0 && (<ListStockSearch list={props.list} onClickStock={onClickStock} />)
          }
        </Paper>
        <div className={classes.flexGrow} />
        <Hidden mdDown>

          <IconButton color="inherit" onClick={onClickCoin}>
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              < MonetizationOnIcon />
            </Badge>
          </IconButton>
          <Notification history={props.history} />
          <DropDownLang />
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={onClick}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <CoinSummary open={open} handleClose={handleClose} />
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};


function mapStateToProps(reducer) {
  return {
    user_id: reducer.session.auth.id,
    token: reducer.session.auth.token,

    list: reducer.stock.list,
    error: reducer.stock.error,
    loading: reducer.stock.loading,
  };
}

const mapDispatchToProps = dispatch => ({
  Logout: () =>
    dispatch(actions_session.logout({})),
  searchList: (params, token) =>
    dispatch(actions_stock.searchList({ params, token })),
  closeConextionSocket: () =>
    dispatch(actions_event.closeConextionSocket({})),

  push: (location) =>
    dispatch(actions_navigation.push({ location })),

});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
/**
 *   <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <DirectionsIcon />
          </IconButton>
 */