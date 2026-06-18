const request = require("supertest");
const createApp = require("../../src/app");
const { _resetForTests } = require("../../src/tasks");

const app = createApp();

beforeEach(() => {
  _resetForTests();
});

describe("GET /health", () => {
  test("returns status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("Tasks API", () => {
  test("GET /api/tasks starts empty", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("POST creates task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Write CI/CD pipeline" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Write CI/CD pipeline");
  });

  test("POST invalid task returns 400", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "" });

    expect(res.status).toBe(400);
  });

  test("DELETE removes task", async () => {
    const post = await request(app)
      .post("/api/tasks")
      .send({ title: "Temp task" });

    const id = post.body.id;

    const del = await request(app).delete(`/api/tasks/${id}`);
    expect(del.status).toBe(204);
  });

  test("DELETE invalid id returns 404", async () => {
    const res = await request(app).delete("/api/tasks/9999");
    expect(res.status).toBe(404);
  });
});