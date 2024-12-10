import {
  getBottom,
  getDirections,
  getLeft,
  getMatrixFromString,
  getRight,
  getTop,
} from "../utils/index.js"

const input = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`
const paths = new Set()
const findPaths = (mtrx, y, x, curr = 1, path = []) => {
  const [top, bottom, left, right] = getDirections(mtrx, y, x)
  if (curr == 1) {
    path.push({ y, x, el: mtrx[y][x] }) //!
    console.log(parsePathIntoString(path))
  }

  if (curr > 9) {
    paths.add(parsePathIntoString(path))
    console.log(paths)
    return path
  }
  //path should not be pushed if last num !== 9
  const possibleRoutes = [
    { dir: "top", val: top },
    { dir: "bottom", val: bottom },
    { dir: "left", val: left },
    { dir: "right", val: right },
  ].filter((el) => el.val == curr)
  if (possibleRoutes.length > 1) {
    console.log("There are several paths")
    for (const p of possibleRoutes) {
      const index = path.findIndex((step) => step.el == curr)
      if (index > -1) {
        path.slice(0, index + 1)
      } else {
        console.log("Following path", p)
        //dove sono
        //le direzioni in cui posso andare
        //la direzione + val
        if (p.dir === "top") {
          console.log("Moving top")

          path.push({ y: y - 1, x, el: p.val, dir: "top" })
          console.log(parsePathIntoString(path))
          findPaths(mtrx, y - 1, x, curr + 1, path)
        }
        if (p.dir === "bottom") {
          console.log("Moving bottom")

          path.push({ y: y + 1, x, el: p.val, dir: "bottom" })
          console.log(parsePathIntoString(path))
          findPaths(mtrx, y + 1, x, curr + 1, path)
        }
        if (p.dir === "left") {
          console.log("Moving left")

          path.push({ y, x: x - 1, el: p.val, dir: "left" })
          console.log(parsePathIntoString(path))
          findPaths(mtrx, y, x - 1, curr + 1, path)
        }
        if (p.dir === "right") {
          console.log("Moving right")

          path.push({ y, x: x + 1, el: p.val, dir: "right" })
          console.log(parsePathIntoString(path))
          findPaths(mtrx, y, x + 1, curr + 1, path)
        }
      }
    }
  } else {
    console.log("Only one path found")
    if (top == curr) {
      console.log("Moving top")

      path.push({ y: y - 1, x, el: top, dir: "top" })
      console.log(parsePathIntoString(path))
      findPaths(mtrx, y - 1, x, curr + 1, path)
    } else if (bottom == curr) {
      console.log("Moving bottom")

      path.push({ y: y + 1, x, el: bottom, dir: "bottom" })
      console.log(parsePathIntoString(path))
      findPaths(mtrx, y + 1, x, curr + 1, path)
    } else if (left == curr) {
      console.log("Moving left")

      path.push({ y, x: x - 1, el: left, dir: "left" })
      console.log(parsePathIntoString(path))
      findPaths(mtrx, y, x - 1, curr + 1, path)
    } else if (right == curr) {
      console.log("Moving right")

      path.push({ y, x: x + 1, el: right, dir: "right" })
      console.log(parsePathIntoString(path))
      findPaths(mtrx, y, x + 1, curr + 1, path)
    }
  }

  return null
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
      const paths = new Set()
      const path = findPaths(matrix, y, x)
    }
  }
}
