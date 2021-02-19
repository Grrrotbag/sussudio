"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  // DONE: You can POST to /api/check an object containing puzzle, coordinate, and value
  // where the coordinate is the letter A-I indicating the row, followed by a number 1-9
  //indicating the column, and value is a number from 1-9.
  app.route("/api/check").post((req, res) => {
    // console.log(req.body);
    let { puzzle, coordinate, value } = req.body;
    let cipher = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8 };

    // DONE: If the object submitted to /api/check is missing puzzle, coordinate or value, the returned
    // value will be { error: Required field(s) missing }
    if (puzzle == "" || puzzle == null || coordinate == "" || coordinate == null || value == "" || value == null) {
      return res.json({ error: "Required field(s) missing" });
    }
    // DONE: If the puzzle submitted to /api/check is greater or less than 81 characters, the returned value will be
    // { error: 'Expected puzzle to be 81 characters long' }
    if (puzzle.length != 81) {
      return res.json({ error: "Expected puzzle to be 81 characters long" });
    }
    // DONE: If the puzzle submitted to /api/check contains values which are not numbers or periods, the
    // returned value will be { error: 'Invalid characters in puzzle' }
    if (!solver.validate(puzzle)) {
      return res.json({ error: "Invalid characters in puzzle" });
    }

    // DONE: If the coordinate submitted to api/check does not point to an existing grid cell, the returned value
    // will be { error: 'Invalid coordinate'}
    const validCoords = /^[A-I][1-9]$/;
    if (!validCoords.test(coordinate)) {
      return res.json({ error: "Invalid coordinate" });
    }

    // DONE: If the value submitted to /api/check is not a number between 1 and 9, the returned values will be { error: 'Invalid value' }
    const validVal = /^[1-9]$/;
    if (!validVal.test(value)) {
      return res.json({ error: "Invalid value" });
    }

    let coords = coordinate.split("");
    coords[0] = cipher[coords[0]];
    coords[1] = parseInt(coords[1]) - 1;
    let col = coords[1];
    let row = coords[0];

    let isValidRow = solver.checkRowPlacement(puzzle, row, col, value);
    // console.log("row: ", isValidRow);

    let isValidCol = solver.checkColPlacement(puzzle, row, col, value);
    // console.log("col: ", isValidCol);

    let isValidRegion = solver.checkRegionPlacement(puzzle, row, col, value);
    // console.log("region: ", isValidRegion);

    // DONE: The return value from the POST to /api/check will be an object containing
    // a valid property, which is true if the number may be placed at the provided coordinate
    // and false if the number may not. If false, the returned object will also contain a
    // conflict property which is an array containing the strings "row", "column", and/or "region"
    // depending on which makes the placement invalid.
    if (isValidRow && isValidCol && isValidRegion) {
      // console.log("valid");
      return res.json({ valid: true });
    } else if (!isValidRow && !isValidCol && !isValidRegion) {
      return res.json({ valid: false, conflict: ["row", "column", "region"] });
    } else if (!isValidRow && !isValidCol) {
      return res.json({ valid: false, conflict: ["row", "column"] });
    } else if (!isValidRow && !isValidRegion) {
      return res.json({ valid: false, conflict: ["row", "region"] });
    } else if (!isValidCol && !isValidRegion) {
      return res.json({ valid: false, conflict: ["column", "region"] });
    } else if (!isValidRow) {
      return res.json({ valid: false, conflict: ["row"] });
    } else if (!isValidCol) {
      return res.json({ valid: false, conflict: ["column"] });
    }
  });

  // DONE: You can POST /api/solve with form data containing puzzle which will
  // be a string containing a combination of numbers (1-9) and periods . to
  //represent empty spaces. The returned object will contain a solution property
  //with the solved puzzle.
  app.route("/api/solve").post((req, res) => {
    let puzzle = req.body.puzzle;

    // DONE: If the object submitted to /api/solve is missing puzzle, the returned value
    // will be { error: 'Required field missing' }
    if (!puzzle) {
      return res.json({ error: "Required field missing" });
    }
    // DONE: If the puzzle submitted to /api/solve is greater or less than 81 characters,
    //the returned value will be { error: 'Expected puzzle to be 81 characters long' }
    if (puzzle.length != 81) {
      return res.json({ error: "Expected puzzle to be 81 characters long" });
    }
    // DONE: If the puzzle submitted to /api/solve contains values which are not numbers or
    //periods, the returned value will be { error: 'Invalid characters in puzzle' }
    if (!solver.validate(puzzle)) {
      return res.json({ error: "Invalid characters in puzzle" });
    }

    // DONE: If the puzzle submitted to /api/solve is invalid or cannot be solved, the returned
    //value will be { error: 'Puzzle cannot be solved' }

    let result = solver.solve(puzzle);
    // console.log(result);
    if (result === false) {
      return res.json({ error: "Puzzle cannot be solved" });
    } else {
      return res.json({ solution: result });
    }
  });
};
