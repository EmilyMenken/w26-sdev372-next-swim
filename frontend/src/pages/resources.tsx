import { useEffect, useState } from "react";
import { getResources } from "../services/api";
import type { Resource } from "../types/resource";
import AddResource from "../components/AddResource"; 
import "../styles/global.css";
export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [activeTab, setActiveTab] = useState("stroke");

  const loadData = async () => {
    try {
      const data = await getResources();
      setResources(data);
    } catch (err) {
      console.error("Error loading resources:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const tabs = [
    { id: "stroke", label: "Stroke Technique" },
    { id: "safety", label: "Water Safety" },
    { id: "breathing", label: "Breath Control" },
    { id: "music", label: "Swim Songs" },
    { id: "training", label: "Training Drills" }
  ];

  const filteredResources = resources.filter(
    (r) => r.resource_type === activeTab
  );

  // Group by difficulty
  const groupedByLevel: Record<number, Resource[]> = {};

  filteredResources.forEach((r) => {
    const level = r.difficulty_level ?? 1;
    if (!groupedByLevel[level]) groupedByLevel[level] = [];
    groupedByLevel[level].push(r);
  });

  return (
    <div className="resources-page">

      <h1>Swim Resource Library</h1>

      {/* FORM  */}
      <AddResource onSuccess={loadData} />

      {/* CATEGORY TABS */}
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredResources.length === 0 && (
        <p>No resources found for this category.</p>
      )}

      {/* GROUPED DISPLAY */}
      {Object.keys(groupedByLevel)
        .sort((a,b)=>Number(a)-Number(b))
        .map(level => (
          <details key={level} className="resource-section" open>

            <summary>Level {level}</summary>

            <ul className="resource-list">
              {groupedByLevel[Number(level)].map(r => (
                <li key={r.id} className="resource-card">

                  <h3>{r.title}</h3>

                  {r.description && <p>{r.description}</p>}

                  <p><strong>Difficulty:</strong> {r.difficulty_level}</p>

                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resource
                  </a>

                </li>
              ))}
            </ul>

          </details>
        ))}
    </div>
  );
}