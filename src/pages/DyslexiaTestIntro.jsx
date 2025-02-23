import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./pages.css";

const DyslexiaTestIntro = () => {
  const navigate = useNavigate();
  const [scrambledText, setScrambledText] = useState("Readability");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0});

  useEffect(() => {
    const originalText = "Readability";
    let scrambled = originalText
      .split("")
      .map(value => ({ value, sort: Math.random() })) // 객체 형태로 정렬
        .sort((a, b) => a.sort - b.sort) // Math.random() 값 기준으로 정렬
        .map(({ value }) => value) // 다시 문자만 추출
        .join("");
    
    setScrambledText(scrambled);

    setTimeout(() => {
      setScrambledText(originalText);

    }, 2500);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="background">
      {/* 흐릿한 배경 텍스트 */}
      <span className="blurred-text moving-text" style={{ left: `${10 + mousePos.x * 0.01}%`, top: `${20 + mousePos.y * 0.01}%` }}>dyslexia</span>
      <span className="blurred-text moving-text" style={{ left: `${50 + mousePos.x * 0.02}%`, top: `${30 + mousePos.y * 0.02}%` }}>reading</span>
      <span className="blurred-text moving-text" style={{ left: `${70 + mousePos.x * 0.015}%`, top: `${50 + mousePos.y * 0.015}%` }}>words</span>
      <span className="blurred-text moving-text" style={{ left: `${20 + mousePos.x * 0.01}%`, top: `${70 + mousePos.y * 0.01}%` }}>letters</span>
      <span className="blurred-text moving-text" style={{ left: `${80 + mousePos.x * 0.02}%`, top: `${20 + mousePos.y * 0.02}%` }}>confusion</span>

      <div>
        <h3 className="scrambled-text">
          {scrambledText}
        </h3>
        <p>Welcome to HopperHack Dyslexia Test!</p>
        <p>
          Have you ever felt strangely{" "}
          <span className="shake-text" style={{ color: "#DB4455" }}>
            confused
          </span>{" "}
          while reading?
        </p>
        <p>Dyslexia you never knew about – check it in just 10 minutes!</p>
        <br />
        <button className="startButton" onClick={() => navigate("/explain")}>
          Start Now!
        </button>
      </div>
    </div>
  );
};

export default DyslexiaTestIntro;
