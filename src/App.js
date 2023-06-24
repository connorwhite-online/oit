import './App.css';
import Menu from './components/Menu';
import Landing from './components/Landing';
// import Scene from './components/Scene';
import Loader from './components/Loader';
import About from './components/About';

function App() {
  return (
    <div className="app">
      <Loader />
      <Menu />
      <About />
      {/* <Scene /> */}
      <Landing />
    </div>
  );
}

export default App;
