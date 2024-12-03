/* 
// .split mul => x,(2,4)
 replaceAll => !(m,u,l,(),num) => mul(2,4) 
*/
// const regex = new RegExp(`mul\(\d+,\d+\)/g`, "g")
import { readFileSync } from "fs"
import { join } from "path"

// const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")

const regex = new RegExp(`mul\\(\\d+,\\d+\\)`, "g")
console.log(regex)

// const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
// input.replaceAll(regex, "")
const res = [...input.matchAll(regex)]
let sum = 0
for (const op of res) {
  //   console.log(op[0])
  const str = op[0]

  const [first, second] = str
    .split("mul")[1]
    .replace("(", "")
    .replace(")", "")
    .split(",")
  sum += parseInt(first) * parseInt(second)
  //   console.log(str.replaceAll(new RegExp(`mul(\\(|\\)/)`, "g"), "")) => TODO
}
console.log(sum)
