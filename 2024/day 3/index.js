import { readFileSync } from "fs"
import { join } from "path"

const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")

// const regex = new RegExp(`mul\\(\\d+,\\d+\\)`, "g")
const regex = new RegExp(`(do\\(\\)|mul\\(\\d+,\\d+\\)|don't\\(\\))`, "g")
console.log(regex)
const res = [...input.matchAll(regex)]

const multiplyFromString = (str) => {
  const [first, second] = str
    .split("mul")[1]
    .replace("(", "")
    .replace(")", "")
    .split(",")
  console.log(first, second)
  return parseInt(first) * parseInt(second)
}

let sum = 0
let STATUS = "GO"
for (const op of res) {
  const str = op[0]
  console.log(str)
  if (str.includes("don't")) {
    STATUS = "STOP"
  } else if (str.includes("do(")) {
    STATUS = "GO"
  } else {
    if (STATUS === "GO") {
      sum += multiplyFromString(str)
    } else continue
  }
}
console.log(sum)
