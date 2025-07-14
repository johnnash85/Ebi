import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CommentIcon from '@mui/icons-material/Comment';
import MessageIcon from '@mui/icons-material/Message';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import YoutubeEmbed from '../YoutubeEmbed';
import CommentBtnRight from './components/CommentBtnRight';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function getEmbedId(url) {
    const array = url.split(' ');
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    for (let index = 0; index < array.length; index++) {
        var element = array[index];
        if (element.indexOf("https://") >= 0) {
            var match = element.match(regExp);
            if (match && match[7].length == 11) {
                return match[7];
            } else {
                return false;
            }
        }
    }
}

function getStockLink(comment) {
    /* const array = comment.split(' ');
     let val;
     for (let index = 0; index < array.length; index++) {
         var element = array[index];
         if (element.indexOf("#") >= 0) {
             var ticker = element.substring(1, element.length);
             const link = `<a href='/ebi/stock/${ticker}' >#${ticker}</a>`;
             comment = comment.replace("#" + ticker, link);
         }
     }
     return comment;*/
    return comment.split(' ');
}///ebi/stock/${ticker}

export default function CommentItem(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card style={{ "marginTop": "10px", "marginBottom": "10px" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "#9f9898" }} aria-label="recipe">
                        {props.item.user.avatar}
                    </Avatar>
                }
                action={
                    <CommentBtnRight item={props.item} />
                }
                title={<Link to={"/profile/" + props.item.user.id} component={RouterLink} style={{ "fontWeight": "bold" }}>{props.item.user.username}</Link>}
                subheader={props.item.created_at}
            />
            {
                props.item.media && (
                    <CardMedia
                        component="img"
                        height="auto"
                        width="100%"
                        image={props.item.media}
                        alt="Ebi-Img"
                    />
                )
            }
            {
                getEmbedId(props.item.comment) && (<YoutubeEmbed embedId={getEmbedId(props.item.comment)} />)
            }

            <CardContent>
                <div style={{ "flexDirection": "row", "display": "flex" }}>
                    {
                        getStockLink(props.item.comment).map((element) => {
                            return (
                                element.indexOf('#') >= 0 ? (
                                    <React.Fragment>
                                        <Link to={`/stock/${element.substring(1, element.length)}`} component={RouterLink} style={{ "fontWeight": "bold" }}>{element}
                                        </Link>
                                        &nbsp;
                                    </React.Fragment>
                                )
                                    : (<div style={{ "whiteSpace": "pre-wrap" }}
                                        dangerouslySetInnerHTML={{ __html: element + " " }}
                                    />)
                            )
                        })}
                </div>

            </CardContent>
            <CardActions disableSpacing style={{ "display": "flex", "justifyContent": "space-between" }}>
                <div>
                    <span style={{ "color": "#9f9898" }}>{props.item.like.countUp}</span>
                    <IconButton aria-label="up" onClick={props.onClickUp}>
                        <TrendingUpIcon sx={{ color: props.item.like.reaction === 1 && "black" }} />
                    </IconButton>

                    <span style={{ "color": "#9f9898" }}>{props.item.like.countDown}</span>
                    <IconButton aria-label="down" onClick={props.onClickDown}>
                        <TrendingDownIcon sx={{ color: props.item.like.reaction === 2 && "black" }} />
                    </IconButton>
                </div>
                <div>
                    <span style={{ "color": "#9f9898" }}>{props.item.count_subcomment}</span>
                    <RouterLink to="/comment">
                        <IconButton aria-label="up" onClick={props.onClickComment}>
                            <CommentIcon />
                        </IconButton>
                    </RouterLink>
                    <span style={{ "color": "#9f9898" }}>{"0"}</span>
                    <IconButton aria-label="down">
                        <ShareIcon />
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
}
/**
 * color="disabled" 
 *  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
 <Collapse in={expanded} timeout="auto" unmountOnExit collapsedSize={"height:30px"}>
   <span style={{ "whiteSpace": "pre-wrap" }} >{props.item.comment}</span>
 </Collapse>
            <CardContent>
               
            </CardContent>
 */