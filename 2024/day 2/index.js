import { readFileSync } from "fs"
import { join } from "path"

const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")
// const input = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`

const levels = input
  .split("\n")
  .map((lvl) => lvl.split(" ").map((str) => parseInt(str)))
// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.
let safe_levels = 0
const checkSafe = (arr) => {
  let is_safe = true
  let is_decreasing = false
  let is_increasing = false
  for (let i = 0; i < arr.length; i++) {
    const not_abs_diff = arr[i] - arr[i + 1]
    const diff = Math.abs(not_abs_diff)

    if (diff === 0 || diff > 3) {
      is_safe = false
      break
    }
    if (not_abs_diff > 0) {
      if (is_increasing) {
        is_safe = false
        break
      }
      is_decreasing = true
    } else if (not_abs_diff < 0) {
      if (is_decreasing) {
        is_safe = false
        break
      }
      is_increasing = true
    }
  }
  return is_safe
}
for (const level of levels) {
  const is_safe = checkSafe(level)
  if (is_safe) {
    safe_levels++
  } else {
    for (let i = 0; i < level.length; i++) {
      const reduced = level.toSpliced(i, 1)
      const is_safe = checkSafe(reduced)
      if (is_safe) {
        safe_levels++
        break
      }
    }
  }
}
console.log(safe_levels)
