import { Button, Grid } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import FaqItem from "./components/FaqItem";
import { connect } from "react-redux";
import * as actions from "redux/actions/faqActions";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Translate, I18n } from "react-redux-i18n";
import { SearchInput } from 'components';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        marginTop: theme.spacing(2),
    },
}));

const Faq = (props) => {
    const classes = useStyles();
    const { className, history, ...rest } = props;
    const [list, setList] = useState(props.list);
    const [question, setQuestion] = useState("");

    useEffect(() => {
        props.loadList({
            id: props.user_id,
            lang: props.lang
        }, props.token);
    }, list);

    const onClick = () => {
        props.newItem({
            id: props.user_id,
            question: question,
            lang: props.lang
        }, props.token);
        setQuestion("");
        alertify.success("Success");
    }

    const onChange = (event) => {
        setQuestion(event.target.value);
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={8}
                    xs={12}
                >
                    <div className={classes.content}>
                        <Card style={{ "marginTop": "10px", "marginBottom": "10px" }}>
                            <CardHeader
                                title={<Typography variant="h2" style={{ "fontWeight": "bold" }}>  <Translate value="faq" /> </Typography>}
                            />
                            <div style={{ "flexDirecction": "row", "display": "flex", "justifyContent": "center" }}>
                                <SearchInput
                                    onChange={onChange}
                                    value={question}
                                />
                                <Button color="primary"
                                    onClick={onClick}
                                    variant="contained"
                                > <Translate value="send" />
                                </Button>
                            </div>
                            {
                                props.list.map((item) => (
                                    <FaqItem
                                        key={item.id}
                                        item={item}
                                    />
                                ))
                            }
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

History.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};
// <Toolbar history={history} />
// <Table list={props.list} />
function mapStateToProps(reducer) {
    //console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,
        lang: reducer.i18n.locale,
        list: reducer.faq.list,
        error: reducer.faq.error,
        loading: reducer.faq.loading,

    };
}
const mapDispatchToProps = dispatch => ({
    loadList: (params, token) =>
        dispatch(actions.loadList({ params, token })),
    newItem: (params, token) =>
        dispatch(actions.newItem({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Faq);