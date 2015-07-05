QUnit.test("Sudoku.empty is 0", function(assert){
  assert.ok(Sudoku.empty === 0);
});

QUnit.test("Sudoku solve - level 1", function(assert){
  var _ = Sudoku.empty;
  var q = [
      _,_,_,1,9,_,_,3,6,
      _,_,6,_,3,7,1,_,_,
      3,1,9,_,_,2,8,_,_,
      1,6,_,_,8,_,_,9,3,
      _,_,_,4,_,9,_,_,_,
      9,8,_,_,1,_,_,7,5,
      7,9,8,_,_,1,3,_,_,
      _,_,1,_,5,8,9,_,_,
      _,_,_,9,4,_,_,1,8
    ];
  var expected = Sudoku.beautify([
    8,7,2,1,9,4,5,3,6,
    5,4,6,8,3,7,1,2,9,
    3,1,9,5,6,2,8,4,7,
    1,6,7,2,8,5,4,9,3,
    2,5,3,4,7,9,6,8,1,
    9,8,4,3,1,6,2,7,5,
    7,9,8,6,2,1,3,5,4,
    4,3,1,7,5,8,9,6,2,
    6,2,5,9,4,3,7,1,8
  ]);


  var actual = Sudoku.beautify(Sudoku.solve(q));
  assert.deepEqual(actual,expected);
});

QUnit.test("Sudoku solve - level 2", function(assert){
  var _ = Sudoku.empty;
  var q = [
      _,_,_,_,5,7,4,3,_,
      5,4,_,3,_,_,2,8,_,
      8,3,_,4,2,6,_,_,_,
      4,_,1,_,_,_,9,6,_,
      6,_,8,_,_,_,7,_,3,
      _,7,9,_,_,_,8,_,4,
      _,_,_,5,8,3,_,2,9,
      _,8,5,_,_,2,_,4,1,
      _,6,3,9,1,_,_,_,_
    ];
  var expected = Sudoku.beautify([
    1,9,2,8,5,7,4,3,6,
    5,4,6,3,9,1,2,8,7,
    8,3,7,4,2,6,1,9,5,
    4,5,1,7,3,8,9,6,2,
    6,2,8,1,4,9,7,5,3,
    3,7,9,2,6,5,8,1,4,
    7,1,4,5,8,3,6,2,9,
    9,8,5,6,7,2,3,4,1,
    2,6,3,9,1,4,5,7,8
  ]);


  var actual = Sudoku.beautify(Sudoku.solve(q));
  assert.deepEqual(actual,expected);
});

QUnit.test("Sudoku solve - level 3", function(assert){
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


  var actual = Sudoku.beautify(Sudoku.solve(q));
  assert.deepEqual(actual,expected);
});