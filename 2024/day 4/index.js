import { readFileSync } from "fs"
import { join } from "path"
import { getMatrixFromString } from "../utils/index.js"

// const input = `.M.S......
// ..A..MSMS.
// .M.S.MAA..
// ..A.ASMSM.
// .M.S.M....
// ..........
// S.S.S.S.S.
// .A.A.A.A..
// M.M.M.M.M.
// ..........`

const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")
// check horr
const getFoundAmount = (input) => {
  const pattern = new RegExp("(?=(XMAS|SAMX))", "g")
  return [...input.matchAll(pattern)].length
}

let counter = getFoundAmount(input)

const matrix = getMatrixFromString(input)
// console.log(matrix)

const columns = []
for (let x = 0; x < matrix[0].length; x++) {
  const column = matrix.map((row) => row[x])
  columns.push(column.join(""))
}
//check vert
const vertical = columns.join("\n")
counter += getFoundAmount(vertical)

// get diag
function extractDiagonals(mat) {
  const diagonals = []
  const height = mat.length
  const width = mat[0].length

  const amountOfDiagonals = height + width - 1
  /*
  Per ogni direzione ci sono b + a diagonali, - 1 perche' e' quella centrale
  
      0 1 2 3 4

  0   X X X X X
  1   X X X X X
  2   X X X X X
  3   X X X X X
  4   X X X X X
  
  */

  // top-left ->  bottom-right
  // d => diagonale, non x perche' non parte sempre da sx
  for (let d = 0; d < amountOfDiagonals; d++) {
    let diag = []
    for (let y = 0; y < height; y++) {
      const diagX = d - y // => la diagonale si trova piu' in basso rispetto alla x
      if (diagX >= 0 && diagX < width) diag.push(mat[y][diagX])
    }
    if (diag.length >= 4) diagonals.push(diag.join(""))
  }

  // top-right -> bottom-left
  for (let d = 0; d < amountOfDiagonals; d++) {
    let diag = []
    for (let y = 0; y < height; y++) {
      //  const j = i - (d - m + 1);
      const diagX = y - (d - width + 1)
      //                   0 - (0 -   5   + 1)
      //                   0 - (-4) => 0 + 4 => 4
      /*
      la diagonale per l'altro lato si calcola con y - (posizione x - b + 1)
      quindi se sono alla diagonale 1 (la seconda in alto a dx), la y sara' 0, 
      la prossima x in diagonale sara' 0 - (1 - 5 + 1) => 3
      quindi se ho y = 0 d = 4, la mia prossima x sara' y - (x - w + 1) => 0 - (4 - 5 + 1) => 0
            
        d 4 3 2 1 0
      y
      0   X X X o X
      1   X X o X X
      2   X o X X X
      3   o X X X X
      4   X X X X X
  
*/

      if (diagX >= 0 && diagX < width) diag.push(mat[y][diagX])
    }
    if (diag.length >= 4) diagonals.push(diag.join(""))
  }

  return diagonals
}

const diagonals = extractDiagonals(matrix)
const reversedMatrix = [...matrix].reverse()
diagonals.push(...extractDiagonals(reversedMatrix))
// check diags
counter += getFoundAmount(diagonals.join("\n"))

// console.log(counter)

const getTopLeft = (y, x) => {
  if (matrix[y - 1] && matrix[y - 1][x - 1]) {
    return matrix[y - 1][x - 1]
  } else return false
}

const getTopRight = (y, x) => {
  if (matrix[y - 1] && matrix[y - 1][x + 1]) {
    return matrix[y - 1][x + 1]
  } else return false
}

const getBottomRight = (y, x) => {
  if (matrix[y + 1] && matrix[y + 1][x + 1]) {
    return matrix[y + 1][x + 1]
  } else return false
}

const getBottomLeft = (y, x) => {
  if (matrix[y + 1] && matrix[y + 1][x - 1]) {
    return matrix[y + 1][x - 1]
  } else return false
}

let pt2Counter = 0
for (let y = 0; y < matrix.length; y++) {
  const row = matrix[y]
  for (let x = 0; x < row.length; x++) {
    const char = row[x]
    if (char !== "A") continue
    /*M . S
      . A .
      M . S*/
    if (
      getTopLeft(y, x) === "M" &&
      getTopRight(y, x) === "S" &&
      getBottomLeft(y, x) === "M" &&
      getBottomRight(y, x) === "S"
    ) {
      pt2Counter++
    }
    /* 
    S . S
    . A .
    M . M
    */

    if (
      getTopLeft(y, x) === "S" &&
      getTopRight(y, x) === "S" &&
      getBottomLeft(y, x) === "M" &&
      getBottomRight(y, x) === "M"
    ) {
      pt2Counter++
    }
    /* 
    S . S
    . A .
    M . M
    */

    if (
      getTopLeft(y, x) === "S" &&
      getTopRight(y, x) === "M" &&
      getBottomLeft(y, x) === "S" &&
      getBottomRight(y, x) === "M"
    ) {
      pt2Counter++
    }
    /* 
    M . M
    . A .
    S . S
    */
    if (
      getTopLeft(y, x) === "M" &&
      getTopRight(y, x) === "M" &&
      getBottomLeft(y, x) === "S" &&
      getBottomRight(y, x) === "S"
    ) {
      pt2Counter++
    }
  }
}

console.log(pt2Counter)
