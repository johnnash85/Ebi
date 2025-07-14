import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core"
import TextField from '@mui/material/TextField';
import { SearchInput } from "components";
//import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { connect } from "react-redux";
import * as actions from "redux/actions/historyActions";

const useStyles = makeStyles((theme) => ({
    root: {},
    row: {
        height: "42px",
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
        from_at: new Date().toISOString().split('T')[0],
        to_at: new Date().toISOString().split('T')[0],
    });
    const handleChange = (event) => {
        var value = event.target.value;
        var field = event.target.name;
        props.loadList({
            id: props.user_id,
            [field]: value
        }, props.token);
    };

    return (
        <div {...rest} className={clsx(classes.root, className)}>

            <div className={classes.row}>
                <SearchInput
                    name="search"
                    className={classes.searchInput}
                    placeholder="Search ..."
                    onChange={handleChange}
                />

                <TextField
                    label="From Date "
                    inputFormat="DD/MM/YYYY"
                    value={values.from_at}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ m: 1, width: '15ch' }}
                    variant="outlined"
                />
                <TextField
                    label="To Date "
                    inputFormat="DD/MM/YYYY"
                    value={values.to_at}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ m: 1, width: '15ch' }}
                    variant="outlined"
                />
            </div>
        </div>
    );
};

Toolbar.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};

//export default Toolbar;
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