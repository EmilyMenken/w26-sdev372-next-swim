import { useState, useEffect } from "react";
import { getResources } from "../services/api";
import type { Resource } from "../types/resource";

export default function Quiz() {
  const [level, setLevel] = useState<string>("Beginner");
  const [comfort, setComfort] = useState<string>("Anxious");
  const [preference, setPreference] = useState<string>("Water-based");

  const [allResources, setAllResources] = useState<Resource[]>([]);
  const [recommended, setRecommended] = useState<Resource[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Map swim level to a number for filtering
  const levelNumber = level === "Beginner" ? 1 : level === "Intermediate" ? 2 : 3;

  // Load all resources once
  useEffect(() => {
    getResources().then((data) => setAllResources(data));
  }, []);

  const handleSubmit = () => {
    // Filter resources based on swim level and preference
    const filtered = allResources.filter((r) => {
      const matchLevel = r.difficulty_level && r.difficulty_level <= levelNumber;
      const matchType =
        preference === "Hybrid" || r.resource_type.toLowerCase().includes(preference.toLowerCase());
      return matchLevel && matchType;
    });

    setRecommended(filtered);
    setSubmitted(true);
  };

  // If submitted, show results + recommendations
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

  // Show the quiz form
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
            <option value="Beginner">Level 1: Beginner (Learning basics)</option>
            <option value="Intermediate">Level 2: Intermediate (Lap swimming)</option>
            <option value="Advanced">Level 3: Advanced (Competitive)</option>
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
            <option value="Water-based">In-water (Swimming drills)</option>
            <option value="Land-based">On-land (Strength & Mobility)</option>
            <option value="Hybrid">Both (Land and Water)</option>
          </select>
        </div>

        <button className="quiz-button" onClick={handleSubmit}>
          Submit Quiz
        </button>
      </div>
    </div>
  );
}