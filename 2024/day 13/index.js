/* 


buttons to control the claw, these machines have 
two buttons labeled 
         A and B. 
it costs 3 tokens to push the A button and 
         1 token to push the B button.

buttons are configured to move the claw a specific amount 
Each machine contains one prize; to win the prize, 
the claw must be positioned exactly above the prize 
on both the X and Y axes.

Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279

Pushing the machine's A button would move the 
claw 94 units along the X axis and 34 units along the Y axis.
Pushing the B button would move the 
claw 22 units along the X axis and 67 units along the Y axis.

The prize is located at X=8400, Y=5400; 

The cheapest way to win the prize is by 
    pushing the A button 80 times and 
    the B button 40 times. 
    
This would line up the claw along the X axis 
    (because 80*94 + 40*22 = 8400) and along the 
    Y axis (because 80*34 + 40*67 = 5400). 
    
    Doing this would cost 80*3 tokens for the A presses and 
    40*1 for the B presses, a total of 280 tokens.


*/
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")
const getXandYFromInstructions = (str) => {
  console.log("String", str)
  if (str.includes("X+")) {
    return {
      x: str.split("X+")[1].split(",")[0],
      y: str.split("Y+")[1].split(",")[0],
    }
  } else {
    return {
      x: str.split("X=")[1].split(",")[0],
      y: str.split("Y=")[1].split(",")[0],
    }
  }
}
// writeFileSync(join(import.meta.dirname, "./output.txt"), "")

const machines = input
  .split("\n\n")
  .filter((str) => str && str.length > 0)
  .map((str) => str.split("\n"))
  .map((machine) => ({
    a: getXandYFromInstructions(machine[0]),
    b: getXandYFromInstructions(machine[1]),
    prize: getXandYFromInstructions(machine[2]),
  }))
const prizes = []
for (const machine of machines) {
  const ax = machine.a.x
  const bx = machine.b.x

  const ay = machine.a.y
  const by = machine.b.y

  let resx = 0
  let tokenA = 0
  let resy = 0
  let tokenB = 0
  for (let multa = 0; multa <= 100; multa++) {
    for (let multb = 0; multb <= 100; multb++) {
      const mult1 = multa * ax
      const mult2 = multb * bx
      const multy1 = multa * ay
      const multy2 = multb * by
      if (resx !== machine.prize.x) {
        resx = mult1 + mult2
        tokenA = multa
      }
      if (resy !== machine.prize.t) {
        resy = multy1 + multy2
        tokenB = multb
      }
      // const t = readFileSync(join(import.meta.dirname, "./output.txt"), "utf-8")
      // writeFileSync(
      //   join(import.meta.dirname, "./output.txt"),
      //   t +
      //     "\n" +
      //     `
      //     ${multa} * ${ax} = ${mult1}
      //     ${multb} * ${bx} = ${mult2}
      //     ${mult1} + ${mult2} = ${res} === ${machine.prize.x}`
      // )
      if (resx == machine.prize.x && resy == machine.prize.y) {
        prizes.push({ a: tokenA, b: tokenB })
        break
      }
    }
    if (resx == machine.prize.x && resy == machine.prize.y) {
      console.log("Found")
      //   prizes.push({ a: tokenA, b: tokenB })
      break
    }
  }
}
console.log(prizes)
let tot = 0
for (const prize of prizes) {
  tot += prize.a * 3 + prize.b * 1
}

console.log(tot)
