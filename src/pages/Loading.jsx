import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./pages.css";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 5초 후 결과 페이지로 이동 (분석 완료 시)
    const timer = setTimeout(() => {
      navigate("/Result"); // 결과 페이지로 이동
    }, 5000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, [navigate]);

  return (
    <div className="background">
      <div className="loading-container">
        <h2>🔍 Analyzing Your Reading...</h2>
        <p>This may take a few moments. Please wait.</p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
