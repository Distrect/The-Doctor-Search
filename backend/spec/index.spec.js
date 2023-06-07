import supertest from "supertest";
import Database from "../database/Database.js";
// import Doctor from "../classes/Doctor.js";
import Registerer from "../classes/Hospital.js";
import Server from "../index.js";
import jasmine from "jasmine";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe("Database test suite", () => {
  it("Database çalıştırır", async () => {
    await Database.initDatabase();
    expect(true).toBe(true);
    console.log("Databse Test Suite is Done and retruned OK");
  });
});

describe("Routes Test Suite", () => {
  it("Return single Doctor", (done) => {
    supertest(Server.getApp())
      .get("/doctor/1")
      .expect(201)
      .end((error) => (error ? done.fail(error) : done()));
  });
  it("Gets Filters", (done) => {
    supertest(Server.getApp())
      .get("/filters/getfilters")
      .expect(201)
      .end((error) => (error ? done.fail(error) : done()));
  });
});
