import { useState } from "react";
import SwimQuiz from "../components/SwimQuiz";
import WaterSafetyQuiz from "../components/WaterSafetyQuiz";

export default function Quiz(){

  const [quiz,setQuiz] = useState<string | null>(null)

  if(quiz === "swim"){
    return <SwimQuiz/>
  }

  if(quiz === "safety"){
    return <WaterSafetyQuiz/>
  }

  return(

    <div className="quiz-page">

      <h1>NextSwim Quizzes</h1>

      <p>Select a quiz to begin.</p>

      <div className="quiz-container">

        <button
          className="quiz-button"
          onClick={()=>setQuiz("swim")}
        >
          Swim Level Analysis
        </button>

        <button
          className="quiz-button"
          onClick={()=>setQuiz("safety")}
        >
          Water Safety Quiz
        </button>

      </div>

    </div>

  )

}