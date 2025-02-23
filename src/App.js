// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import DyslexiaTestIntro from "./pages/DyslexiaTestIntro.jsx";
import DyslexiaExp from "./pages/DyslexiaExp.jsx";
import TestInstruction from "./pages/TestInstruction.jsx";
import Practice from "./pages/Practice.jsx"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Welcome the HopperHack <br/> Dyslexia Test!</h1>
        <p>Have you ever felt strangely <span style={{ color: "#DB4455"}}>confused</span> while reading? <br/>Dyslexia you never knew about check it in just 10 minute!</p>
        <br/>
        <button className="startButton" onClick={() => alert("!")}>Start!</button> */}
        <Router>
          <Routes>
            <Route path="/" element={<DyslexiaTestIntro />} />
            <Route path="/explain" element={<DyslexiaExp/>} />
            <Route path="/Test" element={<TestInstruction/>} />
            <Route path="/practice" element={<Practice/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
