import './App.css';
import Canvas from './components/Canvas';

function App() {

  const widthFactor = 0.75;
  const heightFactor = 0.75

  return (
    <div className="App">
      <Canvas height={window.innerHeight * heightFactor} width={window.innerWidth * widthFactor} />
    </div>
  );
}

export default App;
