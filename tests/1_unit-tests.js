const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("UnitTests", () => {
  // DONE: Logic handles a valid puzzle string of 81 characters
  test("handle valid string of 81 characters", (done) => {
    let input = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    assert.equal(solver.validate(input), true);
    done();
  });
  // DONE: Logic handles a puzzle string with invalid characters (not 1-9 or .)
  test("handle invalid string of 81 characters (not 1-9 or .)", (done) => {
    let input = "1.5..2.84..63.12.7.2..5..T..9..1..a.8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    assert.equal(solver.validate(input), false);
    done();
  });
  // DONE: Logic handles a puzzle string that is not 81 characters in length
  test("handle invalid string of NOT 81 characters", (done) => {
    let input = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.";
    assert.equal(solver.validate(input), false);
    done();
  });
  // DONE: Logic handles a valid row placement
  test("handle valid row placement", (done) => {
    let puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = 0;
    let column = 1;
    let value = "3";
    assert.equal(solver.checkRowPlacement(puzzleString, row, column, value), true);
    done();
  });
  // DONE: Logic handles an invalid row placement
  test("handle invalid row placement", (done) => {
    let puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = 1;
    let column = 2;
    let value = "3";
    assert.equal(solver.checkRowPlacement(puzzleString, row, column, value), false);
    done();
  });
  // DONE: Logic handles a valid column placement
  test("handle valid column placement", (done) => {
    let puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = 0;
    let column = 1;
    let value = "3";
    assert.equal(solver.checkColPlacement(puzzleString, row, column, value), true);
    done();
  });
  // DONE: Logic handles an invalid column placement
  test("handle invalid column placement", (done) => {
    let puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = 0;
    let column = 2;
    let value = "5";
    assert.equal(solver.checkColPlacement(puzzleString, row, column, value), false);
    done();
  });
  // DONE: Logic handles a valid region (3x3 grid) placement
  test("handle valid region placement", (done) => {
    let puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = 1;
    let column = 4;
    let value = "4";
    assert.equal(solver.checkRegionPlacement(puzzleString, row, column, value), true);
    done();
  });
  // DONE: Logic handles an invalid region (3x3 grid) placement
  test("handle invalid region placement", (done) => {
    let puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let row = 6;
    let column = 7;
    let value = "9";
    assert.equal(solver.checkRegionPlacement(puzzleString, row, column, value), false);
    done();
  });
  // DONE: Valid puzzle strings pass the solver
  test("valid puzzle passes solver", (done) => {
    let puzzleString = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
    assert.equal(solver.solve(puzzleString), true);
    done();
  });
  // DONE: Invalid puzzle strings fail the solver
  test("invalid puzzle fails solver", (done) => {
    let puzzleString = "999992984946381257728459613694517832812936745357824196473298561581673429269145378";
    assert.equal(solver.solve(puzzleString), false);
    done();
  });
  // DONE: Solver returns the the expected solution for an incomplete puzzzle
  test("complete incomplete puzzle", (done) => {
    let puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    let result = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
    assert.equal(solver.solve(puzzleString), result);
    done();
  });
});
