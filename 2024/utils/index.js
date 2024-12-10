export const getMatrixFromString = (str) => {
  return str.split("\n").map((row) => row.split(""))
}
export const getMatrixFromCommaSeparatedString = (str) => {
  return str.split("\n").map((row) => row.split(","))
}


export const getTop = (mtrx, y, x) => (mtrx[y - 1] ? mtrx[y - 1][x] : null)
export const getBottom = (mtrx, y, x) => (mtrx[y + 1] ? mtrx[y + 1][x] : null)
export const getLeft = (mtrx, y, x) => (mtrx[y][x - 1] ? mtrx[y][x - 1] : null)
export const getRight = (mtrx, y, x) => (mtrx[y][x + 1] ? mtrx[y][x + 1] : null)

export const getDirections = (mtrx, y, x) => [
  getTop(mtrx, y, x),
  getBottom(mtrx, y, x),
  getLeft(mtrx, y, x),
  getRight(mtrx, y, x),
]