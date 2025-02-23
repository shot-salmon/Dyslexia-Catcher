import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./pages.css";

const DyslexiaExp = () => {
    const navigate = useNavigate();

    return (
        <div className="dyslexia-container">
            <h1 className="title">What is Dyslexia?</h1>

            <div className="exp-box">
                <p>
                    <strong>Dyslexia</strong> is a language-based learning disability. It refers to a cluster of symptoms that cause difficulties with specific language skills, particularly <strong>reading</strong>.
                </p>
                <p>
                    Individuals with dyslexia often struggle with other language-related tasks such as <span className="highlight">spelling, writing, and pronouncing words</span>. Dyslexia can affect people throughout their lives, but its impact may change depending on different life stages.
                </p>
            </div>

            <div className="did-you-know">
                <h2>🧠 Did You Know?</h2>
                <ul>
                    <li>Approximately <strong>10-20%</strong> of the global population has dyslexia.</li>
                    <li>Dyslexia is not related to intelligence—it’s about how the brain processes language.</li>
                    <li>Many successful individuals, including Albert Einstein and Steve Jobs, had dyslexia.</li>
                </ul>
            </div>

            <button className="learn-more-button" onClick={() => navigate("/learn-more")}>
                Learn More
            </button>
        </div>
    );
};

export default DyslexiaExp;
