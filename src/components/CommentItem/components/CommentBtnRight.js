import * as React from "react";
import { useState } from "react";
//import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
//import { Translate } from "react-redux-i18n";//, I18n 
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { connect } from "react-redux";
import * as actions from "redux/actions/commentActions";
import { Translate, I18n } from "react-redux-i18n";

const ITEM_HEIGHT = 48;
const options = [
    'Delete',
];
const CommentBtnRight = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    const onClickDelete = (e) => {
        props.removeItem(
            {
                comment_id: props.item.id,
                id: props.user_id
            }
            , props.token)
        setAnchorEl(null);
    };
    const onClickReport = (e) => {
        props.reportItem(
            {
                comment_id: props.item.id,
                id: props.user_id
            }
            , props.token)
        setAnchorEl(null);
    };


    return (
        <div>
            <IconButton
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            //onBlur={(e) => {
            //    onClickMenu();
            //}}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '10ch',
                        paddingInline: "2px"
                    },
                }}
            >
                {

                    props.user_id === props.item.user.id
                        ?
                        (
                            <MenuItem key={1} onClick={onClickDelete} style={{ "width": "100%" }}>
                                <Translate value="delete" />
                            </MenuItem>
                        )
                        :
                        (
                            <MenuItem key={1} onClick={onClickReport} style={{ "width": "100%" }}>
                                <Translate value="banned" />
                            </MenuItem>
                        )
                }
            </Menu>
        </div>
    );

}

function mapStateToProps(reducer) {
    // console.log(reducer);   {values.menu}
    return {
        user_id: reducer.session.auth.id,
        token: reducer.session.auth.token,

        user: reducer.session.auth,
        // lang: reducer.i18n.locale,
    };
}

const mapDispatchToProps = dispatch => ({
    removeItem: (params, token) =>
        dispatch(actions.removeItem({ params, token })),
    reportItem: (params, token) =>
        dispatch(actions.reportItem({ params, token })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentBtnRight);

/***  //maxHeight: ITEM_HEIGHT * 4.5,
 * <React.Fragment>
                        <div className="" key={props.item.Id}>
                            <ul className="menu-comments" style={{ left: "-150px" }}>
                                {props.item.user.id.toString() ===
                                    props.user_id ? (
                                    <li
                                        key={props.item.Id}
                                        onClick={props.onClickRemove}
                                        onClickCapture={(e) => {
                                            this.onClickHideMenu(e);
                                        }}
                                    >
                                        <small className="mr-3">
                                            {"Remove"}
                                        </small>
                                    </li>
                                ) : (
                                    <li
                                        key={props.item.id}
                                        onClick={props.onClickReport}
                                        onClickCapture={(e) => {
                                            this.onClickHideMenu(e);
                                        }}
                                    >
                                        <small className="mr-3">
                                            {"Report"}
                                        </small>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </React.Fragment>
 * <div
                className="dropdown-menu dropdown-scale dropdown-menu-right"
                role="menu"
              >
                <Link className="dropdown-item" to="#">
                  Ocultar publicación
                </Link>
                <Link className="dropdown-item" to="#">
                  Reportar
                </Link>
              </div>
              <li>
                  <Link to="" data-toggle="modal" data-target="#product_share">
                    <small>
                      <FaShareAlt />
                    </small>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <small>
                      <FaComments />
                    </small>
                  </Link>
                </li>
 */
