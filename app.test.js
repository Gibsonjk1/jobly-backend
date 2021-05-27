const request = require("supertest");

const app = require("./app");
const db = require("./db");


test("not found for site 404", async function () {
  const resp = await request(app).get("/no-such-path");
  expect(resp.statusCode).toEqual(404);
});

test("200 for found site", async function () {
  const res = await request(app).get('/companies');
  expect(res.statusCode).toEqual(200);
});

test("not found for site 404 (test stack print)", async function () {
  process.env.NODE_ENV = "";
  const resp = await request(app).get("/no-such-path");
  expect(resp.statusCode).toEqual(404);
  delete process.env.NODE_ENV;
});

afterAll(function () {
  db.end();
});
