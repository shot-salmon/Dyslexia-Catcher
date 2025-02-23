import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./pages.css";

const Practice = () => {
  const navigate = useNavigate();
  const [recordTime, setRecordTime] = useState(30);
  const [showText, setShowText] = useState(false);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hideTimer, setHideTimer] = useState(false); // 타이머 숨김 여부
  const timerRef = useRef(null);

  const practiceText =
    "Reading is a fundamental skill that allows people to explore new ideas, gain knowledge, and communicate effectively. Whether you are reading books, articles, or even instructions, your ability to comprehend text plays a crucial role in daily life. Take a deep breath and read this passage aloud within 30 seconds.";

  const startTimer = (time) => {
    setRecordTime(time);
    setNextButtonVisible(false);
    setHideTimer(false); // 타이머 표시
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setRecordTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setNextButtonVisible(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  //       const runPython = async () => {
  //         try {
  //           const response = await fetch('http://localhost:5001/run-python');
  //           const data = await response.text()
  //           console.log(data);
  //         } catch (error) {
  //           console.error('Error:', error);
  //           alert('실행 중 에러 발생');
  //         }
  //       };

  const handleStartPractice = () => {
    setShowText(true);
    startTimer(30);
  };

  const handleFinish = () => {
    setNextButtonVisible(true);
    setHideTimer(true); // 타이머 숨김
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleProceedToTest = () => {
    navigate("/test");
  };

  return (
    <div className="background">
      <div className="practice-container">
        {!showText ? (
          <div>
            <p style={{ fontSize: "30px" }}>
              This is a{" "}
              <strong style={{ color: "yellow" }}>practice session</strong>. A
              short paragraph will appear. <br />
              Try your best to read the paragraph within 30 seconds.
            </p>
            <button className="startButton" onClick={handleStartPractice}>
              Start Now!
            </button>
          </div>
        ) : (
          <div className="text-display">
            <p style={{ color: "black" }}>{practiceText}</p>

            {!hideTimer && (
              <div className="timer">⏳ Time Left: {recordTime}s</div>
            )}

            {!nextButtonVisible && (
              <button className="finishButton" onClick={handleFinish}>
                Finish
              </button>
            )}

            {nextButtonVisible && (
              <button className="nextButton" onClick={handleShowModal}>
                Next
              </button>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>⚠️ Attention!</h2>
            <p>
              Now, you will start the real test. Please focus and read
              carefully.
            </p>
            <button className="startButton" onClick={handleProceedToTest}>
              Start Test!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;
