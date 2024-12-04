// const input = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`
import { readFileSync } from "fs"
import { join } from "path"

const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")

const horizontalFinds = [...input.matchAll(new RegExp("(?=(XMAS|SAMX))", "g"))]
let counter = 0
counter += horizontalFinds.length
console.log(counter)
const columns = []
const matrix = input.split("\n").map((row) => row.split(""))
for (let x = 0; x < matrix.length; x++) {
  const column = matrix.map((row) => row[x])
  columns.push(column)
}
const vertical = columns.map((col) => col.join("")).join("\n")
const verticalFinds = [...vertical.matchAll(new RegExp("(?=(XMAS|SAMX))", "g"))]
counter += verticalFinds.length
console.log(counter)
const diagonals = []

for (let y = 0; y < matrix.length; y++) {
  let diagTopLeft = []
  for (let x = 0; x < matrix[y].length; x++) {
    if (matrix[x][y + x]) {
      diagTopLeft.push(matrix[x][y + x])
    }
  }
  let diagTopRight = []
  for (let x = 0; x < matrix[y].length; x++) {
    if (matrix[x][y - x]) {
      diagTopRight.push(matrix[x][y - x])
    }
  }
  diagonals.push(diagTopLeft)
  diagonals.push(diagTopRight)
}

const reversed = matrix.toReversed()
for (let y = 0; y < reversed.length; y++) {
  let diagTopLeft = []
  for (let x = 0; x < reversed[y].length; x++) {
    if (reversed[x][y + x]) {
      diagTopLeft.push(reversed[x][y + x])
    }
  }
  let diagTopRight = []
  for (let x = 0; x < reversed[y].length; x++) {
    if (reversed[x][y - x]) {
      diagTopRight.push(reversed[x][y - x])
    }
  }
  diagonals.push(diagTopLeft)
  diagonals.push(diagTopRight)
}

console.log()

const diagonal = diagonals
  .map((col) => col.join(""))
    .filter((el) => el.length > 4)
    
  .join("\n")
// console.log(diagonal)
const diagonalFinds = [...diagonal.matchAll(new RegExp("(?=(XMAS|SAMX))", "g"))]
// console.log(diagonalFinds)

counter += diagonalFinds.length
console.log(counter)
