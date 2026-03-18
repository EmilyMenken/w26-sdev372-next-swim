import React, { useEffect, useState } from "react";
import { getResources } from "../services/api"; // make sure this function calls your backend GET /aquaticResources
import "../styles/global.css";
import "../styles/AddResource.css"; // 
import { Link } from "react-router-dom";

interface Resource {
  id: number;
  title: string;
  resource_type: string;
  difficulty_level: number;
  description: string;
  url: string;
}

export default function AquaticResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");

  useEffect(() => {
    async function fetchResources() {
      try {
        const data = await getResources();
        setResources(data);
      } catch (err) {
        console.error("Failed to fetch resources:", err);
      }
    }

    fetchResources();
  }, []);

  const filterResources = () => {
    if (activeTab === "All") return resources;
    if (activeTab === "Beginner") return resources.filter(r => r.difficulty_level === 1);
    if (activeTab === "Intermediate") return resources.filter(r => r.difficulty_level === 2);
    if (activeTab === "Advanced") return resources.filter(r => r.difficulty_level >= 3);
    return resources;
  };

  return (
    <div className="resources-page">

      <h1>Aquatic Resources</h1>

      {/* Tabs at top */}
      <div className="tabs">
        {["All", "Beginner", "Intermediate", "Advanced"].map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Resource List */}
      <ul className="resource-list">
        {filterResources().map(resource => (
          <li key={resource.id} className="resource-card">
            <h3>{resource.title}</h3>
            <p><strong>Type:</strong> {resource.resource_type}</p>
            <p><strong>Difficulty:</strong> {resource.difficulty_level}</p>
            <p>{resource.description}</p>
            <Link to={resource.url} target="_blank" rel="noopener noreferrer">View Resource</Link>
          </li>
        ))}
        {filterResources().length === 0 && (
          <p>No resources available for this category.</p>
        )}
      </ul>

    </div>
  );
}