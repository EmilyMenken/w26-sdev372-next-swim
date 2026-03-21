import { useState, useEffect } from "react";
import { getResources, getQuiz } from "../services/api";
import type { Resource } from "../types/resource";
import "../styles/global.css";
import "../styles/quizStyles.css";
import { Link } from "react-router-dom";

export default function WaterSafetyQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [resources, setResources] = useState<Resource[]>([]);
  const [recommended, setRecommended] = useState<Resource[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    getResources().then(setResources);
  }, []);

  useEffect(() => {
    getQuiz("safety").then((data) => {
      const formatted = data.map((q: any) => ({
        id: q.id,
        text: q.question_text,
        options: q.options,
        correct: q.correct_answer
      }));

      setQuestions(formatted);
    });
  }, []);

  if (!questions.length) return <div>Loading...</div>;

  const answer = (index: number) => {
    if (index === questions[step].correct) {
      setScore((prev) => prev + 1);
    }

    if (step === questions.length - 1) finishQuiz();
    else setStep(step + 1);
  };

  const getRecommendations = () => {
    let difficultyCap = 2;
    if (score >= 8) difficultyCap = 4;
    else if (score >= 5) difficultyCap = 3;

    return resources
      .filter(r => (r.difficulty_level ?? 1) <= difficultyCap)
      .slice(0, 5)
      .map(r => ({
        ...r,
        url: r.url ?? ""
      }));
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
        <p>Your score: {score}/{questions.length}</p>

        <h3>Recommended Resources</h3>
        <ul>
          {recommended.map(r => (
            <li key={r.id}>
              <a href={r.url ?? ""} target="_blank">{r.title}</a>
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

      {questions[step].options.map((opt: string, i: number) => (
        <button key={i} className="quiz-button" onClick={() => answer(i)}>
          {opt}
        </button>
      ))}
    </div>
  );
}