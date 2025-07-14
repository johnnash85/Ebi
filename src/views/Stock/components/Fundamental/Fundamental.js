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
import { connect } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

//import * as actions from "redux/actions/profileActions";
const useStyles = makeStyles(theme => ({
    root: {},
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    row: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: '7px',
        height: 100,
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

const Fundamental = props => {
    const { className, auth, ...rest } = props;

    const classes = useStyles();

    const onClickUpsetFollow = () => {
    }

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardContent>
                <div className={classes.profile}>
                    <div className={classes.row}>

                        <div>
                            <Typography
                                gutterBottom
                                variant="h2"
                            >
                                {props.item.name}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h4"
                            >
                                {"Market Capital:"}{props.item.market_cap}
                            </Typography>

                            <Typography
                                gutterBottom
                                variant="h4"
                            >
                                {"Total Employees:"}{props.item.total_employees}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h4"
                            >
                                {"List Date:"}{props.item.list_date}
                            </Typography>

                            <p>
                                {props.item.description}
                            </p>
                            <br />
                            <small
                                className={classes.locationText}
                                color="textSecondary"
                                variant="body1"
                            >
                                {props.item.homepage_url}{" Phone:"}{props.item.phone_number} {" "}{props.item.city} {" ZipCode:"}{props.item.postal_code}{" "}{props.item.address}
                            </small>
                        </div>
                    </div>
                    <div className={classes.column}>
                    </div>
                </div>
            </CardContent>
            <Divider />

        </Card>
    );
};

Fundamental.propTypes = {
    className: PropTypes.string,
    auth: PropTypes.object
};

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        auth: reducer.session.auth,

        item: reducer.stock.item,
    };
}
const mapDispatchToProps = dispatch => ({
    //  upsetFollow: (params, token) =>
    //    dispatch(actions.upsetFollow({ params, token })),

});

export default connect(mapStateToProps, mapDispatchToProps)(Fundamental);