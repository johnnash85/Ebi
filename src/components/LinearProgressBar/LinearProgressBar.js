import "./styles.css"
import React, { Component } from 'react';

const LinearProgressBar = (props) => {
    return (
        <div className={"mainProgressBarDiv"} style={props.style}>
            <div className={"emptyProgressBar"} style={{ width: "100%" }}>
                <div
                    className={props.color == "green" ? "fillingProgressBarG" : "fillingProgressBarR"}
                    style={{
                        left: props.percent - 100 + "%",
                        transition: "3s"
                    }}
                />
            </div>
            <small style={{
                "position": "relative",
                "left": "45%",
                "top": "-15px",
                "fontWeight": "bold"
            }}>{props.value}</small>
        </div>
    );
};

export default LinearProgressBar;