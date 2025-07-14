import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
//import Avatar from '@mui/material/Avatar';
//import { styled } from '@mui/material/styles';
//import CardMedia from '@mui/material/CardMedia';


export default function Indicator(props) {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Card style={{ "marginTop": "10px", "marginBottom": "10px" }}>
            <CardHeader
                title={props.title}
                subheader={props.price}
            />
            <CardContent>
            </CardContent>
        </Card>
    );
}
