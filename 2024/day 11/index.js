/* 

// - if 0 => 1
- if %2 => half and half
- else *2024

*/

const input = `5 62914 65 972 0 805922 6521 1639064`

const arr = input.split(" ")
let map = new Map()

for (const num of arr) {
    map.set(num, (map.get(num) || 0) + 1)
}
const blink = () => {
    const final = new Map()

    for (const [num, count] of map) {

// const num = arr[i]
        if (num == 0) {
            // final[i] = 1
            final.set("1", (final.get("1") || 0) + count)
        } else if (num.length % 2 === 0) {
            let half = parseInt(num.slice(0, num.length / 2))
            let shalf = parseInt(num.slice(num.length / 2))
            final.set(half.toString(), (final.get(half.toString()) || 0) + count)
            final.set(shalf.toString(), (final.get(shalf.toString()) || 0) + count)

            // final[i] = `${half}/${shalf}`
        } else {
            const res = num * 2024
            final.set(res.toString(), (final.get(res.toString()) || 0) + count)

        }
    }
    map = final
}

for (let i = 0; i < 75; i++) {
    blink()
}

console.log("Result:", [...map.values()].reduce((acc, value) => acc + value, 0))


// console.log("FINAL", tot)


