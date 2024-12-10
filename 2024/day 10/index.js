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
const findPaths = (mtrx, y, x, curr = 1, path = []) => {
  const [top, bottom, left, right] = getDirections(mtrx, y, x)
  if (curr == 1) {
    path.push({ y, x, el: mtrx[y][x] }) //!
  }

  if (curr > 9) {
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
        path = path.slice(0, index + 1)
        console.log("Taglia")
      } else {

        if (p.dir === "top") {
          path.push({ y: y - 1, x, el: p.val, dir: "top" })
          findPaths(mtrx, y - 1, x, curr + 1, path)
        }
        if (p.dir === "bottom") {

          path.push({ y: y + 1, x, el: p.val, dir: "bottom" })

          findPaths(mtrx, y + 1, x, curr + 1, path)
        }
        if (p.dir === "left") {

          path.push({ y, x: x - 1, el: p.val, dir: "left" })

          findPaths(mtrx, y, x - 1, curr + 1, path)
        }
        if (p.dir === "right") {

          path.push({ y, x: x + 1, el: p.val, dir: "right" })

          findPaths(mtrx, y, x + 1, curr + 1, path)
        }
      }
      console.log("Current path", parsePathIntoString(path))
      if (path.length == 9) {

      }

    }
  } else {


    if (top == curr) {


      path.push({ y: y - 1, x, el: top, dir: "top" })

      findPaths(mtrx, y - 1, x, curr + 1, path)
    } else if (bottom == curr) {

      path.push({ y: y + 1, x, el: bottom, dir: "bottom" })

      findPaths(mtrx, y + 1, x, curr + 1, path)
    } else if (left == curr) {

      path.push({ y, x: x - 1, el: left, dir: "left" })

      findPaths(mtrx, y, x - 1, curr + 1, path)
    } else if (right == curr) {

      path.push({ y, x: x + 1, el: right, dir: "right" })

      findPaths(mtrx, y, x + 1, curr + 1, path)
    }
    if (path.length == 9) console.log("PATH DISPONIBILE")
    console.log(parsePathIntoString(path))

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
