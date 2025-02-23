import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./pages.css";

const Result = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState(null);
  const [showTips, setShowTips] = useState(false); // 추가 정보 펼치기 상태

  useEffect(() => {
    // 백엔드에서 난독증 분석 결과 가져오기
    fetch("http://localhost:5001/get-analysis") // 예제 API 엔드포인트
      .then((response) => response.json())
      .then((data) => {
        setResultData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching analysis result:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>📊 Fetching Analysis Result...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="background">
    <div className="result-container">
        <div className="headerOf">
        <h1>Readability</h1>
      </div>
      <h2 style={{color: "white"}}>📝 Dyslexia Analysis Result</h2>

      {resultData ? (
        <div className="result-details">
          <p>
            <strong>Speech Accuracy:</strong> {resultData.speechAccuracy}%
          </p>
          <p>
            <strong>Eye Tracking Stability:</strong> {resultData.eyeTracking}%
          </p>
          <p>
            <strong>Overall Score:</strong> {resultData.overallScore}/100
          </p>

          <div className="diagnosis">
            {resultData.overallScore >= 70 ? (
              <p className="normal">
                ✅ No significant dyslexia signs detected.
              </p>
            ) : resultData.overallScore >= 50 ? (
              <p className="moderate">
                ⚠️ Mild signs of dyslexia detected. Consider further assessment.
              </p>
            ) : (
              <p className="severe">
                ❗ High risk of dyslexia detected. We recommend professional
                evaluation.
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>❌ Error loading results. Please try again.</p>
      )}

      {/* 추가 정보: 난독증 완화 방법 */}
      <div className="extra-info">
        <button
          className="expand-button"
          onClick={() => setShowTips(!showTips)}
        >
          {showTips ? "🔽 Hide Dyslexia Tips" : "🔼 Show Dyslexia Tips"}
        </button>
        {showTips && (
          <div className="tips-container" style={{}}>
            <h3 style={{ color: "black" }}>📌 How to Manage Dyslexia</h3>
            <ul>
              <li>
                📖 Use specialized fonts (e.g., Dyslexie, OpenDyslexic) to
                improve readability.
              </li>
              <li>
                🎧 Try audiobooks and text-to-speech software to aid in reading
                comprehension.
              </li>
              <li>
                🔍 Break text into smaller chunks to reduce visual overload.
              </li>
              <li>
                📝 Use color overlays or adjust screen brightness to minimize
                distractions.
              </li>
              <li>
                🧩 Practice with memory and sequencing games** to enhance
                cognitive skills.
              </li>
              <li>
                🤝 Seek professional support from therapists or dyslexia
                specialists.
              </li>
            </ul>
          </div>
        )}
      </div>

      <button className="restartButton" onClick={() => navigate("/")}>
        Restart Test
      </button>
    </div>
    </div>
  );
};

export default Result;
