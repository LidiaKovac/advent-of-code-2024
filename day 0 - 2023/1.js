/* 
As they're making the final adjustments, they discover that their calibration document 
(your puzzle input) has been amended by a very young Elf who was apparently just excited to 
show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally 
contained a specific calibration value that the Elves now need to recover. 
On each line, the calibration value can be found by combining the first digit and the last digit 
(in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?

// - leggere il file linea per linea 
- trovare tutti i numeri per ogni linea
- trovare il primo e l'ultimo numero di ogni linea
- creare i numeri da due cifre
- sommarli

*/

import { readFileSync } from "fs"
import { join } from "path"

const txt = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")
const lines = txt.split("\n")
const NUMBERS = [
    { word: "one", number: 1 },
    { word: "two", number: 2 },
    { word: "three", number: 3 },
    { word: "four", number: 4 },
    { word: "five", number: 5 },
    { word: "six", number: 6 },
    { word: "seven", number: 7 },
    { word: "eight", number: 8 },
    { word: "nine", number: 9 },
]
function isolateNumbers(arr) {
    const numMatrix = []
    for (let line of arr) {
        const num = []
        for (const number of NUMBERS) {
            line = line.replaceAll(number.word, number.number)
        }
        for (let i = 0; i < line.length; i++) {
            //lettera per lettera
            const char = line.at(i)
            if (!isNaN(char)) {
            //e' un numero
                num.push(char)
            } 

        }

        numMatrix.push(num)
    }
    return numMatrix
}
function getFirstAndLast(arr) {
    return [arr[0], arr[arr.length - 1]]
}

const matrix = isolateNumbers(lines)

function getTwoDigitNumber(line) {
    const firstAndLast = getFirstAndLast(line)
    const twoDigit = firstAndLast[0] + firstAndLast[1]
    return parseInt(twoDigit)
}

let final = 0
for (const line of matrix) {
    console.log(line, getTwoDigitNumber(line))
    if (isNaN(getTwoDigitNumber(line))) throw "WTF"
    final += getTwoDigitNumber(line)
}
console.log(final)

/* 
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?

Answer: 
 

Although it hasn't changed, you can still get your puzzle input.

You can also [Share] this puzzle.

*/
