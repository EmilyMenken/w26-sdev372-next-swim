import { useState } from "react";
import { Link } from "react-router-dom";

export default function WaterSafetyQuiz(){

  const [score,setScore] = useState(0)
  const [step,setStep] = useState(0)
  const [finished,setFinished] = useState(false)

  const answer = (correct:boolean)=>{

    if(correct){
      setScore(score+1)
    }

    if(step === 2){
      setFinished(true)
    } else {
      setStep(step+1)
    }

  }

  if(finished){

    return(

      <div className="quiz-page">

        <h2>Water Safety Quiz Result</h2>

        <p>Your score: {score}/3</p>

        <button onClick={()=>{

          setScore(0)
          setStep(0)
          setFinished(false)

        }}>
          Retake Quiz
        </button>

        <Link to="/quiz" className="quiz-nav-button">
          Back to Quiz Selection
        </Link>

      </div>

    )

  }

  return(

    <div className="quiz-page">

      {step===0 && (

        <Question
          text="What should you do if someone is drowning?"
          options={[
            {label:"Jump in immediately",correct:false},
            {label:"Reach or throw something to help",correct:true},
            {label:"Ignore it",correct:false}
          ]}
          answer={answer}
        />

      )}

      {step===1 && (

        <Question
          text="Why is it important to swim with a buddy?"
          options={[
            {label:"For fun",correct:false},
            {label:"Someone can help in an emergency",correct:true},
            {label:"No reason",correct:false}
          ]}
          answer={answer}
        />

      )}

      {step===2 && (

        <Question
          text="What does a lifeguard do?"
          options={[
            {label:"Watch swimmers and respond to emergencies",correct:true},
            {label:"Teach math",correct:false},
            {label:"Sell pool snacks",correct:false}
          ]}
          answer={answer}
        />

      )}

    </div>

  )

}

function Question({
  text,
  options,
  answer
}:{
  text:string
  options:{label:string,correct:boolean}[]
  answer:(correct:boolean)=>void
}){

  return(

    <div className="quiz-container">

      <h3>{text}</h3>

      {options.map(o=>(
        <button
          key={o.label}
          className="quiz-button"
          onClick={()=>answer(o.correct)}
        >
          {o.label}
        </button>
      ))}

    </div>

  )

}