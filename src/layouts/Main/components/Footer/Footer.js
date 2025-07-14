import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';
import { Translate, I18n } from "react-redux-i18n";

const useStyles = makeStyles(theme => ({
  root: {
    paddingInline: theme.spacing(4),
    paddingTop: "4px"
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="https://www.elecsotech.com"
          target="_blank"
        >
          Elecsotech
        </Link>
        {" "}{new Date().getFullYear()} v1.0.0.2
      </Typography>
      <Typography variant="caption">
        <Translate value="footer_right" />
      </Typography>
      <br />
      <Link
        component="a"
        href="mailto:team@elecsotech.com?subject=Ebi&body=Team%Ebi,"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography variant="caption">
          team@elecsotech.com
        </Typography>
      </Link>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
