import { useEffect, useState } from "react";
import { getResources } from "../services/api";
import type { Resource } from "../types/resource";

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getResources()
      .then((data) => {
        setResources(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading resources...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="resources-page">
      <h1>Aquatic Resources</h1>
      <ul className="resources-list">
        {resources.map((resource) => (
          <li key={resource.id} className="resource-item">
            <h2 className="resource-title">{resource.title}</h2>
            {resource.difficulty_level && (
              <p className="resource-level">Level {resource.difficulty_level}</p>
            )}
            {resource.resource_type && (
              <p className="resource-type">Type: {resource.resource_type}</p>
            )}
            {resource.description && (
              <p className="resource-description">{resource.description}</p>
            )}
            {resource.url && (
              <a
                className="resource-link"
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resource
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
