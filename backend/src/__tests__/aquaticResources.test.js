import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import app from "../../app.js";
import pool from "../config/db.js";

// Mocks database queries for improved test speed
vi.mock("../config/db.js", () => {
  return {
    default: {
      query: vi.fn()
    }
  };
});

describe("Aquatic Resources API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET /api/aquatic-resources returns a list", async () => {
    const fakeResources = [{ id: 1, title: "Test Resource" }];
    pool.query.mockResolvedValue([[{ id: 1, title: "Test Resource" }]]);

    const res = await request(app).get("/api/aquatic-resources");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe("Test Resource");
  });

  it("POST /api/aquatic-resources adds a new resource", async () => {
    const newResource = { title: "New Test", resource_type: "Video", difficulty_level: 1, description: "desc", url: "http://example.com" };
    pool.query.mockResolvedValue([{ insertId: 99 }]);

    const res = await request(app).post("/api/aquatic-resources").send(newResource);

    expect(res.status).toBe(201);
    expect(res.body.id).toBe(99);
    expect(res.body.title).toBe(newResource.title);
  });

  it("GET /api/aquatic-resources handles DB errors", async () => {
    pool.query.mockRejectedValue(new Error("DB Error"));
    const res = await request(app).get("/api/aquatic-resources");

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Failed to fetch aquatic resources");
  });
});