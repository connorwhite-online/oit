import './App.css';
import Menu from './components/Menu';
import Landing from './components/Landing';
import Scene from './components/Scene';
import Loader from './components/Loader';

function App() {
  return (
    <div className="app">
      <Loader />
      <Menu />
      <Landing />
      <Scene />
    </div>
  );
}

export default App;
