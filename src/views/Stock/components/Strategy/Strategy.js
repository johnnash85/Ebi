import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
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
            <CardHeader

                title={"Strategy"}
            //subheader={props.item.created_at}
            />
            <CardContent>

                {
                    props.list.map((item) => (
                        <div className={classes.profile}>
                            <span>{item.reference}</span>
                            <span>{"$ "}{item.pl && (item.pl).toFixed(2)} <small>{" USD"}</small></span>
                        </div>
                    ))
                }

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

        list: reducer.stockNews.listStrategy,
    };
}
const mapDispatchToProps = dispatch => ({
    //  upsetFollow: (params, token) =>
    //    dispatch(actions.upsetFollow({ params, token })),

});

export default connect(mapStateToProps, mapDispatchToProps)(Fundamental);