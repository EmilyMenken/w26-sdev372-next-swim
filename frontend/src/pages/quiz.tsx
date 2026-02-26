import { useState, useEffect } from "react";
import { getResources } from "../services/api";
import type { Resource } from "../types/resource";

export default function Quiz() {
  const [level, setLevel] = useState<string>("");
  const [comfort, setComfort] = useState<string>("");
  const [preference, setPreference] = useState<string>("");

  // New questions
  const [breathing, setBreathing] = useState<string>("");
  const [kicking, setKicking] = useState<string>("");
  const [endurance, setEndurance] = useState<string>("");

  const [allResources, setAllResources] = useState<Resource[]>([]);
  const [recommended, setRecommended] = useState<Resource[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    getResources().then((data) => setAllResources(data));
  }, []);

  const handleSubmit = () => {
    // Validate all fields are filled
    if (!level || !comfort || !preference || !breathing || !kicking || !endurance) {
      alert(" Please answer all questions before submitting!");
      return;
    }

    // Determine numeric level based on answers
    let numericLevel = 1; // Beginner
    if (
      breathing === "Yes" &&
      kicking === "Strong" &&
      endurance === "Long" &&
      level === "Advanced"
    ) {
      numericLevel = 4; // Proficient
      setLevel("Proficient");
    } else if (level === "Advanced" || endurance === "Long") {
      numericLevel = 3; // Expert
      setLevel("Expert");
    } else if (level === "Intermediate") {
      numericLevel = 2; // Intermediate
      setLevel("Intermediate");
    } else {
      numericLevel = 1; // Beginner
      setLevel("Beginner");
    }

    // Filter resources by level and preference
    const filtered = allResources.filter((r) => {
      const matchType =
        preference === "Hybrid" || r.resource_type?.toLowerCase().includes(preference.toLowerCase());

      if (numericLevel === 4) {
        // Proficient: show level 3 (Expert) and 4 (Proficient)
        return r.difficulty_level && r.difficulty_level >= 3 && r.difficulty_level <= 4 && matchType;
      } else {
        return r.difficulty_level && r.difficulty_level <= numericLevel && matchType;
      }
    });

    setRecommended(filtered);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="quiz-page">
        <h1>NextSwim Analysis</h1>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <p>Swim Level: {level}</p>
        <p>Water Comfort: {comfort}</p>
        <p>Exercise Preference: {preference}</p>

        <p>
          Based on your level ({level}), we recommend {preference} exercises to
          help you reach your aquatic goals.
        </p>

        <h2>Recommended Resources for {level} Swimmers</h2>
        {recommended.length > 0 ? (
          <ul>
            {recommended.map((r) => (
              <li key={r.id}>
                {r.title} ({r.resource_type})
              </li>
            ))}
          </ul>
        ) : (
          <p>No resources match your level and preference yet.</p>
        )}

        <button onClick={() => setSubmitted(false)}>Retake Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <h1>Swim Level Analysis</h1>
      <p>Answer the questions below to find your level and training path.</p>

      <div className="quiz-container">
        {/* Skill Level */}
        <div className="quiz-group">
          <label className="quiz-label">Which best describes your ability?</label>
          <select
            className="quiz-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">Please select an answer</option>
            <option value="Beginner">Beginner (Learning basics)</option>
            <option value="Intermediate">Intermediate (Lap swimming)</option>
            <option value="Advanced">Advanced (Competitive)</option>
          </select>
        </div>

        {/* Comfort Level */}
        <div className="quiz-group">
          <label className="quiz-label">How do you feel in deep water?</label>
          <select
            className="quiz-select"
            value={comfort}
            onChange={(e) => setComfort(e.target.value)}
          >
            <option value="">Please select an answer</option>
            <option value="Anxious">I feel anxious or fearful</option>
            <option value="Neutral">I am okay but cautious</option>
            <option value="Confident">I feel very confident</option>
          </select>
        </div>

        {/* Exercise Preference */}
        <div className="quiz-group">
          <label className="quiz-label">What kind of exercises do you prefer?</label>
          <select
            className="quiz-select"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
          >
            <option value="">Please select an answer</option>
            <option value="Water-based">In-water (Swimming drills)</option>
            <option value="Land-based">On-land (Strength & Mobility)</option>
            <option value="Hybrid">Both (Land and Water)</option>
          </select>
        </div>

        {/* Breathing */}
        <div className="quiz-group">
          <label className="quiz-label">Can you comfortably breathe while swimming laps?</label>
          <select
            className="quiz-select"
            value={breathing}
            onChange={(e) => setBreathing(e.target.value)}
          >
            <option value="">Please select an answer</option>
            <option value="No">No, I struggle</option>
            <option value="Sometimes">Sometimes, with breaks</option>
            <option value="Yes">Yes, comfortably</option>
          </select>
        </div>

        {/* Kicking */}
        <div className="quiz-group">
          <label className="quiz-label">How strong is your kicking technique?</label>
          <select
            className="quiz-select"
            value={kicking}
            onChange={(e) => setKicking(e.target.value)}
          >
            <option value="">Please select an answer</option>
            <option value="Weak">Weak, inefficient</option>
            <option value="Moderate">Moderate, needs improvement</option>
            <option value="Strong">Strong and consistent</option>
          </select>
        </div>

        {/* Endurance */}
        <div className="quiz-group">
          <label className="quiz-label">How far can you swim continuously?</label>
          <select
            className="quiz-select"
            value={endurance}
            onChange={(e) => setEndurance(e.target.value)}
          >
            <option value="">Please select an answer</option>
            <option value="Short">Short distances (1-2 laps)</option>
            <option value="Medium">Medium (3-5 laps)</option>
            <option value="Long">Long distances (6+ laps)</option>
          </select>
        </div>

        <button className="quiz-button" onClick={handleSubmit}>
          Submit Quiz
        </button>
      </div>
    </div>
  );
}