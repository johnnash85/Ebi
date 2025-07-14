import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
//import { Table, Toolbar } from "./components";
import { CommentItem } from "components";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import "./styles.css";
import {
    Button,
} from '@material-ui/core';
import CancelIcon from '@mui/icons-material/Cancel';
import { connect } from "react-redux";
import * as actions from "redux/actions/commentActions";
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

const Comments = (props) => {

    const classes = useStyles();
    const { className, history, ...rest } = props;
    const [list, setList] = useState(props.list);

    const [values, setValues] = useState({
        comment: "",
        id: props.user_id,
        image: "",
        file: "",
        hasFile: false,
    });
    /*
        useEffect(() => {
           
        }, list);
    */
    const onClickSend = (event) => {
        let params = new FormData();
        params.append("comment", values.comment);
        params.append("id", values.id);
        params.append("file", values.file);

        props.newItem(params, props.token);
        setValues({
            ...values,
            comment: "",
            image: "",
            file: "",
            hasFile: false,
        });
    }

    const onClickCloseImg = (event) => {
        setValues({
            ...values,
            file: "",
            image: "",
            hasFile: false,
        });
    }

    const onChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }

    const onClickUp = (item) => {
        //console.log(event)
        props.updateLike({
            comment_id: item.id,
            id: props.user_id,
            reaction: "1"
        }, props.token);

    }

    const onClickDown = (item) => {
        //console.log(event)
        props.updateLike({
            comment_id: item.id,
            id: props.user_id,
            reaction: "2"
        }, props.token);

    }

    const onClickComment = (item) => {
        //  console.log("comment");
        props.setItem(item);
        props.loadList({ id: props.user_id }, props.token);
        //props.history.push("/comment");
    }

    const onChangeImage = async (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setValues({
                ...values,
                file: file,
                image: reader.result,
                hasFile: true,
            });
        };
        reader.readAsDataURL(file);
    };

    return (

        <React.Fragment>
            {values.hasFile && (
                <Card style={{}}>
                    <CardActions style={{ "display": "flex", "justifyContent": "flex-end" }}>
                        <IconButton aria-label="up" onClick={onClickCloseImg}>
                            <CancelIcon />
                        </IconButton>
                    </CardActions>
                    <div style={{ "display": "flex", "justifyContent": "center", "paddingBottom": "10px" }}>
                        <img
                            src={values.image}
                            alt="img-coment"
                            className="img-responsive"
                            style={{ "maxHeight": "500px" }}
                        />
                    </div>
                </Card>
            )}
            {
                props.list.map((item) => (
                    <CommentItem
                        key={item.id}
                        item={item}
                        onClickUp={() => { onClickUp(item) }}
                        onClickDown={() => { onClickDown(item) }}
                        onClickComment={() => { onClickComment(item) }}
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

        </React.Fragment>

    );
};

Comments.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object
};

function mapStateToProps(reducer) {
    //console.log(reducer);
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        item: reducer.profile.item,

        list: reducer.comment.list,
        error: reducer.comment.error,
        loading: reducer.comment.loading,
    };
}
const mapDispatchToProps = dispatch => ({

    newItem: (params, token) =>
        dispatch(actions.newItem({ params, token })),
    updateLike: (params, token) =>
        dispatch(actions.updateLike({ params, token })),
    loadList: (params, token) =>
        dispatch(actions.loadList({ params, token })),
    setItem: (item) =>
        dispatch(actions.setItem({ item }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
//   <Toolbar />  <Table list={props.list} />

/**
 *  <Card style={{
                "padding": "10px",
                "flexDirection": "row",
                "marginBottom": "15px",
                "display": "flex",
                "flexDirection": "row",
                "padding": "10px",
                "justifyContent": "space-between",
                "alignItems": "center"
            }}>


                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" id="open_input_img" name="open_img" onChange={onChangeImage} />
                    <PhotoCameraIcon />
                </IconButton>
                <div style={{ "width": "100%" }}>
                    <TextareaAutosize
                        className="text_comment"
                        maxRows={2}
                        placeholder="What's on your mind?"
                        defaultValue=""
                        name="comment"
                        onChange={onChange}
                        value={values.comment}
                    />
                </div>
                <div>
                    <IconButton onClick={onClickSend}>
                        <SendIcon />
                    </IconButton>
                </div>
            </Card>
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