import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import './pages.css';

const Practice = () => {
    const navigate = useNavigate();
    const timerRef = useState(null);
    const [recordTime, setRecordTime] = useState(0);

    const startTimer = () => {
        setRecordTime(0);
        timerRef.current = setInterval(() => {
          setRecordTime((prevTime) => {
            const newTime = prevTime + 1;
            if (newTime >= 60) {
              clearInterval(timerRef.current);
            }
            return newTime;
          });
        }, 1000);
      };
    
      const handleStart = () => {
        startTimer();
        runPython();
      };
    
      const runPython = async () => {
        try {
          const response = await fetch('http://localhost:5000/run-python');
          const data = await response.text()
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
          alert('실행 중 에러 발생');
        }
      };

    return(
        <div>
            <button className="startButton" onClick={handleStart}>
                Start Now!
            </button>
        </div>
    );
};

export default Practice;