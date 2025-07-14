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

export default function ListStockSelect(props) {

    const handleToggle = (value) => () => {

    };

    return (
        <List style={{
            width: '100%',
            maxWidth: 550,
            bgcolor: 'white',
            position: "fixed",
            background: "white",
            zIndex: 1,
            // paddingInline: "inherit",
            "boxShadow": "0px -8px 15px 3px rgb(0 0 0 / 15%), 0px 8px 15px 3px rgb(0 0 0 / 15%)",
        }}

        >
            {props.list.map((item, index) => {
                const labelId = `checkbox-list-secondary-label-${item.id}`;
                return (<React.Fragment key={index}>
                    <ListItem
                        //disablePadding
                        style={{ "paddingInline": "10px", "paddingTop": "0px", "paddingBottom": "0px" }}
                    >
                        <ListItemButton component="a" style={{ "width": "500px", "padding": "0px" }} onClick={() => { props.onClickSelected(item) }} >
                            <ListItemText id={labelId} primary={<span style={{ "fontWeight": "bold" }} >{item.symbol}</span>}
                                secondary={
                                    <React.Fragment>
                                        <span
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {item.name}
                                        </span>
                                    </React.Fragment>
                                } />
                        </ListItemButton>
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
 *  secondaryAction={
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        }
                         <ListItemAvatar>
                                    <img
                                        alt={""}
                                        src={`/static/images/avatar/${item.logo}`}
                                    />
                                </ListItemAvatar>
 */