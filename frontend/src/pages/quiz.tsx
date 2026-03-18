import { useState } from "react";
import SwimQuiz from "../components/SwimQuiz";
import WaterSafetyQuiz from "../components/WaterSafetyQuiz";
import "../styles/global.css";
import "../styles/quizStyles.css";
import "../styles/navBarStyles.css"

export default function Quiz() {

  const [quiz, setQuiz] = useState<string | null>(null);

  return (

    <div className="quiz-page">

      {!quiz && (
        <>
          <h1>NextSwim Quizzes</h1>
          <p>Select a quiz to begin.</p>

          <div className="quiz-container">
            <button
              className="quiz-button"
              onClick={() => setQuiz("swim")}
            >
              Swim Level Analysis
            </button>

            <button
              className="quiz-button"
              onClick={() => setQuiz("safety")}
            >
              Water Safety Quiz
            </button>
          </div>
        </>
      )}

      {quiz === "swim" && <SwimQuiz />}
      {quiz === "safety" && <WaterSafetyQuiz />}

    </div>

  );
}
