import './Controls.css';
import PropTypes from 'prop-types';
import React from 'react';

const Controls = props => {

    const minNumPoints = 1;
    const maxNumPoints = 300;

    return <div className="Controls">
        <input
            type="number"
            value={props.numPoints}
            min={minNumPoints}
            max={maxNumPoints}
            onChange={(e) => props.onNumPointsChange(e.target.value)}
        >
        </input>

        <input
            type="color"
            value={props.firstColor}
            onChange={(e) => props.onFirstColorChange(e.target.value)}
        >
        </input>
    </div>
}

Controls.propTypes = {
    numPoints: PropTypes.number.isRequired,
    onNumPointsChange: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    onFirstColorChange: PropTypes.string.isRequired
}

export default Controls;