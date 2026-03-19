import { it, expect, vi } from "vitest";
import request from "supertest";
import app from "../../app.js";
import pool from "../config/db.js";

// mocks db
vi.mock("../config/db.js", () => {
  return {
    default: {
      query: vi.fn(),
      end: vi.fn()
    }
  };
});

  it("GET /api/aquatic-resources returns empty initially", async () => {
    pool.query.mockResolvedValue([[]]);

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

    pool.query.mockResolvedValue([{ insertId: 1 }]);

    const res = await request(app)
      .post("/api/aquatic-resources")
      .send(newResource);

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(newResource.title);
  });

  it("GET /api/aquatic-resources returns the created resource", async () => {
    pool.query.mockResolvedValue([[
      {
        id: 1,
        title: "Integration Test Resource",
        resource_type: "Video",
        difficulty_level: 1,
        description: "desc",
        url: "http://example.com"
      }
    ]]);

    const res = await request(app).get("/api/aquatic-resources");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Integration Test Resource");
  });