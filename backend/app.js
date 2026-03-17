// backend/app.js
import express from "express";
import cors from "cors";

import router from "./src/routes/aquaticResources.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/aquatic-resources", router);

// Health check route
app.get("/api/swim", (req, res) => {
  res.json({ status: "Backend is running" });
});

export default app;