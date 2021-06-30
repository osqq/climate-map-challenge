import React from 'react'

import './CustomSpinner.css';

const Spinner = require('react-spinkit');

export const CustomSpinner = () => {

    return (
        <div id="custom-spinner">
            <Spinner
                className="loading"
                name="three-bounce"
                fadeIn="quarter"
            />
        </div>
    );
 }

 export default CustomSpinner;