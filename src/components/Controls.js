import './Controls.css';
import PropTypes from 'prop-types';
import React from 'react';

const Controls = props => {
    const minStrokeSize = 0;
    const maxStrokeSize = 20;

    return <div className="Controls">
        <fieldset>
            <div className="table">
                <div>
                    <label>Number of Points:</label>
                    <input
                        type="number"
                        value={props.options.numPoints}
                        min={props.numPointsMin}
                        max={props.numPointsMax}
                        onChange={(e) => props.onOptionsChange(e.target.value, 'numPoints')}
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
                    <label>Accent Color:</label>
                    <input
                        type="color"
                        value={props.options.accentColor}
                        onChange={(e) => props.onOptionsChange(e.target.value, 'accentColor')}
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

                <div>
                    <label>Animation:</label>
                    <select onChange={(e) => props.onOptionsChange(props.animations[e.target.value], 'animation')} name="animations">
                        <option value="none">None</option>
                        <option value="expand">Expand</option>
                        <option value="orbit">Orbit</option>
                    </select>
                </div>
            </div>

            <div className='buttonContainer'>
                <button onClick={() => props.onResetClick()}>Reset</button>
            </div>
        </fieldset>
    </div>
}

Controls.propTypes = {
    options: PropTypes.object.isRequired,
    onOptionsChange: PropTypes.func.isRequired,
}

export default Controls;