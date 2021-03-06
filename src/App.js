import { useCallback, useEffect, useState } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import expand from "./animations/Expand";
import orbit from './animations/Orbit';

function App() {

  const widthFactor = 0.75;
  const heightFactor = 0.75;
  const numPointsMin = 1;
  const numPointsMax = 500;
  const width = window.innerWidth * widthFactor;
  const height = window.innerHeight * heightFactor;

  const animations = {
    none: () => { },
    expand: (particles, index, ctx, frameCount) => expand(particles, index, ctx),
    orbit: (particles, index, ctx, frameCount) => orbit(particles, index, ctx, frameCount)
  }

  const [options, setOptions] = useState({
    numPoints: 50,
    firstColor: '#23D100',
    secondColor: '#135FC3',
    accentColor: '#DEDC47',
    strokeSize: 1,
    strokeColor: '#000000',
    animation: animations['none']
  });

  const [showMenu, setShowMenu] = useState(true);

  const randomParticles = useCallback(
    () => Array.from({ length: options.numPoints }, () => [Math.random() * width, Math.random() * height]),
    [height, width, options.numPoints]
  );

  const [particles, setParticles] = useState(randomParticles());

  useEffect(() => {
    if (options.numPoints >= numPointsMin && options.numPoints <= numPointsMax) {
      setParticles(randomParticles(options.numPoints));
    }
  }, [options.numPoints, randomParticles]);

  const onControlChange = (val, key) => {
    let newOptions = { ...options };
    newOptions[key] = val;
    setOptions(Object.assign({}, newOptions));
  }

  const onResetClick = () => {
    setParticles(randomParticles(options.numPoints));
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
    setParticles(randomParticles())
  }

  return (
    <div className="App">
      <div className="Canvas">
        <Canvas
          height={window.innerHeight * heightFactor}
          width={window.innerWidth * widthFactor}
          particles={particles}
          {...options}
        />
        <span className="ToggleButton">
          <button onClick={() => toggleMenu()}>
            {
              showMenu ?
                <i className="fa fa-times" aria-hidden="true"></i> :
                <i className="fa fa-bars" aria-hidden="true"></i>
            }
          </button>
        </span>
      </div>
      {
        showMenu &&
        <div className="Controls">
          <Controls
            options={options}
            animations={animations}
            numPointsMax={numPointsMax}
            numPointsMin={numPointsMin}
            onResetClick={() => onResetClick()}
            onOptionsChange={(val, key, resetPoints) => onControlChange(val, key, resetPoints)}
          />
        </div>
      }
    </div>
  );
}

export default App;
