import React from 'react';
import './Spinner.css';

function Spinner(properties) {
    const {text} = properties;

    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <h2>{text}</h2>
        </div>
    );
}

export default Spinner;
