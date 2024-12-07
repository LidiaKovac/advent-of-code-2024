/*
     0123456789
0    ....#.....
1    .........#
2    ..........
3    ..#.......
4    .......#..
5    ..........
6    .#.O^.....
7    ........#.
8    #.........
9    ......#...


^ = guard (facing up) (6/4)
# = obstacles

!guard instructions:
- if something in front of you, turn 90deg
    else move forward

*/

import { getMatrixFromString } from "../utils/index.js"

const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
// const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")
const guardPattern = new RegExp("\\^|\\>|\\<|v", "g")

const findGuardCoordinates = (mtrx) => {
  for (let y = 0; y < mtrx.length; y++) {
    const row = mtrx[y]
    for (let x = 0; x < row.length; x++) {
      const col = row[x]
      if (col.match(guardPattern)) {
        console.log("Guard: ", y, x, mtrx[y][x])
        return [y, x, mtrx[y][x]]
      } else continue
    }
  }
  console.log("Guard not found")
  return [false, false, false]
}
const turn90Deg = (char) => {
  switch (char) {
    case "^":
      return ">"
    case ">":
      return "v"
    case "v":
      return "<"
    case "<":
      return "^"
    default:
      console.log("Invalid char")
      break
  }
}

const findNext = (guard, mtrx, y, x) => {
  console.log("Finding next from ", mtrx[y][x])
  switch (guard) {
    case "^":
      if (mtrx[y - 1]) return [y - 1, x]
      else return [false, false]
    case ">":
      if (mtrx[y][x + 1]) return [y, x + 1]
      else return [false, false]
    case "v":
      if (mtrx[y + 1]) return [y + 1, x]
      else return [false, false]
    case "<":
      if (mtrx[y][x - 1]) return [y, x - 1]
      else return [false, false]
    default:
      console.log("Invalid input")
      return [false, false]
  }
}

const markPath = (mtrx, y, x) => {
  const [gy, gx, guard] = findGuardCoordinates(mtrx)
  const [ny, nx] = findNext(guard, mtrx, y, x)
  console.log("next", mtrx[ny][nx])
  if (mtrx[ny][nx] === "#") {
    return "+"
  } else if (guard === "^" || guard === "v") {
    return "|"
  } else if (guard === ">" || guard === "<") {
    return "-"
  } else return "X"
}

const getPrevious = (mtrx, y, x) => {
  const [gy, gx, guard] = findGuardCoordinates(mtrx)
  switch (guard) {
    case "^":
      if (mtrx[y + 1]) return [y + 1, x]
      else return [false, false]
    case ">":
      if (mtrx[y][x - 1]) return [y, x - 1]
      else return [false, false]
    case "v":
      if (mtrx[y - 1]) return [y - 1, x]
      else return [false, false]
    case "<":
      if (mtrx[y][x + 1]) return [y, x + 1]
      else return [false, false]
    default:
      console.log("Invalid input")
      return [false, false]
  }
}

const loopMtrx = async (mtrx) => {
  let isLoop = false
  const [iy, ix, initialGuard] = findGuardCoordinates(mtrx)
  console.log(`Starting at ${iy}, ${ix}`, mtrx.length, mtrx[0].length)
  let y = iy
  let x = ix
  let stop = false
  while (y < mtrx.length) {
    while (x < mtrx[y].length) {
      await Promise.allSettled([
        new Promise((res) =>
          setTimeout(() => {
            res()
          }, 500)
        ),
      ])
      const [gy, gx, guard] = findGuardCoordinates(mtrx)
      if (iy === gy && ix === gx && guard === initialGuard) {
        console.log("Loop")
        stop = true
        isLoop = true
        break
      }
      if (gy === false || gx === false || guard === false) {
        stop = true
        break
      }
      const [ny, nx] = findNext(mtrx[gy][gx], mtrx, y, x)
      console.log("Next guard coords: ", ny, nx)
      if (ny > mtrx.length || nx > mtrx[y].length) {
        stop = true
        break
      }
      if (ny === false || nx === false) {
        stop = true
        break
      }
      const old_guard = mtrx[y][x]
      if (mtrx[ny][nx] === "#" || mtrx[ny][nx] === "O") {
        console.log("Turning")
        mtrx[gy][gx] = turn90Deg(mtrx[y][x])

        continue
      }
      mtrx[y][x] = markPath(mtrx, y, x)

      // console.log(mtrx)
      if (
        mtrx[ny][nx] === "." ||
        mtrx[ny][nx] === "|" ||
        mtrx[ny][nx] === "-" ||
        mtrx[ny][nx] === "+"
      ) {
        y = ny
        x = nx
        mtrx[ny][nx] = guard
      }
      writeFileSync(
        join(import.meta.dirname, "./check.txt"),
        mtrx.map((r) => r.join("")).join("\n")
      )
    }
    if (stop) break
  }
  return isLoop
}

let matrix = getMatrixFromString(input)
const copyOfMatrix = getMatrixFromString(input)
// // loopMtrx(matrix)
let loops = 0
for (let a = 0; a < matrix.length; a++) {
  const row = matrix[a]
  for (let b = 0; b < row.length; b++) {
    const prev = matrix[a][b]
    // const col = row[b]
    matrix[a][b] = "O"
    loops += loopMtrx(matrix) ? 1 : 0
    matrix[a][b] = prev
    console.log(matrix)
  }
}
console.log(loops)
// loopMtrx(matrix)
const str = matrix.map((r) => r.join("")).join("\n") + "\n"
console.log([...str.matchAll(new RegExp("X", "g"))].length)
