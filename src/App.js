import { useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Controls from './components/Controls';

function App() {

  const widthFactor = 0.75;
  const heightFactor = 0.75;

  const [numPoints, setNumPoints] = useState(50);
  const [firstColor, setFirstColor] = useState('#d00');

  return (
    <div className="App">
      <div className="Canvas">
        <Canvas
          height={window.innerHeight * heightFactor}
          width={window.innerWidth * widthFactor}
          numPoints={numPoints}
          firstColor={firstColor}
        />
      </div>
      <div className="Controls">
        <Controls
          numPoints={numPoints}
          onNumPointsChange={(val) => setNumPoints(val)}
          firstColor={firstColor}
          onFirstColorChange={(val) => setFirstColor(val)}
        />
      </div>
    </div>
  );
}

export default App;
