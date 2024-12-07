import { readFileSync } from "fs"
import { join } from "path"
const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")
// const input = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`

const OPTIONS = [" * ", " + "]
const correctResults = new Set()
const tested = new Set()
const customEval = (str) => {
  let cleanString = str.replaceAll("  ", " ").trim()
  if (cleanString.endsWith("+") || cleanString.endsWith("*")) {
    cleanString = cleanString.slice(0, -1)
  }
  cleanString = cleanString.trim()
  //   console.log("Actual string ", cleanString)
  const initLen = tested.size
  const finalLen = tested.add(cleanString).size
  if (initLen === finalLen) return false
  const operators = cleanString
    // .split(new RegExp("\\+|\\*", "g"))
    .split(" ")
    .map((el) => (isNaN(el) ? el : parseInt(el)))
  let temp = operators[0]
  for (let i = 1; i < operators.length; i++) {
    if (operators[i] === "*") {
      temp *= operators[i + 1]
      i++
    } else if (operators[i] === "+") {
      temp += operators[i + 1]
      i++
    }
  }
  return temp
}

function createEvalString(numbers, index, currentExpr) {
  const operators = ["*", "+"]
  if (index === numbers.length) {
    //if end of string, return arr
    return [currentExpr.trim()] //!check
  }

  const result = []
  // if first number of list, just add number
  if (index === 0) {
    result.push(...createEvalString(numbers, index + 1, `${numbers[index]}`))
  } else {
    // if any other number, add operator before current number and after the string we already built
    for (const op of operators) {
      result.push(
        ...createEvalString(
          numbers,
          index + 1,
          `${currentExpr} ${op} ${numbers[index]}`
        )
      )
    }
  }
  return result
}

// console.log(customEval("2 + 2 * 4 + 15"))

for (const row of input.split("\n")) {
  const result = parseInt(row.split(":")[0])
  const numbers = row
    .split(":")[1]
    .split(" ")
    .filter((num) => num.length > 0)
    .map((num) => parseInt(num))

  let evalString = 0
  //!all sums and all mult
  console.log("Checking all sums and mult")
  for (const OP of OPTIONS) {
    evalString = numbers.join(OP)
    const res = customEval(evalString)
    if (res === false) continue
    else {
      // console.log(evalString)
      console.log(
        "Evaluating ",
        evalString,
        " against ",
        result,
        ". Actual result is: ",
        res
      )
      if (res === result) {
        correctResults.add(result)
        console.log("Adding to list: ", result)
      }
    }
  }
  console.log("Checking mult and sum in diff positions")
  //   if (numbers.length <= 2) {
  //     //if it's only a two op operation, skip the rest of these
  //     continue
  //   }
  evalString = ""
  let res = 0
  //check add in all positions
  const allExpr = createEvalString(numbers, 0, "")
  for (const ex of allExpr) {
    const r = customEval(ex)
    console.log(
      "Evaluating ",
      ex,
      " against ",
      result,
      ". Actual result is: ",
      r
    )
    if (r === result) {
      correctResults.add(result)
      console.log("Adding to list: ", result)
    }
  }

  let max = numbers.length - 1
  evalString = ""

  for (let i = 1; i <= max; i++) {
    //   console.log(numbers.toSliced())
    const firstPart = numbers.slice(0, i).join(" + ")
    const secondPart = numbers.slice(i).join(" * ")

    evalString = firstPart + " + " + secondPart
    //   console.log("composing:", numbers, evalString)
  }
  res = customEval(evalString)
  if (res === false) continue
  else {
    console.log(
      "Evaluating ",
      evalString,
      " against ",
      result,
      ". Actual result is: ",
      res
    )
    if (res === result) {
      correctResults.add(result)
      console.log("Adding to list: ", result)
    }
  }
  evalString = ""

  for (let i = 1; i <= max; i++) {
    //   console.log(numbers.toSliced())
    const firstPart = numbers.slice(0, i).join(" * ")
    const secondPart = numbers.slice(i).join(" + ")

    evalString = firstPart + " * " + secondPart
    //   console.log("composing:", numbers, evalString)
  }
  res = customEval(evalString)
  if (res === false) continue
  else {
    console.log(
      "Evaluating ",
      evalString,
      " against ",
      result,
      ". Actual result is: ",
      res
    )
    if (res === result) {
      correctResults.add(result)
      console.log("Adding to list: ", result)
    }
  }
}
console.log(correctResults.values())
console.log([...correctResults].reduce((a, b) => a + b, 0))
