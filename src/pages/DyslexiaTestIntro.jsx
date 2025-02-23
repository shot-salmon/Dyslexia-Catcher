import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './pages.css';

const DyslexiaTestIntro = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the HopperHack <br/> Dyslexia Test!</h1>
      <p>
        Have you ever felt strangely <span style={{ color: "#DB4455"}}>confused</span> while reading? <br/>
        Dyslexia you never knew about – check it in just 10 minutes!
      </p>
      <br/>
      <button className="startButton" onClick={() => navigate("/explain")}>
        Start!
      </button>
    </div>
  );
};

export default DyslexiaTestIntro;
