import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "redux/actions/importActions";
import { SearchInput } from "components";
import { Translate, I18n } from "react-redux-i18n";

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

    const onClickFileIn = () => {
        history.push("/file/in");
    };

    const onClickFolderIn = () => {
        history.push("/folder/in");
    };

    const [values, setValues] = useState({});
    const [file, setFile] = useState();
    // const [csvArray, setCsvArray] = useState([]);

    const handleChange = event => {
        event.persist();
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const onClickImport = event => {
        let reader = new FileReader();
        if (file) {
            reader.onload = function (event) {
                const data = event.target.result;
                csvToTable(data);
            }
            reader.readAsText(file);
        }
    }

    const onClickSave = event => {
        props.newList(
            {
                id: props.user_id,
                header: props.header,
                list: props.list,
                broker: values.broker || "tastyworks",
            }, props.token
        );
    }

    const csvToTable = (str, delim = ',') => {
        const headers = str.slice(0, str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n') + 1).split('\n');
        const newArray = rows.map(row => {
            let values = [];
            if (/"/.test(row)) {
                let i = 0;
                while (i < headers.length) {
                    if (row.startsWith('"')) {//charAt()
                        row = row.substring(1, row.length);
                        values.push(row.split('"', 1));//.replace(',', '')
                        row = row.substring(row.indexOf('"') + 2, row.length);
                    }
                    else {
                        values.push(row.split(delim, 1));
                        row = row.substring(row.indexOf(delim) + 1, row.length);
                    }
                    i++;
                }
            }
            else {
                values = row.split(delim);
            }
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {});
            return eachObject;

        });
        props.setTableCsv({ header: headers, list: newArray });
    }

    const onChange = (e) => {
        setFile(e.target.files[0]);
        /*
          let reader = new FileReader();
          if (e.target.files[0]) {
              reader.onload = function (e) {
                  const data = e.target.result;
                  csvToTable(data);
              }
              reader.readAsText(file);
          }
          */
    }

    const option_broker = [
        {
            value: "tastyworks",
            label: "Tastyworks",
        },
    ];

    return (
        <div {...rest} className={clsx(classes.root, className)}>

            <div className={classes.row}>
                <TextField
                    margin="dense"
                    id="broker"
                    name="broker"
                    required="true"
                    label="Kind broker"
                    type="text"
                    onChange={handleChange}
                    // fullWidth
                    variant="standard"
                    select
                    // eslint-disable-next-line react/jsx-sort-props
                    SelectProps={{ native: true }}
                    value={values.broker}
                >
                    <option key={"0"} value={"0"}>
                        {"Select Broker"}
                    </option>
                    {option_broker.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>

                <input type={"file"} accept={".csv"} id={"file"} onChange={onChange} />
                <span className={classes.spacer} />
                <Button
                    className={classes.importButton}
                    onClick={onClickImport}>
                    <Translate value="upload" />
                </Button>
                <Button
                    className={classes.importButton}
                    onClick={onClickSave}>
                    <Translate value="save" />
                </Button>
            </div>
        </div>
    );
};

Toolbar.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};


function mapStateToProps(reducer) {
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        list: reducer.import_.list,
        header: reducer.import_.header,
    };
}
const mapDispatchToProps = dispatch => ({
    setTableCsv: (data) =>
        dispatch(actions.setTableCSV(data)),
    newList: (params, token) =>
        dispatch(actions.newList({ params, token })),
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