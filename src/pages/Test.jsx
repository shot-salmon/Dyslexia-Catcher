import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./pages.css";

const Practice = () => {
  const navigate = useNavigate();
  const [recordTime, setRecordTime] = useState(60); // 60초 제한
  const [showText, setShowText] = useState(false); // 버튼이 사라지고 텍스트를 보이게 하는 상태
  const [textList, setTextList] = useState([]); // JSON 데이터 저장
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여줄 문장의 인덱스
  const [nextButtonVisible, setNextButtonVisible] = useState(false); // "Next" 버튼 표시 여부
  const [hideTimer, setHideTimer] = useState(false); // 타이머 숨김 여부
  const timerRef = useRef(null); // 타이머 상태 관리

  // JSON 데이터 로드
  useEffect(() => {
    fetch("/FairlyTale.json") // 올바른 JSON 경로
      .then((response) => response.json())
      .then((data) => {
        setTextList(data.story); // 전체 문장 리스트 저장
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  // 1분 제한 타이머 시작
  const startTimer = () => {
    clearInterval(timerRef.current);
    setRecordTime(60); // 10초 (테스트 후 60초로 변경 가능)
    setNextButtonVisible(false); // Next 버튼 숨김
    setHideTimer(false); 

    timerRef.current = setInterval(() => {
      setRecordTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setNextButtonVisible(true); // 0초가 되면 Next 버튼 표시
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Start 버튼 클릭 시 실행
  const handleStart = () => {
    setShowText(true);
    startTimer();
  };

  const handleFinish = () => {
    setNextButtonVisible(true);
    setHideTimer(true); // 타이머 숨김
  };

  // "Next" 버튼 클릭 시 다음 문장 표시
  const handleNext = () => {
    if (currentIndex < textList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setNextButtonVisible(false); // Next 버튼 숨김
      startTimer(); // 타이머 재시작
    } else {
      alert("End of story");
      navigate("/Loading"); // 마지막이면 다른 페이지로 이동 or 종료 메시지
    }
  };

  return (
    <div className="background">
      <div className="practice-container">
        {!showText ? (
          <div>
            <h1>Ready?</h1>
          <button className="startButton" onClick={handleStart}>
            Start Now!
          </button>
          </div>
        ) : (
          <div className="text-display">
            {/* 현재 인덱스에 해당하는 1개의 문장 표시 */}

            {/* 진행률 표시 */}
            <div className="progress-indicator">
              {currentIndex + 1} / {textList.length}
            </div>
            {textList[currentIndex] && (
              <p key={textList[currentIndex].id} style={{ color: "black" }}>
                {textList[currentIndex].text}
              </p>
            )}

            {/* 남은 시간 표시 */}
            {!hideTimer && (
              <div className="timer">⏳ Time Left: {recordTime}s</div>
            )}

            {!nextButtonVisible && (
              <button className="finishButton" onClick={handleFinish}>
                Finish
              </button>
            )}
            {/* 0초가 되면 Next 버튼 표시 */}
            {nextButtonVisible && (
              <button className="nextButton" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
