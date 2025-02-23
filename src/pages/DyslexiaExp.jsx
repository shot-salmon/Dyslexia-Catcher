import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./pages.css";

const DyslexiaExp = () => {
  const navigate = useNavigate();
  const [voiceConsent, setVoiceConsent] = useState(false);
  const [videoConsent, setVideoConsent] = useState(false);

  const handleNext = () => {
    if (!voiceConsent || !videoConsent) {
      alert("You must check the boxes to proceed with the test!");
    } else {
      navigate("/test"); // Move to next
    }
  };

  return (
    <div className="background">
      <div className="dyslexia-container">
        <h1 className="title">What is Dyslexia?</h1>

        <div className="exp-box">
          <p>
            <strong>Dyslexia</strong> is a language-based learning disability.
            It refers to a cluster of symptoms that cause difficulties with
            specific language skills, particularly <strong>reading</strong>.
          </p>
          <p>
            Individuals with dyslexia often struggle with other language-related
            tasks such as{" "}
            <span className="highlight">
              spelling, writing, and pronouncing words
            </span>
            . Dyslexia can affect people throughout their lives, but its impact
            may change depending on different life stages.
          </p>
        </div>
        <div className="did-you-know">
          <h2>🧠 Did You Know?</h2>
          <ul>
            <li>
              Approximately <strong>10-20%</strong> of the global population has
              dyslexia.
            </li>
            <li>
              Dyslexia is not related to intelligence—it’s about how the brain
              processes language.
            </li>
            <li>
              Many successful individuals, including Albert Einstein and Steve
              Jobs, had dyslexia.
            </li>
          </ul>
        </div>
        <div className="consent-section">
          <h4 style={{ color: "#000000", marginLeft: "10px" }}>
            For the Test...
          </h4>
          <label>
            <span className="required">*</span>
            <input
              type="checkbox"
              checked={voiceConsent}
              onChange={() => setVoiceConsent(!voiceConsent)}
            />
            I consent to the collection and use of my{" "}
            <strong>&nbsp;voice recordings&nbsp;</strong> for research
            purposes.&nbsp;
            <a
              href="https://www.ftc.gov/business-guidance/privacy-security"
              target="_blank"
              rel="noopener noreferrer"
              className="learn-more"
            >
              Learn More
            </a>
          </label>

          <label>
            <span className="required">*</span>
            <input
              type="checkbox"
              checked={videoConsent}
              onChange={() => setVideoConsent(!videoConsent)}
            />
            I consent to the collection and use of my{" "}
            <strong>&nbsp;face recordings&nbsp;</strong> for research
            purposes.&nbsp;
            <a
              href="https://www.ftc.gov/business-guidance/privacy-security"
              target="_blank"
              rel="noopener noreferrer"
              className="learn-more"
            >
              Learn More
            </a>
          </label>
        </div>
        <div className="button-container">
          <button className="backButton" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="proceedButton" onClick={handleNext}>
            Proceed to Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default DyslexiaExp;
