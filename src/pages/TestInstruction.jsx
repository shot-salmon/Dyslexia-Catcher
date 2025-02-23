import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./pages.css";

const TestInstructions = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const videoRef = useRef(null);
  const animationRef = useRef(null);

  // 오디오 녹음 기능
  const startRecordingAudio = async () => {
    try {
      setAudioURL(null);
      setVolumeLevel(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioURL(URL.createObjectURL(audioBlob));
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (error) {
      console.error("Audio recording error:", error);
      alert("Microphone access is required to record audio.");
    }
  };

  const stopRecordingAudio = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    cancelAnimationFrame(animationRef.current);
    setVolumeLevel(0);
  };

  // 비디오 녹화 기능 (실시간 미리보기 + 녹화 저장)
  const startRecordingVideo = async () => {
    try {
      setVideoURL(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      const videoChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        videoChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(videoChunks, { type: "video/webm" });
        setVideoURL(URL.createObjectURL(videoBlob));
      };

      mediaRecorder.start();
      videoRecorderRef.current = mediaRecorder;
      setIsVideoRecording(true);
    } catch (error) {
      console.error("Video recording error:", error);
      alert("Camera access is required to record video.");
    }
  };

  const stopRecordingVideo = () => {
    if (videoRecorderRef.current) {
      videoRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null; //
    }

    setIsVideoRecording(false);
  };

  return (
    <div className="background">
      <div className="w-full flex justify-start">
        <h1 className="text-2xl font-bold">Readability</h1>
      </div>
      <div className="test-container">
        {/* 좌측: 설명 텍스트 */}
        <div className="test-description">
          <h2>📖 How Does the Dyslexia Test Work?</h2>
          <p>
            When you start the test, <strong>4 to 5 sentences</strong> will
            appear on the screen. You will have <strong>1 minute</strong> to
            read them aloud.
          </p>
          <p>
            During this time, we will <strong>record your voice 🎙️</strong> to
            compare it with the provided text. Simultaneously, we will{" "}
            <strong>capture your eye movements 🎥</strong> using video recording
            to analyze your reading patterns.
          </p>
          <div className="button-container">
            <button className="backButton" onClick={() => navigate(-1)}>
              Back
            </button>
            <button
              className="proceedButton"
              onClick={() => navigate("/practice")}
            >
              Proceed to Test
            </button>
          </div>
        </div>

        {/* 우측: 녹화 테스트 UI */}
        <div className="test-recording">
          <h2>Recoding Test</h2>
          {/* 마이크 테스트 */}
          <div className="recording-section">
            <h3 style={{ color: "black" }}>🎤 Test Your Microphone</h3>
            <button
              onClick={isRecording ? stopRecordingAudio : startRecordingAudio}
              className="startButton"
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            {audioURL && (
              <audio controls>
                <source src={audioURL} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>

          {/* 카메라 테스트 */}
          <div className="recording-section">
            <h3 style={{ color: "black" }}>📹 Test Your Camera</h3>
            <button
              onClick={
                isVideoRecording ? stopRecordingVideo : startRecordingVideo
              }
              className="startButton"
            >
              {isVideoRecording ? "Stop Video" : "Start Video"}
            </button>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`video-preview ${isVideoRecording ? "recording" : ""}`}
            ></video>
            {videoURL && (
              <video controls className="video-preview">
                <source src={videoURL} type="video/webm" />
                Your browser does not support the video element.
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInstructions;
