// services/api.ts
export async function getResources() {
  const res = await fetch("http://localhost:5000/aquaticResources"); // match your backend route
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}

export async function addResource(resource: any) {
  const res = await fetch("http://localhost:5000/aquaticResources", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resource)
  });

  if (!res.ok) throw new Error("Failed to add resource");
  return res.json();
}