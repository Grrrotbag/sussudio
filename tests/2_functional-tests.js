const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);
// DONE: All 14 functional tests are complete and passing. See /tests/2_functional-tests.js for the functionality you should write tests for.

suite("Functional Tests", () => {
  // DONE: Solve a puzzle with valid puzzle string: POST request to /api/solve
  test("solve with valid string", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.solution,
          "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
        );
        done();
      });
  });
  // DONE: Solve a puzzle with missing puzzle string: POST request to /api/solve
  test("solve with missing string", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({
        // puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Required field missing");
        done();
      });
  });
  // DONE: Solve a puzzle with invalid characters: POST request to /api/solve
  test("solve with invalid characters in puzzle string", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle: "D.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid characters in puzzle");
        done();
      });
  });
  // DONE: Solve a puzzle with incorrect length: POST request to /api/solve
  test("solve with puzzle string of incorrect length", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
        done();
      });
  });
  // DONE: Solve a puzzle that cannot be solved: POST request to /api/solve
  test("solve an unsolvable puzzle", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({
        puzzle: "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Puzzle cannot be solved");
        done();
      });
  });
  // DONE: Check a puzzle placement with all fields: POST request to /api/check
  test("check with valid input", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "7",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, true);
        done();
      });
  });
  // DONE: Check a puzzle placement with single placement conflict: POST request to /api/check
  test("check with valid input but single conflict", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "6",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false);
        assert.equal(res.body.conflict, "column");
        done();
      });
  });
  // DONE: Check a puzzle placement with multiple placement conflicts: POST request to /api/check
  test("check with valid input but multiple conflicts", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "4",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false);
        let compare = ["column", "region"];
        assert.deepEqual(res.body.conflict, compare);
        done();
      });
  });
  // DONE: Check a puzzle placement with all placement conflicts: POST request to /api/check
  test("check with valid input but all conflicts", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "5",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false);
        let compare = ["row", "column", "region"];
        assert.deepEqual(res.body.conflict, compare);
        done();
      });
  });
  // DONE: Check a puzzle placement with missing required fields: POST request to /api/check
  test("check with missing required fields", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });
  // DONE: Check a puzzle placement with invalid characters: POST request to /api/check
  test("check with invalid characters", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: "D.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "7",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid characters in puzzle");
        done();
      });
  });
  // DONE: Check a puzzle placement with incorrect length: POST request to /api/check
  test("check with puzzle of incorrect length", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..",
        coordinate: "A1",
        value: "7",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
        done();
      });
  });
  // DONE: Check a puzzle placement with invalid placement coordinate: POST request to /api/check
  test("check with invalid coordinate", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "X1",
        value: "7",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid coordinate");
        done();
      });
  });
  // DONE: Check a puzzle placement with invalid placement value: POST request to /api/check
  test("check with invalid value", (done) => {
    chai
      .request(server)
      .post("/api/check")
      .send({
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        coordinate: "A1",
        value: "D",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid value");
        done();
      });
  });
});
