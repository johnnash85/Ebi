import * as React from 'react';
import "./styles.css"

export default function InputDate(props) {
    return (
        <div className="input-control">
            <label >{props.label}</label>
            <input
                type="date"
                className={props.variant}
                id={props.id}
                name={props.name}
                required={props.required}
                placeHolder={props.placeHolder}
                value={props.value}
                onChange={props.onChange}
                min={props.min}
                max={props.max}
                disabled={props.disabled || false}
            />
        </div>
    );
}