export const getMatrixFromString = (str) => {
  return str.split("\n").map((row) => row.split(""))
}
