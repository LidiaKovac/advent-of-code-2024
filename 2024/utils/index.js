export const getMatrixFromString = (str) => {
  return str.split("\n").map((row) => row.split(""))
}
export const getMatrixFromCommaSeparatedString = (str) => {
  return str.split("\n").map((row) => row.split(","))
}
