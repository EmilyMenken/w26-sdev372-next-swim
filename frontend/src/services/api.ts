export async function getResources() {
  const res = await fetch("http://100.114.187.5:3001/api/aquatic-resources");
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}

export async function addResource(resource: any) {
  const res = await fetch("http://100.114.187.5:3001/api/aquatic-resources", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resource)
  });

  if (!res.ok) throw new Error("Failed to add resource");
  return res.json();
}

export async function getQuiz(type: string) {
  const res = await fetch(`http://100.114.187.5:3001/api/quiz/${type}`);
  if (!res.ok) throw new Error("Failed to fetch quiz");
  return res.json();
}

// http://100.114.187.5:3001/api/aquatic-resources use for pi hosting
// ("http://localhost:3001/api/aquatic-resources");
