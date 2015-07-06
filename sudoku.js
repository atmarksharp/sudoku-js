// Generated by CoffeeScript 1.8.0
(function() {
  var DEBUG, GRP_LIST, Sudoku, check, debug_log, indexOf, _g, _gx, _gx_x, _gy, _gy_y, _i, _x, _y;

  DEBUG = false;

  debug_log = function(s) {
    if (DEBUG === true) {
      return console.log(s);
    }
  };

  _i = function(x, y) {
    return x + y * 9;
  };

  _x = function(i) {
    return i % 9;
  };

  _y = function(i) {
    return Math.floor(i / 9);
  };

  _gx = function(i) {
    var x;
    x = _x(i);
    return Math.floor(x / 3) * 3;
  };

  _gy = function(i) {
    var y;
    y = _y(i);
    return Math.floor(y / 3) * 3;
  };

  _gx_x = function(x) {
    return Math.floor(x / 3) * 3;
  };

  _gy_y = function(y) {
    return Math.floor(y / 3) * 3;
  };

  GRP_LIST = [0, 1, 2, 9, 10, 11, 18, 19, 20];

  _g = function(gi, n) {
    return gi + GRP_LIST[n];
  };

  indexOf = null;

  if (typeof Array.prototype.indexOf === 'undefined') {
    indexOf = function(arr, v) {
      var i, _j, _ref;
      for (i = _j = 0, _ref = arr.length - 1; 0 <= _ref ? _j <= _ref : _j >= _ref; i = 0 <= _ref ? ++_j : --_j) {
        if (arr[i] === v) {
          return i;
        }
      }
      return -1;
    };
  } else {
    indexOf = function(arr, v) {
      return arr.indexOf(v);
    };
  }

  check = function(cur, val, q, a) {
    var gi, gx, gy, i, ids, j, v, x, y, _j, _k, _len;
    x = _x(cur);
    y = _y(cur);
    gx = _gx_x(x);
    gy = _gy_y(y);
    gi = _i(gx, gy);
    for (j = _j = 0; _j <= 8; j = ++_j) {
      ids = [_i(j, y), _i(x, j), _g(gi, j)];
      for (_k = 0, _len = ids.length; _k < _len; _k++) {
        i = ids[_k];
        if (i === cur) {
          continue;
        }
        v = q[i];
        if (v === 0) {
          v = a[i];
        }
        if (v === val) {
          return false;
        }
      }
    }
    return true;
  };

  Sudoku = (function() {
    function Sudoku() {}

    Sudoku.empty = 0;

    Sudoku.beautify = function(q) {
      var i, s, _j;
      if (q.length === 0) {
        return "";
      }
      s = '';
      for (i = _j = 0; _j <= 80; i = ++_j) {
        if (q[i] === 0) {
          s += '_';
        } else {
          s += '' + q[i];
        }
        if ((_x(i)) === 8) {
          s += "\n";
        } else {
          s += ",";
        }
      }
      return s;
    };

    Sudoku.prettify = function(q) {
      return this.beautify(q);
    };

    Sudoku.solve = function(q) {
      var i, note, qr, solved, _j, _ref;
      _ref = this.solve_reduce(q), qr = _ref[0], note = _ref[1];
      solved = true;
      for (i = _j = 0; _j <= 80; i = ++_j) {
        if (qr[i] === 0) {
          solved = false;
          break;
        }
      }
      if (solved) {
        return qr;
      } else {
        return this.solve_backtrack(qr, note);
      }
    };

    Sudoku.solve_reduce = function(q) {
      var ans, changed, cur, gi, gx, gy, i, ids, j, note, pos, v, x, y, _j, _k, _l, _len, _m, _n;
      changed = false;
      note = [];
      ans = q.slice(0);
      for (i = _j = 0; _j <= 80; i = ++_j) {
        if (q[i] === 0) {
          note.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        } else {
          note.push([]);
        }
      }
      while (true) {
        changed = false;
        for (cur = _k = 0; _k <= 80; cur = ++_k) {
          if (note[cur].length === 0) {
            continue;
          }
          x = _x(cur);
          y = _y(cur);
          gx = _gx_x(x);
          gy = _gy_y(y);
          gi = _i(gx, gy);
          for (j = _l = 0; _l <= 8; j = ++_l) {
            ids = [_i(j, y), _i(x, j), _g(gi, j)];
            for (_m = 0, _len = ids.length; _m < _len; _m++) {
              i = ids[_m];
              if (i === cur) {
                continue;
              }
              v = ans[i];
              if (v === 0) {
                if (note[i].length === 1) {
                  v = note[i][0];
                } else {
                  continue;
                }
              }
              pos = indexOf(note[cur], v);
              if (pos > -1) {
                note[cur].splice(pos, 1);
                changed = true;
              }
            }
          }
        }
        for (i = _n = 0; _n <= 80; i = ++_n) {
          if (note[i].length === 1) {
            ans[i] = note[i][0];
            note[i] = [];
          }
        }
        if (changed === false) {
          break;
        } else {
          changed = false;
        }
      }
      return [ans, note];
    };

    Sudoku.solve_backtrack = function(q, note) {
      var ans, count, cur, i, note_ids, qid, qpos, ret, val, _j, _k, _l;
      ans = [];
      cur = 0;
      val = 1;
      count = 0;
      qid = 0;
      qpos = [];
      note_ids = [];
      for (i = _j = 0; _j <= 80; i = ++_j) {
        ans.push(0);
        note_ids.push(0);
      }
      for (i = _k = 0; _k <= 80; i = ++_k) {
        if (q[i] === 0) {
          qpos.push(i);
        }
      }
      cur = qpos[0];
      if (typeof cur === 'undefined') {
        return q;
      }
      val = note[cur][0];
      note_ids[cur] = 0;
      while (true) {
        count++;
        if (val > 9) {
          ans[cur] = 0;
          note_ids[cur] = 0;
          qid--;
          cur = qpos[qid];
          if (typeof cur === 'undefined') {
            cur = -1;
          }
          if (cur < 0) {
            debug_log("failed");
            return [];
          } else {
            note_ids[cur] = note_ids[cur] + 1;
            val = note[cur][note_ids[cur]];
            if (typeof val === 'undefined') {
              val = 10;
            }
            ans[cur] = 0;
            debug_log("---> backtrack to (" + (_x(cur)) + "," + (_y(cur)) + ")");
            continue;
          }
        } else if (cur > 80) {
          ret = [];
          for (i = _l = 0; _l <= 81; i = ++_l) {
            if (q[i] === 0) {
              ret[i] = ans[i];
            } else {
              ret[i] = q[i];
            }
          }
          console.log("count: " + count);
          return ret;
        } else {
          if (check(cur, val, q, ans)) {
            debug_log("[PUT] " + val + " on (" + (_x(cur)) + "," + (_y(cur)) + ")");
            ans[cur] = val;
            qid++;
            cur = qpos[qid];
            if (typeof cur === 'undefined') {
              cur = 81;
            }
            if (cur === 81) {
              continue;
            }
            note_ids[cur] = 0;
            val = note[cur][0];
            debug_log("---> move to (" + (_x(cur)) + "," + (_y(cur)) + ")");
            continue;
          } else {
            note_ids[cur] = note_ids[cur] + 1;
            val = note[cur][note_ids[cur]];
            if (typeof val === 'undefined') {
              val = 10;
            }
            continue;
          }
        }
      }
    };

    return Sudoku;

  })();

  this.Sudoku = Sudoku;

}).call(this);
