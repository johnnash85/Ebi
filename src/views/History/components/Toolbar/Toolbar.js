import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core"
import TextField from '@mui/material/TextField';
import { SearchInput } from "components";
//import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { connect } from "react-redux";
import * as actions from "redux/actions/historyActions";
import { Translate, I18n } from "react-redux-i18n";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from '@material-ui/core';
import InputDate from 'components/InputDate';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {},
    row: {
        // height: "42px",
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(1),
    },
    spacer: {
        flexGrow: 1,
    },
    importButton: {
        marginRight: theme.spacing(1),
    },
    exportButton: {
        marginRight: theme.spacing(1),
    },
    searchInput: {
        marginRight: theme.spacing(1),
    },
}));

const Toolbar = (props) => {
    const { className, history, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        search: "",
        kind: "",
        date: "TODAY",
        from_at: new Date().toISOString().split('T')[0],
        to_at: new Date().toISOString().split('T')[0],
        option_group: false,
        disabled: true,
        disabledOption: true,
    });

    const handleChange = (event) => {

        setValues({
            ...values,
            [event.target.name]: event.target.value,
            disabledOption: event.target.value === "OPTION" ? false : true
        });
        /*  props.loadList({
            event.target.type === 'checkbox'
                ? event.target.checked
                :
              id: props.user_id,
              [event.target.name]: event.target.value,
             // kind: values.kind,
            //  date: values.date,
              from_at: values.from_at,
              to_at: values.to_at
          }, props.token);*/
    };

    const handleChangeCheck = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.checked
        });
    };

    const handleChangDate = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
            disabled: event.target.value === "CUSTOM" ? false : true
        });
    };

    useEffect(() => {
        props.loadList({
            id: props.user_id,
            search: values.search,
            kind: values.kind,
            date: values.date,
            from_at: values.from_at,
            to_at: values.to_at,
            option_group: values.option_group,
        }, props.token);
    }, [values]);

    const option_kind =
        [
            {
                value: "",
                label: "Any",
            },
            {
                value: "STOCK",
                label: "Stock",
            },
            {
                value: "OPTION",
                label: "Option",
            },

        ];

    const option_time =
        [
            {
                value: "TODAY",
                label: "Today",
            },
            {
                value: "YESTERDAY",
                label: "Yesterday",
            },
            {
                value: "7D",
                label: "7 Days",
            },
            {
                value: "14D",
                label: "14 Days",
            },
            {
                value: "30D",
                label: "30 Days",
            },
            {
                value: "60D",
                label: "60 Days",
            },
            {
                value: "120D",
                label: "120 Days",
            },
            {
                value: "MTD",
                label: "Month To Date",
            },
            {
                value: "YTD",
                label: "Year To Date",
            },
            {
                value: "CUSTOM",
                label: "Custom",
            },
        ];

    return (
        <div {...rest} className={clsx(classes.root, className)}>

            <div className={classes.row}>

                <SearchInput
                    name="search"
                    className={classes.searchInput}
                    placeholder={I18n.t("search")}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <select
                    style={{
                        "padding": "14px",
                        "border": "1px solid #ced4da",
                        "borderRadius": "0.25rem",
                        "marginInline": "4px",
                        "color": "#495057"
                    }}
                    data-type="date"
                    name="kind"
                    value={values.kind}
                    defaultValue={""}
                    onChange={handleChange}
                >
                    {
                        option_kind.map((option) => (
                            <option value={option.value}>
                                {option.label}
                            </option>
                        ))
                    }
                </select>
                <select
                    style={{
                        "padding": "14px",
                        "border": "1px solid #ced4da",
                        "borderRadius": "0.25rem",
                        "marginInline": "4px",
                        "color": "#495057"
                    }}
                    data-type="date"
                    name="date"
                    value={values.date}
                    defaultValue={"TODAY"}
                    onChange={handleChangDate}
                >
                    {
                        option_time.map((option) => (
                            <option value={option.value}>
                                {option.label}
                            </option>
                        ))
                    }
                </select>
                <InputDate
                    id="from_at"
                    name="from_at"
                    required="true"
                    placeholder={"From Date "}
                    label=""
                    value={values.from_at}
                    onChange={handleChange}
                    variant="standart"
                    min="1900-01-01"
                    max={new Date().toISOString().split('T')[0]}
                    disabled={values.disabled}
                />
                <InputDate
                    id="to_at"
                    name="to_at"
                    required="true"
                    placeholder={"To Date "}
                    label=""
                    value={values.to_at}
                    onChange={handleChange}
                    variant="standart"
                    min="1900-01-01"
                    max={new Date().toISOString().split('T')[0]}
                    disabled={values.disabled}
                />
                <FormGroup>
                    <FormControlLabel disabled={values.disabledOption} control={<Checkbox />} onChange={handleChangeCheck} label="Option Group" labelPlacement="start" name="option_group" />
                </FormGroup>
            </div>
        </div>
    );
};

Toolbar.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        auth: reducer.session.auth,

        list: reducer.history.list,
        error: reducer.history.error,
        loading: reducer.history.loading,
    };
}

const mapDispatchToProps = dispatch => ({
    loadList: (params, token) =>
        dispatch(actions.loadList({ params, token })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
/**
 *   
 *  <div className={classes.row}>
                <span className={classes.spacer} />
                <Button className={classes.importButton}>Import</Button>
                <Button className={classes.exportButton}>Export</Button>
                <Button color="secondary" variant="outlined" onClick={onClickFolderIn}>
                    Crear Carpeta
                </Button>
                <Button color="primary" variant="contained" onClick={onClickFileIn}>
                    Agregar Archivo
                </Button>
            </div>
 */