import React from 'react';
import './style.css';

function Squares(props) {
    return (
     <div className="symbol" onClick={props.click}>{props.value}</div>
    );
}

export default Squares;