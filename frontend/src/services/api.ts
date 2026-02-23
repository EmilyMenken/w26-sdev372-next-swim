import type { Resource } from "../types/resource";

const LOCAL = window.location.hostname === "localhost";
export const API_BASE = LOCAL ? "http://localhost:3001/api" : "http://backend:3001/api";

export async function getResources(): Promise<Resource[]> {
  const res = await fetch(`${API_BASE}/aquatic-resources`);
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}

export async function addResource(data: Partial<Resource>): Promise<Resource> {
  const res = await fetch(`${API_BASE}/aquatic-resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to add resource");
  return res.json();
}