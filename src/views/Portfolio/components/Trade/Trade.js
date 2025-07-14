import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,

    Tooltip,
    TableSortLabel,
    Link,
    IconButton,
} from '@material-ui/core';
import { CSVLink, CSVDownload } from "react-csv";
//import ArrowRightIcon from '@material-ui/icons/ArrowRight';
//import { EntryModal, Row } from './components';
//import PlusIcon from '@material-ui/icons/Add';
import { connect } from "react-redux";
import * as actions_stock from "redux/actions/stockActions";
import * as actions_option from "redux/actions/optionTradeActions";
import { Translate, I18n } from "react-redux-i18n";
import ListStockSelect from 'components/ListStockSelect';
import { EntryModalStock, Row, SubRow } from './components';
import MiniLoader from "components/MiniLoader";
import { SpaceBar } from '@mui/icons-material';

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 800
    },
    statusContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    status: {
        marginRight: theme.spacing(1)
    },
    actions: {
        justifyContent: 'flex-end'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'baseline'
    },
    button: {
        paddingInline: "10px",
        color: "gray"
    },
    label: {
        borderStyle: "groove",
        padding: "7px",
        borderRadius: "5px",
        marginInline: "5px"
    }

}));

const stylesLocal = {
    subcell: {
        padding: "5px"
    },
    cell: {
        padding: "8px"
    }
};




