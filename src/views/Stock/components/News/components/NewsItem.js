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
//import { Link as RouterLink } from "react-router-dom";


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




export default function NewsItem(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card style={{ "marginTop": "10px", "marginBottom": "10px" }}>
            <CardHeader
                avatar={
                    <img
                        src={props.item.image_url}
                        style={{
                            "height": "80px",
                            "width": "120px"
                        }}
                    />
                }
                action={<small style={{ "color": "gray" }}> {props.item.published_utc}</small>}

                title={<Link href={props.item.article_url} component="a" target="_blank" style={{ "fontWeight": "bold" }}>{props.item.title}</Link>}
                subheader={props.item.description}
            />
            {
                props.item.publisher && (

                    <div style={{
                        "display": "flex",
                        "padding": "20px",
                        "justifyContent": "flex-end"
                    }}>
                        <Link href={props.item.publisher.homepage_url} component="a" target="_blank" style={{
                            "whiteSpace": "pre-wrap",
                            "fontSize": "small"
                        }} >By {props.item.publisher.name}</Link>
                        <Avatar
                            alt="Person"
                            src={props.item.publisher.logo_url}
                            style={{
                                "height": "10px",
                                "padding": "5px"
                            }}
                        />

                    </div>
                )
            }


            <CardContent>

            </CardContent>

        </Card>
    );
}