import { useCallback, useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import expand from "./animations/Expand";

function App() {

  const widthFactor = 0.75;
  const heightFactor = 0.75;
  const width = window.innerWidth * widthFactor;
  const height = window.innerHeight * heightFactor;

  const animations = {
    none: () => {},
    expand: (particles, index, ctx) => expand(particles, index, ctx)
  }

  const [options, setOptions] = useState({
    numPoints: 50,
    firstColor: '#d00000',
    secondColor: '#ffffff',
    strokeSize: 1,
    strokeColor: '#000000',
    animation: animations['none']
  });

  const randomParticles = useCallback(
    () => Array.from({ length: options.numPoints }, () => [Math.random() * width, Math.random() * height]),
    [height, options.numPoints, width]
  );

  const [particles, setParticles] = useState(randomParticles());

  const onControlChange = (val, key) => {
    let newOptions = { ...options };
    newOptions[key] = val;
    setOptions(Object.assign({}, newOptions));
  }

  const onResetClick = () => {
    setParticles(randomParticles());
  }
  
  return (
    <div className="App">
      <div className="Canvas">
        <Canvas
          height={window.innerHeight * heightFactor}
          width={window.innerWidth * widthFactor}
          animation={options.animation}
          numPoints={options.numPoints}
          particles={particles}
          firstColor={options.firstColor}
          secondColor={options.secondColor}
          strokeSize={options.strokeSize}
          strokeColor={options.strokeColor}
        />
      </div>
      <div className="Controls">
        <Controls
          options={options}
          animations={animations}
          onResetClick={() => onResetClick()}
          onOptionsChange={(val, key) => onControlChange(val, key)}
        />
      </div>
    </div>
  );
}

export default App;
