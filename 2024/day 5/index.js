/* 
!CONDITIONS: 
    The first rule, 47|53, means that 
        if update.includes 47 && 53:
            [47, ... , 53]
                 ^^ stuff can be here, but 47 must be before 53

TODO: Identify which updates are already in the right order.
    In the example, the first, second and third update are in correct order 
    Fourth, fifth and sith are not
TODO: Found the middle poistion for correct updates + sum them
    For some reason, the Elves also need to know the middle page number of each update being printed. 
    Because you are currently only printing the correctly-ordered updates, 
    you will need to find the middle page number of each correctly-ordered update. 
    In the above example, the correctly-ordered updates are:
        75,47,61,53,29
        97,61,53,29,13
        75,29,13
    These have middle page numbers of 61, 53, and 29 respectively. Adding these page numbers together gives 143.
*/
import { readFileSync } from "fs"
import { join } from "path"

import { getMatrixFromCommaSeparatedString } from "../utils/index.js"

const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")
const rulesStr = readFileSync(join(import.meta.dirname, "./rules.txt"), "utf-8")

// const input = `75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47`

const mtrx = getMatrixFromCommaSeparatedString(input)
//!1. fn to find middle
const findMiddle = (row) => {
  return row[Math.ceil((row.length - 1) / 2)]
}

//!2. divide rules in arrays
// const rulesStr = `47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13`

const rules = rulesStr.split("\n").map((r) => r.replaceAll("\r", "").split("|"))

const isCorrect = (row) => {
  const appropriateRules = rules.filter(
    (rule) => row.includes(rule[0]) && row.includes(rule[1])
  )

  return appropriateRules.every((rule) => {
    const [first, second] = rule
    const firstI = row.indexOf(first)
    const secondI = row.indexOf(second)
    const cond = firstI < secondI
    if (!cond) console.log(`Rule failed for ${row} with ${first}|${second}`)
    return cond
  })
}

const correct = mtrx.filter((row) => isCorrect(row))

let sum = 0
for (let i = 0; i < correct.length; i++) {
  const row = correct[i]
  sum += parseInt(findMiddle(row))
}

console.log(sum)
