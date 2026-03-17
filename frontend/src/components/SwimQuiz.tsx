import { useState, useEffect } from "react";
import { getResources } from "../services/api";
import type { Resource } from "../types/resource";
import QuizProgress from "./ProgressBar";
import SkillMeter from "./SkillMeter";

export default function SwimQuiz() {

  const totalQuestions = 8;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  const [resources, setResources] = useState<Resource[]>([]);
  const [recommended, setRecommended] = useState<Resource[]>([]);

  const [submitted, setSubmitted] = useState(false);

  const [comfortLevel, setComfortLevel] = useState("");
  const [techniqueLevel, setTechniqueLevel] = useState("");
  const [enduranceLevel, setEnduranceLevel] = useState("");
  const [safetyLevel, setSafetyLevel] = useState("");

  const [comfortScore, setComfortScore] = useState(0);
  const [techniqueScore, setTechniqueScore] = useState(0);
  const [enduranceScore, setEnduranceScore] = useState(0);
  const [safetyScore, setSafetyScore] = useState(0);

  useEffect(() => {
    getResources().then(data => setResources(data));
  }, []);

  const handleAnswer = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
    setStep(step + 1);
  };

  const calculateLevels = () => {

    // Comfort
    let comfort = 0;

    if (answers.confidence === "Very confident") comfort += 2;
    if (answers.float === "Both") comfort += 1;

    setComfortScore(comfort);

    if (comfort >= 3) setComfortLevel("Confident");
    else if (comfort >= 2) setComfortLevel("Comfortable");
    else if (comfort >= 1) setComfortLevel("Developing");
    else setComfortLevel("Beginner");


    // Technique
    let technique = 0;

    if (answers.freestyle === "Yes") technique++;
    if (answers.backstroke === "Yes") technique++;
    if (answers.breaststroke === "Yes") technique++;

    setTechniqueScore(technique);

    if (technique >= 3) setTechniqueLevel("Advanced");
    else if (technique >= 2) setTechniqueLevel("Intermediate");
    else if (technique >= 1) setTechniqueLevel("Developing");
    else setTechniqueLevel("Beginner");


    // Endurance
    let endurance = 0;

    if (answers.distance === "50+") endurance += 2;
    else if (answers.distance === "25") endurance += 1;

    if (answers.tread === "1+ minute") endurance += 2;
    else if (answers.tread === "30-60 seconds") endurance += 1;

    setEnduranceScore(endurance);

    if (endurance >= 3) setEnduranceLevel("Advanced");
    else if (endurance >= 2) setEnduranceLevel("Intermediate");
    else setEnduranceLevel("Beginner");


    // Safety
    let safety = 0;

    if (answers.float === "Both") safety++;
    if (answers.confidence === "Very confident") safety++;

    setSafetyScore(safety);

    if (safety === 2) setSafetyLevel("Advanced");
    else if (safety === 1) setSafetyLevel("Intermediate");
    else setSafetyLevel("Beginner");
  };

  const finishQuiz = () => {

    calculateLevels();

    const filtered = resources.filter(
      r => r.difficulty_level && r.difficulty_level <= 2
    );

    setRecommended(filtered);

    setSubmitted(true);
  };

  if (submitted) {

    return (

      <div className="quiz-page">

        <h2>Your NextSwim Profile</h2>

        <SkillMeter
          label="Comfort"
          score={comfortScore}
          max={3}
          level={comfortLevel}
        />

        <SkillMeter
          label="Technique"
          score={techniqueScore}
          max={3}
          level={techniqueLevel}
        />

        <SkillMeter
          label="Endurance"
          score={enduranceScore}
          max={4}
          level={enduranceLevel}
        />

        <SkillMeter
          label="Safety Awareness"
          score={safetyScore}
          max={2}
          level={safetyLevel}
        />

        <h3>Recommended Resources</h3>

        {recommended.length > 0 ? (

          <ul>

            {recommended.map(r => (

              <li key={r.id}>
                {r.title} ({r.resource_type})
              </li>

            ))}

          </ul>

        ) : (

          <p>No resources available yet.</p>

        )}

        <button onClick={() => {

          setSubmitted(false);
          setStep(0);
          setAnswers({});

        }}>
          Retake Quiz
        </button>

      </div>

    );

  }

  return (

    <div className="quiz-page">

      <QuizProgress current={step + 1} total={totalQuestions} />

      {step === 0 && (
        <Question
          text="Which best describes your swimming ability?"
          options={["Beginner","Intermediate","Advanced"]}
          onSelect={(v)=>handleAnswer("ability",v)}
        />
      )}

      {step === 1 && (
        <Question
          text="How confident do you feel in the water?"
          options={["Not confident","Somewhat confident","Confident","Very confident"]}
          onSelect={(v)=>handleAnswer("confidence",v)}
        />
      )}

      {step === 2 && (
        <Question
          text="Can you float on your front and back?"
          options={["No","Only one","Both"]}
          onSelect={(v)=>{

            handleAnswer("float",v);

            if(v !== "Both"){
              finishQuiz();
            }

          }}
        />
      )}

      {step === 3 && (
        <Question
          text="How far can you swim? (In yards)"
          options={["12.5","25","50+"]}
          onSelect={(v)=>handleAnswer("distance",v)}
        />
      )}

      {step === 4 && (
        <Question
          text="Do you know freestyle?"
          options={["Yes","No"]}
          onSelect={(v)=>handleAnswer("freestyle",v)}
        />
      )}

      {step === 5 && (
        <Question
          text="Do you know backstroke?"
          options={["Yes","No"]}
          onSelect={(v)=>handleAnswer("backstroke",v)}
        />
      )}

      {step === 6 && (
        <Question
          text="Do you know breaststroke?"
          options={["Yes","No"]}
          onSelect={(v)=>handleAnswer("breaststroke",v)}
        />
      )}

      {step === 7 && (
        <Question
          text="How long can you tread water?"
          options={["<30 seconds","30-60 seconds","1+ minute"]}
          onSelect={(v)=>{

            handleAnswer("tread",v);
            finishQuiz();

          }}
        />
      )}

    </div>

  );

}

function Question({
  text,
  options,
  onSelect
}:{
  text:string
  options:string[]
  onSelect:(value:string)=>void
}){

  return(

    <div className="quiz-container">

      <h3>{text}</h3>

      {options.map(option => (

        <button
          key={option}
          className="quiz-button"
          onClick={()=>onSelect(option)}
        >
          {option}
        </button>

      ))}

    </div>

  )

}