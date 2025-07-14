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
import WatchListModal from 'components/WatchListModal';
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

const StockProfile = props => {
    const { className, auth, ...rest } = props;

    const classes = useStyles();

    const onClickUpsetFollow = () => {
        /*  props.upsetFollow({
              id: props.user_id,
              follower_id: props.item.id
          }, props.token);*/
    }

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardContent>
                <div className={classes.profile}>
                    <div className={classes.row}>
                        <img
                            className={classes.avatar}
                            src={props.item.logo_url}
                        />
                        <div>
                            <Typography
                                gutterBottom
                                variant="h2"
                            >
                                {props.item.ask}
                                <small style={{ "fontSize": "15px" }}> USD</small>
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h4"
                            >
                                {props.item.symbol}
                            </Typography>
                            <Typography
                                className={classes.locationText}
                                color="textSecondary"
                                variant="body1"
                            >
                                {props.item.name}
                            </Typography>
                        </div>
                    </div>


                    <div className={classes.column}>
                        <CardActions>
                            <Typography
                                className={classes.locationText}
                                color="textSecondary"
                                variant="body1"
                            >
                                {"Add Watchlist"}
                            </Typography>
                            <WatchListModal symbol={props.item.symbol} />
                        </CardActions>
                        <Typography
                            className={classes.locationText}
                            style={{ "textAlign": 'center' }}
                            color="textSecondary"
                            variant="body1"
                        >
                            {props.item.exchange}
                        </Typography>
                    </div>
                </div>
            </CardContent>
            <Divider />

        </Card>
    );
};

StockProfile.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(StockProfile);
/**
 *   <IconButton
                                color="primary"
                                variant="contained"
                                onClick={onClickUpsetFollow}
                                <addIcon/>
                                 </IconButton>
                            >
 */