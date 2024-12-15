/*
p = position 

     0 1 2 3 4 5 6 7 8 9
  0,0>+------------------------
    0|
    1|
    2|
    3|
    4|
    5|
    6|
    7|
    8|
    
*/

// const input = `
// p=0,4 v=3,-3
// p=6,3 v=-1,-3
// p=10,3 v=-1,2
// p=2,0 v=2,-1
// p=0,0 v=1,3
// p=3,0 v=-2,-2
// p=7,6 v=-1,-3
// p=3,0 v=-1,-2
// p=9,3 v=2,3
// p=7,3 v=-1,2
// p=2,4 v=2,-3
// p=9,5 v=-3,-3`
import { readFileSync} from "fs"



import { writeFileSync } from "fs"
import { join } from "path"
const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")
const second = (p, v, mtrx) => {
  const { x, y } = p
  const { x: mx, y: my } = v
  let nx = (x + mx + mtrx[0].length) % mtrx[0].length
  let ny = (y + my + mtrx.length) % mtrx.length

  return [nx, ny]
}
const robots = input
  .split("\n")
  .filter((r) => r.length > 0)
  .map((robot) => {
    const [x, y] = robot.split(" ")[0].split("=")[1].split(",")
    const [vx, vy] = robot.split(" ")[1].split("=")[1].split(",")
    return {
      p: { x: parseInt(x), y: parseInt(y) },
      v: { x: parseInt(vx), y: parseInt(vy) },
    }
  })
// const matrix = new Array(103).map((row) => new Array(101).fill("."))
// const example_matrix = [...new Array(7).fill([...new Array(11).fill(".")])]
const example_matrix = []


for (let i = 0; i < 103; i++) {
  example_matrix.push([])
  for (let y = 0; y < 101; y++) {
    example_matrix[i].push(".")
  }
}
console.log(
  "Initial matrix dimensions:",
  example_matrix.length,
  example_matrix[0].length
)
const writeToFile = (mtrx) => {
  const str = mtrx.map((row) => row.join("")).join("\n")
      // generate(str).then((res) =>
      //   writeFileSync(
      //     join(import.meta.dirname, `./tmp/img_${i}.png`),
      //     Buffer.from(res.split(",")[1], "base64")
      //   )
      // )

  writeFileSync(join(import.meta.dirname, "./output.txt"), str)
}

const addInitialPositionOnMatrix = (mtrx, bots) => {
  for (const robot of bots) {
    mtrx[robot.p.y][robot.p.x] = "1"
    // writeToFile(mtrx)
  }
  return mtrx
}
const pause = async (s) => {
  return new Promise((res) =>
    setTimeout(() => {
      res()
    }, s)
  )
}
const mtrx = addInitialPositionOnMatrix(example_matrix, robots)

const moveOnMatrix = (mtrx, robot) => {
  mtrx[robot.p.y][robot.p.x] = "."
  let [nx, ny] = second(robot.p, robot.v, mtrx)


  if (isNaN(mtrx[robot.p.y][robot.p.x])) {
    mtrx[robot.p.y][robot.p.x] = "."
  } else if (mtrx[robot.p.y][robot.p.x] == 1) {
    mtrx[robot.p.y][robot.p.x] = "."
  } else {
    mtrx[robot.p.y][robot.p.x] = parseInt(mtrx[robot.p.y][robot.p.x]) - 1
  }

  if (isNaN(mtrx[ny][nx])) {
    mtrx[ny][nx] = "1"
  } else {
    mtrx[ny][nx] = parseInt(mtrx[ny][nx]) + 1
  }
  return mtrx
}
let newMatrix = []
for (let s = 0; s < 100; s++) {
  console.log("Seconds", s)
  for (let i = 0; i < robots.length; i++) {
    const bot = robots[i]
    // await pause(20)
    newMatrix = moveOnMatrix(newMatrix.length > 0 ? newMatrix : mtrx, bot)
    // console.log(newMatrix.length)
    if(newMatrix) {
      writeToFile(newMatrix)
      
    } else {
      console.log("Matrix is falsy", newMatrix)
      break
    }
    const [nx, ny] = second(
      bot.p,
      bot.v,
      newMatrix.length > 0 ? newMatrix : mtrx
    )
    robots[i].p = { x: nx, y: ny }
  }
}
const middleY = Math.floor(newMatrix.length / 2)
const middleX = Math.floor(newMatrix[0].length / 2)

// for (let y = 0; y < newMatrix.length; y++) {
//   newMatrix[y][middleX] = " "
// }
// for (let x = 0; x < newMatrix[0].length; x++) {
//   newMatrix[middleY][x] = " "
// }

const topHalf = newMatrix.slice(0, middleY)
const bottomHalf = newMatrix.slice(middleY + 1)

const topLeft = topHalf.map((row) => row.slice(0, middleX))
const topRight = topHalf.map((row) => row.slice(middleX + 1))

const bottomLeft = bottomHalf.map((row) => row.slice(0, middleX))
const bottomRight = bottomHalf.map((row) => row.slice(middleX + 1))

// After your robot movement operations
console.log("Final matrix dimensions:", newMatrix.length, newMatrix[0].length)

// And check the last few rows
console.log("Last two rows of matrix:")
console.log(newMatrix[newMatrix.length - 2])
console.log(newMatrix[newMatrix.length - 1])
const quadrants = [topLeft, topRight, bottomLeft, bottomRight]
let tot = 1
for (const quad of quadrants) {
  const str = quad.map((row) => row.join("")).join("")

  const matches = [...str.matchAll(new RegExp("[1-9]", "g"))].map((m) =>
    parseInt(m[0])
  )
  const robotsPerQuadrant = matches.reduce((acc, curr) => acc + curr, 0)
  tot *= robotsPerQuadrant
  // console.log(tot)
}
console.log("TOTAL", tot)