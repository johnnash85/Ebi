import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HistoryIcon from '@mui/icons-material/History';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import PaymentIcon from '@mui/icons-material/Payment';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
//import TwoWheeler from "@material-ui/icons/TwoWheeler";
import InputIcon from '@material-ui/icons/Input';
import { Translate, I18n } from "react-redux-i18n";
import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: <Translate value="portfolio" />,
      href: '/portfolio',
      icon: <DashboardIcon />
    },
    {
      title: <Translate value="wall" />,
      href: '/wall',
      icon: <ChromeReaderModeIcon />
    },
    {
      title: <Translate value="watchlist" />,
      href: '/watchlist',
      icon: <QueryStatsIcon />
    },
    {
      title: <Translate value="history" />,
      href: '/history',
      icon: <HistoryIcon />
    },
    {
      title: <Translate value="discover" />,
      href: '/discover',
      icon: <ManageSearchIcon />
    },
    {
      title: <Translate value="report" />,
      href: '/report',
      icon: <AssessmentIcon />
    },
    {
      title: <Translate value="knowledge" />,
      href: '/knowledge',
      icon: <AutoStoriesIcon />
    },

    {
      title: <Translate value="faq" />,
      href: '/faq',
      icon: <ContactSupportIcon />
    },
    {
      title: <Translate value="account" />,
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: <Translate value="balance" />,
      href: '/balance',
      icon: <AttachMoneyIcon />
    },
    {
      title: <Translate value="setting" />,
      href: '/setting',
      icon: <SettingsIcon />
    },
    {
      title: <Translate value="suscription" />,
      href: '/suscription',
      icon: <PaymentIcon />
    },
    {
      title: <Translate value="logout" />,
      href: '/login',
      icon: <InputIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
/**
 *   {
      title: 'Authentication',
      href: '/sign-in',
      icon: <LockOpenIcon />
    },

 *  {
      title: 'Vehiculos',
      href: '/vehiculos',
      icon: <DashboardIcon />
    },
    {
      title: 'Usuarios',
      href: '/users',
      icon: <PeopleIcon />
    },
    {
      title: 'Products',
      href: '/products',
      icon: <ShoppingBasketIcon />
    },
     {
      title: 'Typography',
      href: '/typography',
      icon: <TextFieldsIcon />
    },
    {
      title: 'Icons',
      href: '/icons',
      icon: <ImageIcon />
    },
 */