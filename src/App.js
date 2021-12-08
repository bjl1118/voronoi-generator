import { useMemo, useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Controls from './components/Controls';

function App() {

  const widthFactor = 0.75;
  const heightFactor = 0.75;
  const width = window.innerWidth * widthFactor;
  const height = window.innerHeight * heightFactor;

  const [options, setOptions] = useState({
    numPoints: 50,
    firstColor: '#d00000',
    secondColor: '#ffffff',
    strokeSize: 1,
    strokeColor: '#000000'
  });

  const onControlChange = (val, key) => {
    let newOptions = { ...options };
    newOptions[key] = val;
    setOptions(Object.assign({}, newOptions));
  }

  const particles = useMemo(
    () => Array.from({ length: options.numPoints }, () => [Math.random() * width, Math.random() * height]),
    [height, options.numPoints, width]
  );
  
  return (
    <div className="App">
      <div className="Canvas">
        <Canvas
          height={window.innerHeight * heightFactor}
          width={window.innerWidth * widthFactor}
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
          onOptionsChange={(val, key) => onControlChange(val, key)}
        />
      </div>
    </div>
  );
}

export default App;
