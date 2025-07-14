import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
//import { Table, Toolbar } from "./components";
import NewsItem from "./components/NewsItem";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/base/TextareaAutosize';
//import "./styles.css";
import {
    Button,
} from '@material-ui/core';
import CancelIcon from '@mui/icons-material/Cancel';
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/stockNewsActions";
import CardActions from '@mui/material/CardActions';
import { Translate, I18n } from "react-redux-i18n";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        marginTop: theme.spacing(2),
    },
}));

const News = (props) => {

    const classes = useStyles();
    const { className, history, ...rest } = props;
    //const [list, setList] = useState(props.list);

    const [values, setValues] = useState({});
    /*
        useEffect(() => {
            props.loadList({
                id: props.user_id,
                symbol: props.symbol
            }, props.token);
        }, props.item);
    */
    const onClickSend = (event) => {
    }

    const onClickCloseImg = (event) => {
    }


    const onClickUp = (item) => {
        //console.log(event)
    }

    const onClickDown = (item) => {
        //console.log(event)
    }

    return (
        <div style={{// "height": "calc(100vh - 170px)" 
        }}>
            <div style={{
                // "overflowY": "auto",
                // "height": "inherit"
            }}>
                {
                    props.list.map((item) => (
                        <NewsItem
                            key={item.id}
                            item={item}
                            onClickUp={() => { onClickUp(item) }}
                            onClickDown={() => { onClickDown(item) }}
                        />
                    ))
                }
                <div style={{
                    "display": "flex",
                    "justifyContent": "center",
                    "padding": "10px"
                }}>
                    <Button className="Link">
                        <Translate value="load_more" />
                    </Button>
                </div>
            </div>
        </div >
    );
};

News.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};

function mapStateToProps(reducer) {
    //  console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        symbol: reducer.stock.item.symbol,

        list: reducer.stockNews.list,
        error: reducer.stockNews.error,
        loading: reducer.stockNews.loading,

    };
}
const mapDispatchToProps = dispatch => ({
    //  loadList: (params, token) =>
    //     dispatch(actions.loadList({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
//   <Toolbar />  <Table list={props.list} />

/**
 *  {this.props.commentList.map(item => {
                            return (
                                <ComentItem
                                    comment={item}
                                    key={item.Id}
                                    onClickUp={() => {
                                        this.onClickUp(item);
                                    }}
                                    onClickDown={() => {
                                        this.onClickDown(item);
                                    }}
                                />
                            );
                        })}
                         <div className={classes.root}>
            <div className={classes.content}>
            </div>
        </div>
         //style={{ "width": "inherit", "fontFamily": "inherit", "fontSize": "initial" }}
 */