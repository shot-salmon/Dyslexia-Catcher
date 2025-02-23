// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome the HopperHack <br/> Dyslexia Test!</h1>
        <p>Have you ever felt strangely <span style={{ color: "#DB4455"}}>confused</span> while reading? <br/>Dyslexia you never knew about check it in just 10 minute!</p>
        <br/>
        <button className="startButton" onClick={() => alert("!")}>Start!</button>
      </header>
    </div>
  );
}

export default App;
