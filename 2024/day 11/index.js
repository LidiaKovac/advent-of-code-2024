/* 

// - if 0 => 1
- if %2 => half and half
- else *2024

*/

const input = `125 17`

const arr = input.split(" ")
const blink = (arr) => {
    const final = []
    for (let i = 0; i < arr.length; i++) {
        const num = arr[i]
        if (num == 0) {
            final[i] = 1
        } else if (num.length % 2 === 0) {
            let half = parseInt(num.slice(0, num.length / 2))
            let shalf = parseInt(num.slice(num.length / 2))

            final[i] = `${half}/${shalf}`
        } else {
            final[i] = num * 2024
        }
    }
    return final.map(num => num.toString().split("/")).flat()
}
let fin = []

for (let i = 0; i < 24; i++) {
    if (fin.length === 0) fin = blink(arr)
    fin = blink(fin)
    console.log(fin)
}

console.log("FINAL", fin.length)


