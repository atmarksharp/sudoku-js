DEBUG = false

debug_log = (s) ->
  if DEBUG is true
    console.log s

_i = (x,y) ->
  x + y*9
_x = (i) ->
  i%9
_y = (i) ->
  Math.floor(i/9)
_gx = (i) ->
  x = _x i
  Math.floor(x/3)*3
_gy = (i) ->
  y = _y i
  Math.floor(y/3)*3
_gx_x = (x) ->
  Math.floor(x/3)*3
_gy_y = (y) ->
  Math.floor(y/3)*3

GRP_LIST = [0,1,2,9,10,11,18,19,20]
_g = (gi,n) ->
  gi+GRP_LIST[n]

indexOf = null
if typeof Array.prototype.indexOf is 'undefined'
  indexOf = (arr,v) ->
    for i in [0..(arr.length-1)]
      if arr[i] is v
        return i
    return -1
else
  indexOf = (arr,v) ->
    return arr.indexOf(v)

check = (cur,val,q,a) ->
  x = _x cur
  y = _y cur
  gx = _gx_x x
  gy = _gy_y y
  gi = _i gx,gy

  for j in [0..8]
    ids = [(_i j,y),(_i x,j),(_g gi,j)]
    for i in ids
      continue if i is cur

      v = q[i]
      v = a[i] if v is 0

      if v is val
        return false

  return true 

# ----------------------

class Sudoku
  @empty: 0
  @beautify: (q) ->
    return "" if q.length is 0

    s = ''
    for i in [0..80]
      if q[i] is 0
        s += '_'
      else
        s += (''+q[i])

      if (_x i) is 8
        s += "\n"
      else
        s += ","
    return s
  @prettify: (q) ->
    return @beautify(q)

  @solve: (q) ->
    [qr,note] = @solve_reduce(q)

    # check if solved
    solved = true
    for n in qr
      if n is 0
        solved = false
        break
    
    if solved
      return qr
    else
      return @solve_backtrack(qr,note)

  # private
  @solve_reduce = (q) ->
    changed = false
    note = []
    ans = q.slice(0)

    for n in q
      if n is 0
        note.push [1,2,3,4,5,6,7,8,9]
      else
        note.push []

    # reduce
    while true
      changed = false

      for cur in [0..80]
        continue if note[cur].length is 0

        x = _x cur
        y = _y cur
        gx = _gx_x x
        gy = _gy_y y
        gi = _i gx,gy

        for j in [0..8]
          ids = [(_i j,y),(_i x,j),(_g gi,j)]
          for i in ids
            continue if i is cur

            v = ans[i]
            if v is 0 
              if note[i].length is 1
                v = note[i][0]
              else
                continue

            pos = indexOf(note[cur],v)
            if pos > -1
              note[cur].splice(pos,1)
              changed = true

      for i in [0..80]
        if note[i].length is 1
          ans[i] = note[i][0]
          note[i] = []

      if changed is false
        break
      else
        changed = false

    return [ans,note]

  # private
  @solve_backtrack = (q,note) ->
    ans = []
    cur = 0
    val = 1
    count = 0
    qid = 0
    qpos = []
    note_ids = []

    for i in [0..80]
      ans.push 0
      note_ids.push 0

    # cache position data
    for i in [0..80]
      if q[i] is 0
        qpos.push i

    # set first position
    cur = qpos[0]
    return q if typeof cur is 'undefined' # already solved

    val = note[cur][0]
    note_ids[cur] = 0

    while true
      count++

      # backtrack
      if val > 9
        ans[cur] = 0
        note_ids[cur] = 0

        qid--
        cur = qpos[qid]
        cur = -1 if typeof cur is 'undefined'

        if cur < 0
          debug_log "failed"
          return [] # solution failed
        else
          note_ids[cur] = note_ids[cur] + 1
          val = note[cur][note_ids[cur]]
          val = 10 if typeof val is 'undefined'

          ans[cur] = 0
          debug_log "---> backtrack to (#{_x cur},#{_y cur})"
          continue

      # solution successed
      else if cur > 80
        ret = []
        for i in [0..81]
          if q[i] is 0
            ret[i] = ans[i]
          else
            ret[i] = q[i]

        console.log "count: #{count}"
        return ret # Finish !!

      # process
      else
        if check(cur,val,q,ans)
          debug_log "[PUT] #{val} on (#{_x cur},#{_y cur})"
          ans[cur] = val
          
          qid++
          cur = qpos[qid]
          cur = 81 if typeof cur is 'undefined'
          if cur is 81
            continue

          note_ids[cur] = 0
          val = note[cur][0]

          debug_log "---> move to (#{_x cur},#{_y cur})"
          continue
        else
          note_ids[cur] = note_ids[cur] + 1
          val = note[cur][note_ids[cur]]
          val = 10 if typeof val is 'undefined'

          continue


@Sudoku = Sudoku