const regex = /[^1-9.]/;

const gridMaker = (puzzleString) => {
  // DONE: turn string into array of arrays
  // each array should be length 9
  let puzzleArr = puzzleString.split("");
  // console.log(puzzleArr);
  let grid = [];
  for (let i = 0; i < 9; i++) {
    var arr = [];
    for (let j = 0; j < 9; j++) {
      arr.push(puzzleArr[i * 9 + j]);
    }
    grid.push(arr);
  }
  return grid;
};

class SudokuSolver {
  validate(puzzleString) {
    // DONE: The validate function should take a given puzzle
    // string and check it to see if it has 81 valid characters
    // for the input.
    if (puzzleString.length < 81) return false;
    if (puzzleString.match(regex)) return false;

    return true;
  }

  // DONE: The check functions should be validating against the
  // current state of the board.
  checkRowPlacement(puzzleString, row, column, value) {
    // DONE: we are being supplied a value and a location
    // 1. check if the location is a .
    // 2. check if row contains value
    let grid = gridMaker(puzzleString);

    if (!grid[row][column] === ".") return false;
    if (grid[row].includes(value)) return false;
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    // DONE: we are being supplied a value and a location
    // 1. check if the location is a .
    // 2. check if column contains value
    let grid = gridMaker(puzzleString);
    // console.table(grid);
    if (!grid[row][column] === ".") return false;
    let col = grid.map((val, idx) => val[column]);

    if (col.includes(value)) return false;

    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // DONE: we are being supplied a value and a location
    // 1. check if the location is a .
    // 2. check if region contains value
    // NOTE: regions are [0,1,2], [3,4,5], [6,7,8]
    let grid = gridMaker(puzzleString);
    // console.table(grid);
    let x = Math.floor(column / 3) * 3;
    let y = Math.floor(row / 3) * 3;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[y + i][x + j] === value) return false;
      }
    }
    return true;
  }

  solve(puzzleString) {
    // DONE: The solve function should handle solving any given
    // valid puzzle string, not just the test inputs and solutions.
    // You are expected to write out the logic to solve this.
    // IIRC, columns, rows and regions all need to total 45

    let grid = gridMaker(puzzleString);

    // console.table(grid);

    if (puzzleString.match(/[.]/)) {
      console.log("incomplete puzzle detected");

      let newString = solver(grid);
      // console.table(newString);
      return newString;
    }

    // DONE: check all rows equal 45
    for (let row = 0; row < 9; row++) {
      let rowTotal = eval(grid[row].join("+"));
      // console.log("row total: ", rowTotal);
      if (rowTotal != 45) return false;
    }

    // DONE: check all columns equal 45
    for (let col = 0; col < 9; col++) {
      var column = grid.map((val, idx) => val[col]);
      let colTotal = eval(column.join("+"));
      // console.log("col total: ", colTotal);
      if (colTotal != 45) return false;
    }

    // DONE: check all regions equal 45
    // https://stackoverflow.com/questions/56871597/sudoku-javascript-array
    const squares = [[], [], [], [], [], [], [], [], []];

    grid.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        const squareIndex = Math.floor(rowIdx / 3) * 3 + Math.floor(colIdx / 3);

        squares[squareIndex].push(cell);
      });
    });

    for (let region = 0; region < 9; region++) {
      let regTotal = eval(squares[region].join("+"));
      // console.log("reg total: ", regTotal);
      if (regTotal != 45) return false;
    }

    return true;
  }
}

// https://stackoverflow.com/questions/42736648/sudoku-solver-in-js/42736701#42736701
function isValid(grid, row, col, val) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (grid[row][i] == val || grid[i][col] == val || grid[m][n] == val) {
      return false;
    }
  }
  return true;
}

function solver(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] == ".") {
        for (let val = 1; val < 10; val++) {
          if (isValid(grid, row, col, val)) {
            grid[row][col] = `${val}`;
            if (solver(grid)) {
              return grid.flat().join("");
            } else {
              grid[row][col] = ".";
            }
          }
        }
        return false;
      }
    }
  }
  return grid.flat().join("");
}

module.exports = SudokuSolver;
