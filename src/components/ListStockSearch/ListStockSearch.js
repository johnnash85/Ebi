import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link as RouterLink } from "react-router-dom";
import WatchListModal from 'components/WatchListModal';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({

    avatar: {
        height: 30,
        width: 30,
        borderRadius: "5px"
    },

}));

export default function ListStockSearch(props) {
    const classes = useStyles();
    return (
        <List style={{
            width: '100%',
            maxWidth: 350,
            bgcolor: 'white',
            position: "absolute",
            top: "60px",
            background: "white",
            "boxShadow": "0px -8px 15px 3px rgb(0 0 0 / 15%), 0px 8px 15px 3px rgb(0 0 0 / 15%)",
        }}

        >
            {props.list.map((item) => {
                const labelId = `checkbox-list-secondary-label-${item.id}`;
                return (<React.Fragment>
                    <ListItem
                        key={item}
                        secondaryAction={
                            <WatchListModal symbol={item.symbol} />
                        }
                        disablePadding
                    >
                        <RouterLink to={`/stock/${item.symbol}`}>
                            <ListItemButton component="a" style={{ "width": "280px" }} onClick={() => { props.onClickStock(item) }} >
                                <ListItemAvatar>
                                    <img
                                        alt={""}
                                        className={classes.avatar}
                                        src={item.icon_url}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={<span style={{ "fontWeight": "bold" }} >{item.symbol}</span>}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {item.name}
                                            </Typography>
                                        </React.Fragment>
                                    } />
                            </ListItemButton>
                        </RouterLink>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>

                );
            })}
        </List>
    );
}
/**
 * `img${item.id}`
 * 
                                <AddIcon />
                            </IconButton>
                            <RouterLink to={`/stock/${item.symbol}`}>
                        </RouterLink>
 */