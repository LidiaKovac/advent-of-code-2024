import { readFileSync } from "fs"
import { join } from "path"


const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")
// const input = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`


const rows = input.split("\n").filter(line => line.length > 0)
const nums = rows.map(row => row.split("   "))
const left = nums.map(arr => arr[0]).sort()
const right = nums.map(arr => arr[1]).sort()

let tot = 0
for (let i = 0; i < left.length; i++) {
    tot += Math.abs(parseInt(left[i]) - parseInt(right[i]))
}

console.log(tot)

// Calculate a total similarity score by adding up each number in the left
//list after multiplying it by the number of times that number appears in the right list.

let similarity_score_total = 0
for (let i = 0; i < left.length; i++) {
    const num = left[i]
    let count = 0
    for (let y = 0; y < right.length; y++) {
        if (right[y] === num) count++
    }
    let similarity_score = parseInt(num) * count
    similarity_score_total += similarity_score
}

console.log(similarity_score_total)