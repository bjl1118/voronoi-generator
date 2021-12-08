import './Controls.css';
import PropTypes from 'prop-types';
import React from 'react';

const Controls = props => {

    const minNumPoints = 1;
    const maxNumPoints = 300;

    const minStrokeSize = 0;
    const maxStrokeSize = 20;

    return <div className="Controls">
        <fieldset>
            <div>
                <label>Number of Points:</label>
                <input
                    type="number"
                    value={props.options.numPoints}
                    min={minNumPoints}
                    max={maxNumPoints}
                    onChange={(e) => props.onOptionsChange(e.target.value || 1, 'numPoints')}
                >
                </input>
            </div>

            <div>
                <label>Outer Color:</label>
                <input
                    type="color"
                    value={props.options.firstColor}
                    onChange={(e) => props.onOptionsChange(e.target.value, 'firstColor')}
                >
                </input>
            </div>

            <div>
                <label>Inner Color:</label>
                <input
                    type="color"
                    value={props.options.secondColor}
                    onChange={(e) => props.onOptionsChange(e.target.value, 'secondColor')}
                >
                </input>
            </div>

            <div>
                <label>Stroke Color:</label>
                <input
                    type="color"
                    value={props.options.strokeColor}
                    onChange={(e) => props.onOptionsChange(e.target.value, 'strokeColor')}
                >
                </input>
            </div>

            <div>
                <label>Stroke Size:</label>
                <input
                    type="number"
                    value={props.options.strokeSize}
                    min={minStrokeSize}
                    max={maxStrokeSize}
                    onChange={(e) => props.onOptionsChange(e.target.value, 'strokeSize')}
                >
                </input>
            </div>

        </fieldset>
    </div>
}

Controls.propTypes = {
    options: PropTypes.object.isRequired,
    onOptionsChange: PropTypes.func.isRequired,
}

export default Controls;