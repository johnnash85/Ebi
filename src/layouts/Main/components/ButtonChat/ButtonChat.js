import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import CommentIcon from '@mui/icons-material/Comment';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Translate, I18n } from "react-redux-i18n";
import moment from "moment-timezone";


const useStyles = makeStyles(theme => ({
    root: {
        paddingInline: theme.spacing(4),
        paddingTop: "4px"
    }
}));

/*function getTime() {
    // var momentoActual = new Date().toLocaleTimeString('en-US');
    //var hora = momentoActual.getHours();
    //var minuto = momentoActual.getMinutes();
    //var segundo = momentoActual.getSeconds();

    // return hora + ":" + minuto + ":" + segundo;
    return new Date().toLocaleTimeString('en-US');
}*/


const ButtonChat = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const [time, setTime] = useState("00:00:00");
    const [color, setColor] = useState("");
    const [message, setMessage] = useState("");

    function refreshClock() {
        setTime(new Date().toLocaleTimeString());
        var hora = moment().tz("America/New_York").format("HH");
        var minuto = moment().tz("America/New_York").format("mm");
        if (hora >= 9 && hora < 16 && props.market == "WN") {//
            if (hora === 9 && minuto <= 29) {
                setColor("red");
                setMessage(I18n.t("close_market"));
            }

            else {
                setColor("green");
                setMessage(I18n.t("open_market"));
            }
        }
        else {
            setColor("red");
            setMessage(I18n.t("close_market"));
        }
    }

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);

    const onClick = () => {
        console.log("click");
    };

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <span
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                style={{
                    "position": "fixed",
                    "right": "40px",
                    "bottom": "10px",
                    "borderRadius": "50%"
                }}>
                {time}
                <CircleIcon style={{
                    "height": "14px",
                    "color": color//limegreen
                }} />
            </span>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Button onClick={onClick}>
                    <Typography sx={{ p: 1 }}>{message}</Typography>
                </Button>
            </Popover>

        </Box>
    );
};

ButtonChat.propTypes = {
    className: PropTypes.string
};

export default ButtonChat;

//  <Calendar />