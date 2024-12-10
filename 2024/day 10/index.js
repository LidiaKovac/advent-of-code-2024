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

console.log(getMatrixFromString(input))

const paths = []
const findPaths = (mtrx, y, x, curr = 1, path = []) => {
  console.log("PIPPO", path)
  if (path.length == 10) {
    console.log("PATH DISPONIBILE", path)
    paths[paths.length - 1].add(parsePathIntoString(path))
  }
  const [top, bottom, left, right] = getDirections(mtrx, y, x)
  if (curr == 1) {
    path.push({ y, x, el: mtrx[y][x] })
  }
  const possibleRoutes = [
    { dir: "top", ny: y - 1, nx: x, val: top },
    { dir: "bottom", ny: y + 1, nx: x, val: bottom },
    { dir: "left", ny: y, nx: x - 1, val: left },
    { dir: "right", ny: y, nx: x + 1, val: right },
  ].filter((el) => el.val == curr)
  console.log(possibleRoutes.length)
  if (possibleRoutes.length > 1) {
    console.log("There are several paths")
    for (const p of possibleRoutes) {
      console.log("Following path", p)
      const index = path.findIndex((step) => step.el == curr)
      if (index > -1) {
        path = path.slice(0, index)
      }
      path.push({ y: p.ny, x: p.nx, el: p.val, dir: p.dir })
      findPaths(mtrx, p.ny, p.nx, curr + 1, [...path])

    }
  } else {
    if (top == curr) {
      path.push({ y: y - 1, x, el: top, dir: "top" })
      findPaths(mtrx, y - 1, x, curr + 1, [...path])
    } else if (bottom == curr) {
      path.push({ y: y + 1, x, el: bottom, dir: "bottom" })
      findPaths(mtrx, y + 1, x, curr + 1, [...path])
    } else if (left == curr) {
      path.push({ y, x: x - 1, el: left, dir: "left" })
      findPaths(mtrx, y, x - 1, curr + 1, [...path])
    } else if (right == curr) {
      path.push({ y, x: x + 1, el: right, dir: "right" })
      findPaths(mtrx, y, x + 1, curr + 1, [...path])
    }
  }

}

const parsePathIntoString = (arr) => {
  let str = ""

  for (const { y, x } of arr) {
    str += `${y}/${x}|`
  //   if (step.dir === "top")
  //   if (step.dir === "bottom") str += "2"
  //   if (step.dir === "left") str += "3"
  //   if (step.dir === "right") str += "4"
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
      paths.push(new Set())
      findPaths(matrix, y, x)
    }
  }
}

console.log("FINAle")
console.log()

let tot = 0
for (const row of paths) {
  const alreadySeenCoords = []
  for (const el of row) {
    const coords = el.split('|').filter(el => el.length > 0)
    const nineCoords = coords[coords.length - 1]
    if (alreadySeenCoords.includes(nineCoords)) {

    } else {
      alreadySeenCoords.push(nineCoords)
    }
  }
  tot += alreadySeenCoords.length
}
console.log(tot)