import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { connect } from "react-redux";
import * as actions from "redux/actions/optionOrderActions";
import { Translate, I18n } from "react-redux-i18n";
import InputDate from 'components/InputDate';
import { loadListEarning } from 'redux/actions/discoverActions';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



function getLabel(item) {
    let strike = item.strike;
    let data = [];
    if (strike > 0 && strike < 99) {
        let start = strike - 4;

        for (let index = 0; index < 16; index++) {

            data.push(start);
            start = start + 0.5;
        }
    }
    return data;


}
function getData(item) {

    let strike = item.strike;
    let premiun = Math.abs(item.open_price);
    let market = item.market;
    let option_kind = item.option_kind;

    let data = [];

    if (strike > 0 && strike < 99) {
        let start = strike - 4;

        for (let index = 0; index < 16; index++) {
            let tmpf = 0;
            let tmpB = 0;
            let tmpS = 0;
            if (option_kind === "CALL") {
                tmpB = (start - strike) < 0 ? 0 : (start - strike);
                tmpS = (strike - start) > 0 ? 0 : (strike - start);
                tmpf = market === "BUY" ? tmpB : tmpS;
            }
            else {
                tmpB = (strike - start) < 0 ? 0 : (strike - start);
                tmpS = (start - strike) > 0 ? 0 : (start - strike);
                tmpf = market === "BUY" ? tmpB : tmpS;
            }

            let rest = market === "BUY" ? tmpf - premiun : tmpf + premiun;
            data.push(rest);
            start = start + 0.5;
        }
    }

    return data;

}
const FormDialog = props => {

    const { item, ...rest } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const options = {
        responsive: true,
        legend: { display: false },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
        },
    };
    const labels = getLabel(props.item);//['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: getData(props.item),
                borderColor: 'rgb(53, 162, 235)',
                // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                // backgroundColor: "#f5f5f5"
            },
            /*    {
                    label: 'Stock',
                    data:
                        [0, 0, 0.48, 0, 0, 0, 0, 0, 0]
    
                    ,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },*/

        ],
    };

    return (
        <div style={{ "display": "inline" }}>
            <Button
                //color="primary"
                size="small"
                variant="contained"
                onClick={handleClickOpen}>
                <TrendingUpIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                key={props.key}
                fullWidth={"true"}
                maxWidth={"md"}
            >
                <DialogTitle> Option Graphic </DialogTitle>
                <DialogContent >
                    <DialogContentText>
                    </DialogContentText>
                    <Line options={options} data={data} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        variant="outlined"
                    ><Translate value="cancel" /></Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

FormDialog.propTypes = {
    item: PropTypes.object
};

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

    };
}
const mapDispatchToProps = dispatch => ({
    updateItem: (params, token) =>
        dispatch(actions.updateItem({ params, token })),
    updateStrategy: (params, token) =>
        dispatch(actions.updateStrategy({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);