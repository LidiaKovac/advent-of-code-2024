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
import { readFileSync } from "fs"
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

const example_matrix = []

for (let i = 0; i < 103; i++) {
  example_matrix.push([])
  for (let y = 0; y < 101; y++) {
    example_matrix[i].push(".")
  }
}

const writeToFile = (mtrx) => {
  const str = mtrx.map((row) => row.join("")).join("\n")

  writeFileSync(join(import.meta.dirname, "./output.txt"), str)
}

const addInitialPositionOnMatrix = (mtrx, bots) => {
  for (const robot of bots) {
    const { x, y } = robot.p
    if (mtrx[y][x] === ".") {
      mtrx[y][x] = "1"
    } else {
      mtrx[y][x] = parseInt(mtrx[y][x]) + 1
    }
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

let m = addInitialPositionOnMatrix(example_matrix, robots)

const moveOnMatrix = (mtrx, robot) => {
  // Remove robot from old position
  let { x, y } = robot.p
  if (!isNaN(mtrx[y][x]) && mtrx[y][x] > 0) {
    mtrx[y][x] = parseInt(mtrx[y][x]) - 1
    if (mtrx[y][x] === 0) mtrx[y][x] = "."
  }

  // Calculate new position
  let [nx, ny] = second(robot.p, robot.v, mtrx)

  // Add robot to the new position
  if (mtrx[ny][nx] === ".") {
    mtrx[ny][nx] = "1"
  } else {
    mtrx[ny][nx] = parseInt(mtrx[ny][nx]) + 1
  }

  return mtrx
}

for (let s = 0; s < 100; s++) {
  console.log("Seconds", s)
  for (let i = 0; i < robots.length; i++) {
    const bot = robots[i]
    // await pause(20)
    m = moveOnMatrix(m, bot)
    // console.log(m.length)
    // if (m) {
    //   writeToFile(m)
    // } else {
    //   console.log("Matrix is falsy", m)
    //   break
    // }
    const [nx, ny] = second(bot.p, bot.v, m)
    robots[i].p = { x: nx, y: ny }
  }
}

const middleY = Math.floor(m.length / 2)
const middleX = Math.floor(m[0].length / 2)

const topHalf = m.slice(0, middleY)
const bottomHalf = m.slice(middleY + 1)

const topLeft = topHalf.map((row) => row.slice(0, middleX))
const topRight = topHalf.map((row) => row.slice(middleX + 1))

const bottomLeft = bottomHalf.map((row) => row.slice(0, middleX))
const bottomRight = bottomHalf.map((row) => row.slice(middleX + 1))

// After your robot movement operations

const quadrants = [topLeft, topRight, bottomLeft, bottomRight]
let tot = 1
for (const quad of quadrants) {
  const str = quad.map((row) => row.join("")).join("")

  const matches = [...str.matchAll(new RegExp("[1-9]", "g"))].map((m) =>
    parseInt(m[0])
  )
  console.log(matches)
  let robotsPerQuadrant = 0
  for (const match of matches) {
    robotsPerQuadrant += match
  }
  tot *= robotsPerQuadrant
  // console.log(tot)
}
console.log("TOTAL", tot)
