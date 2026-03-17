import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../../app.js";
import pool from "../config/db.js";

describe("Aquatic Resources API Integration Tests", () => {
  beforeAll(async () => {
    // Clear table before running tests
    await pool.query("DROP TABLE IF EXISTS aquatic_resources");
    await pool.query(`
      CREATE TABLE aquatic_resources (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        resource_type VARCHAR(50),
        difficulty_level INT,
        description TEXT,
        url VARCHAR(255)
      )
    `);
  });

  afterAll(async () => {
    await pool.end(); // close db connection
  });

  it("GET /api/aquatic-resources returns empty initially", async () => {
    const res = await request(app).get("/api/aquatic-resources");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /api/aquatic-resources creates a new resource", async () => {
    const newResource = {
      title: "Integration Test Resource",
      resource_type: "Video",
      difficulty_level: 1,
      description: "desc",
      url: "http://example.com",
    };

    const res = await request(app)
      .post("/api/aquatic-resources")
      .send(newResource);

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(newResource.title);
  });

  it("GET /api/aquatic-resources returns the created resource", async () => {
    const res = await request(app).get("/api/aquatic-resources");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Integration Test Resource");
  });
});