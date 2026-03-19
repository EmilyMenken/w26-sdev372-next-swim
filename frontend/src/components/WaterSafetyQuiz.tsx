import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/quizStyles.css";

type Option = {
  label: string;
  correct: boolean;
};

type QuestionType = {
  text: string;
  options: Option[];
};

const questions: QuestionType[] = [
  {
    text: "What is the main role of a lifeguard?",
    options: [
      { label: "Watch swimmers and respond to emergencies", correct: true },
      { label: "Teach swimming lessons only", correct: false },
      { label: "Clean the pool", correct: false }
    ]
  },
  {
    text: "Why are lifeguards important?",
    options: [
      { label: "They enforce rules and prevent accidents", correct: true },
      { label: "They only give directions", correct: false },
      { label: "They organize games", correct: false }
    ]
  },
  {
    text: "What should you do if someone is drowning?",
    options: [
      { label: "Jump in immediately", correct: false },
      { label: "Reach or throw, don’t go", correct: true },
      { label: "Wait for someone else", correct: false }
    ]
  },
  {
    text: "Why should you swim with a buddy?",
    options: [
      { label: "For fun only", correct: false },
      { label: "Someone can help in an emergency", correct: true },
      { label: "No reason", correct: false }
    ]
  },
  {
    text: "When should you wear a life jacket?",
    options: [
      { label: "Only if you feel like it", correct: false },
      { label: "When boating or in open water", correct: true },
      { label: "Never", correct: false }
    ]
  },
  {
    text: "What is the safest way to help someone from land?",
    options: [
      { label: "Jump in", correct: false },
      { label: "Use a pole or throw a flotation device", correct: true },
      { label: "Yell at them", correct: false }
    ]
  },
  {
    text: "Why is knowing CPR important?",
    options: [
      { label: "It can save someone's life", correct: true },
      { label: "It’s only for doctors", correct: false },
      { label: "It’s not useful", correct: false }
    ]
  },
  {
    text: "What is an important sun safety habit?",
    options: [
      { label: "Wear sunscreen and reapply", correct: true },
      { label: "Stay in the sun all day", correct: false },
      { label: "Never drink water", correct: false }
    ]
  },
  {
    text: "What is the best way to supervise children in water?",
    options: [
      { label: "Watch them closely without distractions", correct: true },
      { label: "Check occasionally", correct: false },
      { label: "Let them swim alone", correct: false }
    ]
  },
  {
    text: "When should you call 911?",
    options: [
      { label: "Only if unsure", correct: false },
      { label: "During any serious emergency", correct: true },
      { label: "Never", correct: false }
    ]
  }
];

export default function WaterSafetyQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const answer = (correct: boolean) => {
    if (correct) setScore(prev => prev + 1);

    if (step === questions.length - 1) {
      setFinished(true);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setScore(0);
    setFinished(false);
  };

  // 🎯 RESOURCE RECOMMENDATIONS
  const getRecommendations = () => {
    if (score <= 4) {
      return [
        "Water Safety Basics (Red Cross)",
        "How to Float and Stay Calm",
        "Reach or Throw, Don’t Go"
      ];
    } else if (score <= 7) {
      return [
        "Intermediate Water Safety Skills",
        "CPR Basics Guide",
        "Open Water Safety Tips"
      ];
    } else {
      return [
        "Advanced Lifeguard Training Resources",
        "Rescue Techniques and Drills",
        "Emergency Response Practice"
      ];
    }
  };

  if (finished) {
    const recommendations = getRecommendations();

    return (
      <div className="quiz-page">
        <h2>Water Safety Quiz Result</h2>

        <p>Your score: {score}/{questions.length}</p>

        {/* 🎯 Recommendations */}
        <div className="quiz-results">
          <h3>Recommended Resources</h3>
          <ul>
            {recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>

        <button onClick={resetQuiz}>Retake Quiz</button>

        <Link to="/quiz" className="quiz-nav-button">
          Back to Quiz Selection
        </Link>
      </div>
    );
  }

  const current = questions[step];

  return (
    <div className="quiz-page">
      <p>Question {step + 1} of {questions.length}</p>

      <Question
        text={current.text}
        options={current.options}
        answer={answer}
      />
    </div>
  );
}

function Question({
  text,
  options,
  answer
}: {
  text: string;
  options: Option[];
  answer: (correct: boolean) => void;
}) {
  return (
    <div className="quiz-container">
      <h3>{text}</h3>

      {options.map((o, index) => (
        <button
          key={index}
          className="quiz-button"
          onClick={() => answer(o.correct)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}