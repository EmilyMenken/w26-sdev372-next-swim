import { useState, useEffect } from "react";
import { getResources, getQuiz } from "../services/api";
import type { Resource } from "../types/resource";
import QuizProgress from "../components/ProgressBar";
import SkillMeter from "../components/SkillMeter";
import { Link } from "react-router-dom";
import "../styles/quizStyles.css";
import "../styles/global.css";

type AnswerMap = { [key: string]: string };

export default function SwimQuiz() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [resources, setResources] = useState<Resource[]>([]);
  const [recommended, setRecommended] = useState<Resource[]>([]);

  const [scores, setScores] = useState({
    comfort: 0,
    technique: 0,
    endurance: 0,
    safety: 0
  });

  const [levels, setLevels] = useState({
    comfort: "",
    technique: "",
    endurance: "",
    safety: ""
  });

  const [swimLevel, setSwimLevel] = useState("");
  const [feedback, setFeedback] = useState<string[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    getResources().then(setResources);
  }, []);

  useEffect(() => {
    getQuiz("swim").then((data) => {
      const formatted = data.map((q: any) => ({
        id: q.question_id,
        text: q.question_text,
        options: q.options
      }));

      setQuestions(formatted);
    });
  }, []);

  if (!questions.length) return <div>Loading...</div>;

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (value: string) => {
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);

    if (currentIndex === questions.length - 1) {
      finishQuiz(updated);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const calculateScores = (a: AnswerMap) => {
    let comfort = 0, technique = 0, endurance = 0, safety = 0;

    if (a.confidence === "4") comfort += 2;
    if (a.float === "Both") comfort += 2;

    ["freestyle","backstroke","breaststroke","butterfly"].forEach(s => {
      if (a[s] === "Yes") technique++;
    });

    if (a.distance === "25") endurance += 1;
    if (a.distance === "50+") endurance += 2;

    if (a.tread === "1-2 min") endurance += 1;
    if (a.tread === "2+ min") endurance += 2;

    if (a.float === "Both") safety++;
    if (a.tread && a.tread !== "<1 min") safety++;

    const result = { comfort, technique, endurance, safety };
    setScores(result);

    setLevels({
      comfort: comfort >= 3 ? "Confident" : comfort >= 2 ? "Developing" : "Beginner",
      technique: technique >= 4 ? "Advanced" : technique >= 2 ? "Intermediate" : "Beginner",
      endurance: endurance >= 3 ? "Advanced" : endurance >= 2 ? "Intermediate" : "Beginner",
      safety: safety === 2 ? "Safe" : "Needs Work"
    });

    return result;
  };

  const generateFeedback = (a: AnswerMap) => {
    let level = "";
    const tips: string[] = [];

    if (a.float !== "Both") level = "Level 1: Water Acclimation";
    else if (a.distance === "12.5" || a.tread === "<1 min") level = "Level 2: Basic Survival";
    else if (a.freestyle === "No" || a.backstroke === "No" || a.breaststroke === "No") level = "Level 3: Stroke Development";
    else level = "Level 4: Advanced Technique";

    if (a.confidence === "1" || a.confidence === "2") tips.push("Build comfort in shallow water.");
    if (a.distance === "12.5") tips.push("Increase endurance with short repeated swims.");
    if (a.tread === "<1 min") tips.push("Practice treading water techniques.");
    if (tips.length === 0) tips.push("Great job! Continue refining technique.");

    setSwimLevel(level);
    setFeedback(tips);
  };

  const getRecommendedResources = (scoreData: any) => {
    let difficultyCap = 2;
    if (scoreData.endurance >= 3 || scoreData.technique >= 3) difficultyCap = 4;
    else if (scoreData.endurance >= 2) difficultyCap = 3;

    return resources
      .filter(r => (r.difficulty_level ?? 1) <= difficultyCap)
      .slice(0, 5)
      .map(r => ({
        ...r,
        url: r.url ?? null
      }));
  };

  const finishQuiz = (finalAnswers: AnswerMap) => {
    const scoreData = calculateScores(finalAnswers);
    generateFeedback(finalAnswers);
    setRecommended(getRecommendedResources(scoreData));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="quiz-page">
        <h2>{swimLevel}</h2>
        <h3>Your Personalized Plan</h3>

        <ul>
          {feedback.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>

        <SkillMeter label="Comfort" score={scores.comfort} max={4} level={levels.comfort} />
        <SkillMeter label="Technique" score={scores.technique} max={4} level={levels.technique} />
        <SkillMeter label="Endurance" score={scores.endurance} max={4} level={levels.endurance} />
        <SkillMeter label="Safety" score={scores.safety} max={2} level={levels.safety} />

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
          setAnswers({});
          setCurrentIndex(0);
          setSubmitted(false);
        }}>
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <QuizProgress current={currentIndex + 1} total={questions.length} />

      <div className="quiz-container">
        <h3>{currentQuestion.text}</h3>

        {currentQuestion.options.map((option: string) => (
          <button
            key={option}
            className="quiz-button"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}