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
import { Link as RouterLink } from "react-router-dom";
import { YoutubeEmbed } from "components";

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
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length === 11) {
        console.log(match[7]);
        return match[7];
    } else {
        return false;
    }
}

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
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<span style={{ "fontWeight": "bold" }}>{props.item.user.username}</span>}
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
                <span style={{ "whiteSpace": "pre-wrap" }} >{props.item.comment}</span>
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
                        <IconButton aria-label="up" onClick={props.onClickComment} >
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
 </Collapse>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
 */