const Trade = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const [list, setList] = useState(props.list);
    //const [cap, setCap] = useState(0.0);
    const headers = [
        { label: "Opn Int", key: "opn_int" },
        { label: "Delta", key: "delta" },
        { label: "Volm", key: "volm" },
        { label: "Bid", key: "bid" },
        { label: "Ask", key: "ask" },
        { label: "Strike", key: "strike" },
        { label: "Bid", key: "bid" },
        { label: "Ask", key: "ask" },
        { label: "Volm", key: "volm" },
        { label: "Delta", key: "delta" },
        { label: "Opn Int", key: "opn_int" },
    ];

    const dataCsv = () => {
        let data = [];
        props.list.forEach(element => {
            let item = {};
            headers.forEach(ref => {
                item = {
                    ...item,
                    [ref.key]: element[ref.key]
                };
            });
            data = data.concat(item);
        });
        return data;
    }

    useEffect(() => {
        setDialogState(
            {
                isValid: false,
                values: {
                    name: "fuboTV Inc.",
                    symbol: "FUBO",
                    bid: getPriceStockBid({ symbol: "FUBO", price: 0 }),
                    ask: getPriceStockAsk({ symbol: "FUBO", price: 0 }),
                    id: props.user_id,
                    rows: 6
                },
                touched: {},
                errors: {}
            }
        );
        props.loadList({
            id: props.user_id,
            symbol: dialogState.values.symbol,
            rows: dialogState.values.rows
        }, props.token);
    }, []);//list

    const [dialogState, setDialogState] = useState({
        isValid: false,
        values: {
            //quantity: 1,
            //open_price: 0.01,
            //strike: 1,
            // open_at: new Date().toISOString().split('T')[0],
            // expire_at: new Date().toISOString().split('T')[0],
            //share: false,

            name: "fuboTV Inc.",
            symbol: "FUBO",
            bid: 0,
            ask: 0,
            id: props.user_id,
            rows: 6
        },
        touched: {},
        errors: {}
    });

    const onClickSelected = (item) => {
        setDialogState(dialogState => ({
            ...dialogState,
            values: {
                ...dialogState.values,
                symbol: item.symbol,
                name: item.name,
                bid: getPriceStockBid(item),
                ask: getPriceStockAsk(item)
            },
        }));
        props.resetList();
        props.loadList({
            id: props.user_id,
            symbol: dialogState.values.symbol,
            rows: dialogState.values.rows
        }, props.token);
    };

    const handleChangeSymbol = (event) => {
        event.persist();
        if (event.target.value.trim() !== dialogState.values.symbol) {
            setDialogState(dialogState => ({
                ...dialogState,
                values: {
                    ...dialogState.values,
                    [event.target.name]: event.target.value.trim(),
                    name: ""
                },
                touched: {
                    ...dialogState.touched,
                    [event.target.name]: true
                }
            }));
            props.searchList({ id: props.user_id, search: event.target.value }, props.token);
        }
        else props.resetList();
    };

    const getPriceStockBid = (item) => {
        let quote = (props.stock[item.symbol] && props.stock[item.symbol].o) || item.price || 0.00;
        return quote && quote.toFixed(2);
    }
    const getPriceStockAsk = (item) => {
        let quote = (props.stock[item.symbol] && props.stock[item.symbol].c) || item.price || 0.00;
        return quote && quote.toFixed(2);
    }

    const option_row = [
        {
            value: 0,
            label: 6,
        }, {
            value: 1,
            label: 8,
        },
        {
            value: 2,
            label: 10,
        },
        {
            value: 3,
            label: 12,
        }
    ];
    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                title={""}
            >
            </CardHeader>
            <div className={classes.toolbar}>
                <Typography variant="body2" color="text.secondary" style={{ "paddingInline": "10px" }}>
                    Ticker
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="symbol"
                    name="symbol"
                    required
                    //label="Symbol"
                    type="text"
                    onChange={handleChangeSymbol}
                    //fullWidth
                    sx={{ m: 1, width: '15ch' }}
                    autoComplete="off"
                    value={dialogState.values.symbol && dialogState.values.symbol.toLocaleUpperCase()}
                    variant="outlined"
                    style={{ "paddingInline": "10px" }}
                //error={hasError('symbol')}
                // helperText={
                //   hasError('symbol') ? dialogState.errors.symbol[0] : null
                //  }
                />
                <EntryModalStock
                    button_name={"Bid"}
                    symbol={dialogState.values.symbol}
                    name={dialogState.values.name}
                    price={dialogState.values.bid}
                    kind={"SELL"}
                />
                <label className={classes.label}>{dialogState.values.bid}</label>
                <label className={classes.label}>{dialogState.values.ask}</label>
                <EntryModalStock
                    button_name={"Ask"}
                    symbol={dialogState.values.symbol}
                    name={dialogState.values.name}
                    price={dialogState.values.ask}
                    kind={"BUY"}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    label=" "
                    disabled
                    type="text"
                    value={dialogState.values.name}
                    //fullWidth
                    //sx={{ m: 2, width: '100px' }}
                    variant="standard"
                    autoComplete="off"
                    style={{ "paddingInline": "10px", width: '300px' }}
                />
                <span style={{ "width": "100%" }} />
                <TextField
                    margin="dense"
                    id="row"
                    name="row"
                    required="true"
                    label="Row"
                    type="text"
                    //onChange={handleChange}
                    // disabled
                    // fullWidth
                    style={{ "width": "100px", "padding": "10px" }}
                    sx={{ m: 1, width: '12ch' }}
                    variant="standard"
                    select
                    // eslint-disable-next-line react/jsx-sort-props
                    SelectProps={{ native: true }}
                    value={dialogState.values.row}
                >
                    {option_row.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </div>
            {
                dialogState.values.symbol.length > 0 && props.list.length > 0 && (< ListStockSelect list={props.list} onClickSelected={onClickSelected} />)
            }

            <Divider />
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right"> Opn Int</TableCell>
                                    <TableCell align="right">Delta</TableCell>
                                    <TableCell align="right">Volm</TableCell>
                                    <TableCell align="right">Bid</TableCell>
                                    <TableCell align="right">Ask</TableCell>
                                    <TableCell sortDirection="desc" align="center" >Strike</TableCell>
                                    <TableCell align="right">Bid</TableCell>
                                    <TableCell align="right">Ask</TableCell>
                                    <TableCell align="right">Volm</TableCell>
                                    <TableCell align="right">Delta</TableCell>
                                    <TableCell align="right">Opn Int</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    props.listOption.map((item, index) => (
                                        <Row
                                            key={index}
                                            item={item}
                                            price={12}//(dialogState.values.ask + dialogState.values.bid) / 2
                                        />
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <Divider />
            {
                props.loadingOption && (
                    <CardActions style={{ "justifyContent": "center", }}>
                        <MiniLoader />
                    </CardActions>
                )
            }
        </Card>
    );
};

Trade.propTypes = {
    className: PropTypes.string
};

function mapStateToProps(reducer) {
    // console.log(reducer);
    return {

        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        list: reducer.stock.list,
        error: reducer.stock.error,
        loading: reducer.stock.loading,

        stock: reducer.event.stock,

        listOption: reducer.optionTrade.list,
        errorOption: reducer.optionTrade.error,
        loadingOption: reducer.optionTrade.loading,
    };
}
const mapDispatchToProps = dispatch => ({
    loadList: (params, token) =>
        dispatch(actions_option.loadList({ params, token })),
    /////////
    searchList: (params, token) =>
        dispatch(actions_stock.searchList({ params, token })),
    resetList: () =>
        dispatch(actions_stock.resetList({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
/**
 *   

                                action={

                }

 */
