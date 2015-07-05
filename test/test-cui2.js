Sudoku = require('../sudoku.js').Sudoku;

var _ = Sudoku.empty;
var q = [
    _,5,_,_,_,_,_,9,_,
    _,_,7,_,_,_,_,_,_,
    6,_,_,4,_,2,_,_,_,
    _,9,_,_,_,_,3,_,5,
    _,_,_,8,_,1,_,_,_,
    _,6,2,_,_,_,_,_,1,
    7,_,_,1,_,8,_,4,_,
    3,_,_,_,_,_,_,_,_,
    _,_,_,_,_,_,9,8,_
  ];
var expected = Sudoku.beautify([
  2,5,4,7,1,3,6,9,8,
  9,1,7,5,8,6,2,3,4,
  6,3,8,4,9,2,1,5,7,
  8,9,1,2,7,4,3,6,5,
  5,7,3,8,6,1,4,2,9,
  4,6,2,3,5,9,8,7,1,
  7,2,9,1,3,8,5,4,6,
  3,8,6,9,4,5,7,1,2,
  1,4,5,6,2,7,9,8,3
]);

console.log(Sudoku.beautify(Sudoku.solve(q)));
console.log("-------------");
console.log(expected);