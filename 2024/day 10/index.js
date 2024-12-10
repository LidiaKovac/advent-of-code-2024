import {
  getBottom,
  getDirections,
  getLeft,
  getMatrixFromString,
  getRight,
  getTop,
} from "../utils/index.js"

const input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

const findPaths = (mtrx, y, x, curr = 1, path = []) => {
  const [top, bottom, left, right] = getDirections(mtrx, y, x)
  if (curr == 1) {
    path.push({ y, x, el: mtrx[y][x] }) //!
  }
  if (curr > 9) {
    console.log(parsePathIntoString(path))
    return path
  }

  if (top == curr) {
    console.log("Found", curr, "on top")
    path.push({ y: y - 1, x, el: top, dir: "top" })
    findPaths(mtrx, y - 1, x, curr + 1, path)
  } else if (bottom == curr) {
    console.log("Found", curr, "on bottom")

    path.push({ y: y + 1, x, el: bottom, dir: "bottom" })
    findPaths(mtrx, y + 1, x, curr + 1, path)
  } else if (left == curr) {
    console.log("Found", curr, "on left")

    path.push({ y, x: x - 1, el: left, dir: "left" })
    findPaths(mtrx, y, x - 1, curr + 1, path)
  } else if (right == curr) {
    console.log("Found", curr, "on right")

    path.push({ y, x: x + 1, el: right, dir: "right" })
    findPaths(mtrx, y, x + 1, curr + 1, path)
  }

  return path
}

const parsePathIntoString = (arr) => {
  let str = ""
  //top 1
  //bottom 2
  //left 3
  //right 4
  for (const step of arr) {
    if (step.dir === "top") str += "1"
    if (step.dir === "bottom") str += "2"
    if (step.dir === "left") str += "3"
    if (step.dir === "right") str += "4"
  }
  return str
}

const matrix = getMatrixFromString(input)

for (let y = 0; y < matrix.length; y++) {
  const row = matrix[y]
  for (let x = 0; x < matrix[y].length; x++) {
    const col = matrix[y][x]
    if (col === "0") {
      console.log("Calculating paths for ", y, x)
      const path = findPaths(matrix, y, x)
    }
  }
}
