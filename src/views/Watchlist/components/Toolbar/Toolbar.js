import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button, IconButton } from "@material-ui/core";
import Select from '@mui/material/Select';
import { SearchInput } from "components";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import EntryListModal from "../EntryListModal";
import OffSetListModal from "../OffSetListModal";
import { connect } from "react-redux";
import * as actions_list from "redux/actions/watchListActions";
import * as actions_stock from "redux/actions/watchStockActions";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "justifyContent": "space-between"
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
    row: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "flex-start",
        padding: "10px"
    }
}));

const Toolbar = (props) => {
    const { className, history, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        list_id: null
    });

    const [state, setState] = useState({
        isValid: true,
        id: props.user_id
    });
    /*
        useEffect(() => {
            props.loadListStock({ id: props.user_id }, props.token);
        }, props.list);
    */
    const [open, setOpen] = React.useState(false);


    const handleDropDown = (event) => {
        // event.persist();
        if (event.target.value === 100) {
            setOpen(true);
        }
        else {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            });
            props.loadListStock({
                id: props.user_id,
                list_id: event.target.value
            }, props.token);
        }
    };

    const handleChange = (event) => {
        event.persist();
        setState({
            ...state,
            [event.target.name]: event.target.value,
            isValid: event.target.value.length > 0 ? false : true
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
        props.NewItem(state, props.token);
    };

    return (
        <div {...rest} className={clsx(classes.root)}>

            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <Select
                    value={values.list_id || (props.list[0] && props.list[0].id) || 0}
                    onChange={handleDropDown}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    name={"list_id"}
                >
                    {
                        props.list.map((item) => (
                            <MenuItem key={item.id} value={item.id} className={classes.row}>{item.name}</MenuItem>
                        ))
                    }
                    <Divider />
                    <MenuItem value={100} style={{ "fontWeight": "bold" }} className={classes.row}>Add List</MenuItem>
                </Select>
                <EntryListModal open={open} handleClose={handleClose} handleChange={handleChange} isValid={state.isValid} handleSave={handleSave} />
            </FormControl>


            <OffSetListModal />

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

        list: reducer.watchList.list,
        error: reducer.watchList.error,
        loading: reducer.watchList.loading,
    };
}
const mapDispatchToProps = dispatch => ({
    NewItem: (params, token) =>
        dispatch(actions_list.newItem({ params, token })),
    loadListStock: (params, token) =>
        dispatch(actions_stock.loadList({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
/**
 *  </div>  
 *  <SearchInput
                    className={classes.searchInput}
                    placeholder="Search ..."
                />
 * <CardHeader
        action={
          <Button
            size="small"
            variant="text"
          >
            Last 12 month <ArrowDropDownIcon />
          </Button>
        }
        title="Latest P/L"
      />
      <Divider />
   <div className={classes.row}>
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