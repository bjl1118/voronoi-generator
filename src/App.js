import { useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Controls from './components/Controls';

function App() {

  const widthFactor = 0.75;
  const heightFactor = 0.75;
  const width = window.innerWidth * widthFactor;
  const height = window.innerHeight * heightFactor;

  const [numPoints, setNumPoints] = useState(50);
  const [firstColor, setFirstColor] = useState('#d00000');
  const [secondColor, setSecondColor] = useState('#ffffff');

  const particles = Array.from({ length: numPoints }, () => [Math.random() * width, Math.random() * height]);

  return (
    <div className="App">
      <div className="Canvas">
        <Canvas
          height={window.innerHeight * heightFactor}
          width={window.innerWidth * widthFactor}
          numPoints={numPoints}
          particles={particles}
          firstColor={firstColor}
          secondColor={secondColor}
        />
      </div>
      <div className="Controls">
        <Controls
          numPoints={numPoints}
          onNumPointsChange={(val) => setNumPoints(val)}
          firstColor={firstColor}
          onFirstColorChange={(val) => setFirstColor(val)}
          secondColor={secondColor}
          onSecondColorChange={(val) => setSecondColor(val)}
        />
      </div>
    </div>
  );
}

export default App;
