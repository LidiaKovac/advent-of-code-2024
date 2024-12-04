const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

/* 
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
*/

class Matrix {
  matrix
  counter = 0
  directions = [
    { dir: "top", y: -1, x: 0 },
    { dir: "bottom", y: 1, x: 0 },
    { dir: "left", y: 0, x: -1 },
    { dir: "right", y: 0, x: 1 },
    { dir: "top-left", y: -1, x: -1 },
    { dir: "top-right", y: -1, x: 1 },
    { dir: "bottom-left", y: 1, x: -1 },
    { dir: "bottom-right", y: 1, x: 1 },
  ]
  letters = ["X", "M", "A", "S"]
  constructor(str) {
    this.matrix = str.split("\n").map((row) => row.split(""))
  }

  getTop(y, x) {
    if (this.matrix[y - 1]) {
      return this.matrix[y - 1][x]
    } else return false
  }

  getBottom(y, x) {
    if (this.matrix[y + 1]) {
      return this.matrix[y + 1][x]
    } else return false
  }

  getLeft(y, x) {
    if (this.matrix[y] && this.matrix[y][x - 1]) {
      return this.matrix[y][x - 1]
    } else return false
  }
  getRight(y, x) {
    if (this.matrix[y] && this.matrix[y][x + 1]) {
      return this.matrix[y][x + 1]
    } else return false
  }

  getTopLeft(y, x) {
    if (this.matrix[y - 1] && this.matrix[y - 1][x - 1]) {
      return this.matrix[y - 1][x - 1]
    } else return false
  }
  getTopRight(y, x) {
    if (this.matrix[y - 1] && this.matrix[y - 1][x + 1]) {
      return this.matrix[y - 1][x + 1]
    } else return false
  }
  getBottomLeft(y, x) {
    if (this.matrix[y + 1] && this.matrix[y + 1][x - 1]) {
      return this.matrix[y + 1][x - 1]
    } else return false
  }
  getBottomRight(y, x) {
    if (this.matrix[y + 1] && this.matrix[y + 1][x + 1]) {
      return this.matrix[y + 1][x + 1]
    } else return false
  }

  checkDirection(direction, y, x) {
    console.log(
      "Looking at ",
      direction,
      " with actual coordinates ",
      y,
      "/",
      x
    )
    if (direction === "top") {
      return this.getTop(y, x)
    }
    if (direction === "bottom") {
      return this.getBottom(y, x)
    }
    if (direction === "left") {
      return this.getLeft(y, x)
    }
    if (direction === "right") {
      return this.getRight(y, x)
    }
    if (direction === "top-left") {
      return this.getTopLeft(y, x)
    }
    if (direction === "top-right") {
      return this.getTopRight(y, x)
    }
    if (direction === "bottom-left") {
      return this.getBottomLeft(y, x)
    }
    if (direction === "bottom-right") {
      return this.getBottomRight(y, x)
    }
  }

  returnSurroundings(y, x) {
    return this.directions.map((direction) =>
      this.checkDirection(direction.dir, y, x)
    )
  }

  getDirectionFromIndex(i) {
    return this.directions[i]
  }

  checkRow(row) {
    const match = [
      ...row.join("").matchAll(new RegExp("XMAS(?!AMX)|(?<!XMA)SAMX", "g")),
    ].flat()
    console.log("single", match)

    return match.length
  }

  checkDouble(row) {
    const match = [...row.join("").matchAll(new RegExp("(?=(XMASAMX))", "g"))]
      .flat()
      .filter((el) => el.length > 0)
    console.log(
      "double",
      match.filter((el) => el.length > 0)
    )
    return match.length > 0 ? match.length + 1 : match.length
  }

  isXMAS() {
    this.counter = 0
    for (let y = 0; y < this.matrix.length; y++) {
      // checkrows
      console.log(this.matrix[y])
      this.counter += this.checkRow(this.matrix[y])
      this.counter += this.checkDouble(this.matrix[y])
    }
    console.log("Counter after rows ", this.counter)
    const columns = []
    for (let x = 0; x < this.matrix[0].length; x++) {
      const column = this.matrix.map((row) => row[x])
      columns.push(column)
    }
    for (const col of columns) {
      this.counter += this.checkRow(col)
      this.counter += this.checkDouble(col)
    }
    console.log("Counter after cols ", this.counter)

    const diagonals = []

    for (let y = 0; y < this.matrix.length; y++) {
      let diagTopLeft = []
      for (let x = 0; x < this.matrix[y].length; x++) {
        // console.log(x, y + x)
        // console.log(x, y + x)

        if (this.matrix[x][y + x]) {
          diagTopLeft.push(this.matrix[x][y + x])
        }
      }
      console.log(diagTopLeft)
      console.log("---")
      let diagTopRight = []
      for (let x = 0; x < this.matrix[y].length; x++) {
        // console.log(x, y + x)
        // console.log(x, y + x)

        if (this.matrix[x][y - x]) {
          diagTopRight.push(this.matrix[x][y - x])
        }
      }
      console.log(diagTopRight)
      console.log("---")
      diagonals.push(diagTopLeft)
      diagonals.push(diagTopRight)
    }
    const reversed = this.matrix.toReversed()
    for (let y = 0; y < reversed.length; y++) {
      let diagTopLeft = []
      for (let x = 0; x < reversed[y].length; x++) {
        // console.log(x, y + x)

        if (reversed[x][y + x]) {
          diagTopLeft.push(reversed[x][y + x])
        }
      }
      console.log(diagTopLeft)
      console.log("---")
      let diagTopRight = []
      for (let x = 0; x < reversed[y].length; x++) {
        // console.log(x, y + x)

        // console.log(x, y + x)
        if (reversed[x][y - x]) {
          diagTopRight.push(reversed[x][y - x])
        }
      }
      console.log(diagTopRight)
      console.log("---")
      diagonals.push(diagTopLeft)
      diagonals.push(diagTopRight)
    }
    /*   0123456789
      0  MMMSXXMASM
      1  MSAMXMSMSA
      2  AMXSXMAAMM
      3  MSAMASMSMX
      4  XMASAMXAMM
      5  XXAMMXXAMA
      6  SMSMSASXSS
      7  SAXAMASAAA
      8  MAMMMXMMMM
      9  MXMXAXMASX
    
         9 0 

         

         6 0
         7 1 
         8 2
         9 3

         7 0 
         8 1 
         9 2 

         8 0 
         9 1

      */
    // for (let y = this.matrix.length - 1; y >= 0; y--) {
    //   let diagonal3 = []
    //   console.log("row ", y)

    //   for (let x = 0; x < this.matrix[y].length; x++) {
    //     console.log(y, y - x)
    //     if (this.matrix[x][y - x]) {
    //       diagonal3.push(this.matrix[x][y - x])
    //     }
    //   }
    //   console.log(diagonal3)
    // }
    console.log(diagonals)

    // console.log(new Set(diagonals))
    const set = new Set(diagonals.map((l) => l.join("")))
    const unique = [...set].map((l) => l.split(""))
    for (const d of unique) {
      this.counter += this.checkRow(d)
      this.counter += this.checkDouble(d)
    }
  }
}

const m = new Matrix(input)
m.isXMAS()
console.log(m.counter)
