import { readFileSync } from "fs"
import { join } from "path"

const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")

// Horizontal Matches
const horizontalFinds = [...input.matchAll(/(?=(XMAS|SAMX))/g)]
let counter = horizontalFinds.length

// Prepare the matrix for vertical and diagonal checks
const matrix = input.split("\n").map((row) => row.split(""))
const size = matrix.length

// Extract columns for vertical checks
const columns = []
for (let x = 0; x < matrix[0].length; x++) {
  const column = matrix.map((row) => row[x])
  columns.push(column.join(""))
}
const vertical = columns.join("\n")

// Vertical Matches
const verticalFinds = [...vertical.matchAll(/(?=(XMAS|SAMX))/g)]
counter += verticalFinds.length

// Extract all diagonals
function extractDiagonals(mat) {
  const diagonals = []
  const n = mat.length
  const m = mat[0].length

  // Top-left to bottom-right diagonals
  for (let d = 0; d < n + m - 1; d++) {
    let diag = []
    for (let i = 0; i < n; i++) {
      const j = d - i
      if (j >= 0 && j < m) diag.push(mat[i][j])
    }
    if (diag.length >= 4) diagonals.push(diag.join(""))
  }

  // Top-right to bottom-left diagonals
  for (let d = 0; d < n + m - 1; d++) {
    let diag = []
    for (let i = 0; i < n; i++) {
      const j = i - (d - m + 1)
      if (j >= 0 && j < m) diag.push(mat[i][j])
    }
    if (diag.length >= 4) diagonals.push(diag.join(""))
  }

  return diagonals
}

// Combine diagonals from both forward and reversed matrices
const diagonals = extractDiagonals(matrix)
const reversedMatrix = [...matrix].reverse()
diagonals.push(...extractDiagonals(reversedMatrix))

// Match diagonals
const diagonalFinds = diagonals.join("\n").matchAll(/(?=(XMAS|SAMX))/g)
counter += [...diagonalFinds].length

console.log(counter)
