import { useState, useEffect } from "react";
import { getResources } from "../services/api";
import type { Resource } from "../types/resource";
import "../styles/global.css"
import "../styles/quizStyles.css"
import { Link } from "react-router-dom";

export default function WaterSafetyQuiz() {

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [resources, setResources] = useState<Resource[]>([]);
  const [recommended, setRecommended] = useState<Resource[]>([]);

  useEffect(() => {
    getResources().then(setResources);
  }, []);

  const questions = [
    { text: "What is the main job of a lifeguard?", correct: 0, options: ["Keep people safe", "Teach math", "Sell snacks"] },
    { text: "Why are lifeguards important?", correct: 1, options: ["They swim fast", "They respond to emergencies", "They clean pools"] },
    { text: "Should you swim alone?", correct: 1, options: ["Yes", "No", "Only at night"] },
    { text: "What is the safest rescue method?", correct: 2, options: ["Jump in", "Ignore", "Reach or throw"] },
    { text: "Why wear a lifejacket?", correct: 0, options: ["Stay afloat", "Look cool", "Swim faster"] },
    { text: "What should you do in an emergency?", correct: 1, options: ["Run away", "Call 911", "Wait"] },
    { text: "Why is CPR important?", correct: 2, options: ["Fun skill", "Exercise", "Can save lives"] },
    { text: "How should kids be supervised?", correct: 1, options: ["Occasionally", "Constantly", "Never"] },
    { text: "What protects you from the sun?", correct: 0, options: ["Sunscreen", "Water", "Hat only"] },
    { text: "What should you do if tired?", correct: 2, options: ["Keep going", "Panic", "Rest and float"] }
  ];

  const answer = (index: number) => {
    if (index === questions[step].correct) setScore(score + 1);
    if (step === questions.length - 1) finishQuiz();
    else setStep(step + 1);
  };

  const getRecommendations = () => {
    let difficultyCap = 2;
    if (score >= 8) difficultyCap = 4;
    else if (score >= 5) difficultyCap = 3;

    return resources
      .filter(r => r.difficulty_level && r.difficulty_level <= difficultyCap)
      .slice(0, 5);
  };

  const finishQuiz = () => {
    setRecommended(getRecommendations());
    setFinished(true);
  };

  if (finished) {

    let level = "";

    if (score >= 8) level = "Excellent Water Safety Knowledge";
    else if (score >= 5) level = "Good Foundation";
    else level = "Needs Improvement";

    return (
      <div className="quiz-page">

        <h2>{level}</h2>
        <p>Your score: {score}/10</p>

        <h3>Recommended Resources</h3>
        <ul>
          {recommended.map(r => (
            <li key={r.id}>
              <a href={r.url} target="_blank">{r.title}</a>
            </li>
          ))}
        </ul>

        <Link to="/resources" className="quiz-nav-button">
          Explore Full Resource Library
        </Link>

        <button onClick={() => {
          setScore(0);
          setStep(0);
          setFinished(false);
        }}>
          Retake Quiz
        </button>

      </div>
    );
  }

  return (
    <div className="quiz-page">

      <h3>{questions[step].text}</h3>

      {questions[step].options.map((opt, i) => (
        <button key={i} className="quiz-button" onClick={() => answer(i)}>
          {opt}
        </button>
      ))}

    </div>
  );
}