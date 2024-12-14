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

const input = `
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`

import { writeFileSync } from "fs"
import { join } from "path"
const second = (p, v) => {
  const { x, y } = p
  const { x: mx, y: my } = v
  let nx = x + mx
  let ny = y + my
  if (ny >= mtrx.length) {
    console.log("out of boundary bottom", ny, mtrx.length)
    const newPos = ny - mtrx.length
    ny = newPos
  }
  if (nx >= mtrx[0].length) {
    console.log("out of boundary right", nx, mtrx[0].length)

    const newPos = nx - mtrx[0].length
    console.log("NEW POS", x, nx, mx, newPos)
    nx = newPos
  }
  if (ny < 0) {
    const newPos = mtrx.length + ny
    ny = newPos
  }
  if (nx < 0) {
    const newPos = mtrx[0].length + nx
    nx = newPos
  }

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
console.log(robots)
// const matrix = new Array(103).map((row) => new Array(101).fill("."))
// const example_matrix = [...new Array(7).fill([...new Array(11).fill(".")])]
const example_matrix = []

for (let i = 0; i < 7; i++) {
  example_matrix.push([])
  for (let y = 0; y < 11; y++) {
    example_matrix[i].push(".")
  }
}

const writeToFile = (mtrx) => {
  const str = mtrx.map((row) => row.join("")).join("\n")

  writeFileSync(join(import.meta.dirname, "./output.txt"), str)
}

const addInitialPositionOnMatrix = (mtrx, bots) => {
  for (const robot of bots) {
    console.log(mtrx[robot.p.y])
    mtrx[robot.p.y][robot.p.x] = "1"
    writeToFile(mtrx)
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
  mtrx[robot.p.y][robot.p.y] = "."
  let [nx, ny] = second(robot.p, robot.v)

  console.log(`Moving from ${robot.p.x}/${robot.p.y} to ${nx}/${ny}`)

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

for (let s = 0; s < 100; s++) {
  for (let i = 0; i < robots.length; i++) {
    const bot = robots[i]
    // await pause(200)
    writeToFile(moveOnMatrix(mtrx, bot))
    const [nx, ny] = second(bot.p, bot.v)
    robots[i].p = { x: nx, y: ny }
    console.log("new bot", mtrx[0].length, robots[i])
  }
}
