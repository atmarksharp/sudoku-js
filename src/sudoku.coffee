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

GRP_LIST = [0,1,2,9,10,11,18,19,20]
_g = (gi,n) ->
  gi+GRP_LIST[n]

check = (cur,val,q,a) ->
  x = _x cur
  y = _y cur
  gx = _gx cur
  gy = _gy cur
  gi = _i gx,gy

  for j in [0..8]
    ids = [(_i j,y),(_i x,j),(_g gi,j)]
    for i in ids
      continue if i is cur

      v = q[i]
      v = a[i] if q[i] is 0

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
    ans = []
    cur = 0
    val = 1
    count = 0

    while true
      count++

      if val > 9 # back
        ans[cur] = 0
        loop
          cur--
          break if cur < 0 or q[cur] is 0

        if cur < 0
          debug_log "failed"
          return [] # solution failed
        else
          val = ans[cur] + 1
          ans[cur] = 0
          debug_log "---> backtrack to (#{_x cur},#{_y cur})"
          continue

      else if cur > 80 # solution successed
        ret = []
        for i in [0..81]
          if q[i] is 0
            ret[i] = ans[i]
          else
            ret[i] = q[i]

        console.log "count: #{count}"
        return ret # Finish !!

      else
        if check(cur,val,q,ans)
          debug_log "[PUT] #{val} on (#{_x cur},#{_y cur})"
          ans[cur] = val
          val = 1
          loop
              cur++
              break if cur > 80 or q[cur] is 0
          debug_log "---> move to (#{_x cur},#{_y cur})"
          continue
        else
          val++
          continue


@Sudoku = Sudoku