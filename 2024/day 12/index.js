/* 

AAAA
BBCD
BBCC
EEEC

!AREA => numero di plot per regione (gruppi di lettere / piante)
Nell'esempio: 
    A => area di 4, 
    B=> area di 4 
    C => area di quattro, 
    D => area di 1
    E => area di 3

!PERIMETRO: numero di lati che non toccano plots della stessa pianta (?)
+-----+
|OOOOO|
|OXOXO|
|OOOOO|
|OXOXO|
|OOOOO|
+-----+
Nell'esempio
    Le X => perimetro di 4
    Le O => perimetro esterno di 20 + perimetro intorno alle X (4 * ogni x = 16) => TOT 36

!PREZZO per regione => area * perimetro 
+-+-+-+-+
|A A A A|
+-+-+-+-+     +-+
              |D|
+-+-+   +-+   +-+
|B B|   |C|
+   +   + +-+
|B B|   |C C|
+-+-+   +-+ +
          |C|
+-+-+-+   +-+
|E E E|
+-+-+-+

Area di A => 4
Perimetro di A => 10
Prezzo => 4 * 10

+-----+
|OOOOO|
|OXOXO|
|OOOOO|
|OXOXO|
|OOOOO|
+-----+

Prezzo di O => 36 * 21 (perimetro = numero di O)
Prezzo di X => ognuna prezzo di 1 * 4

Totale di tutto il giardino = (36 * 21) + (1*4) * 4 = 772

Input 

*/

/* 

A region of R plants with price 12 * 18 = 216.
A region of I plants with price 4 * 8 = 32.
A region of C plants with price 14 * 28 = 392.
A region of F plants with price 10 * 18 = 180.
A region of V plants with price 13 * 20 = 260.
A region of J plants with price 11 * 20 = 220.
A region of C plants with price 1 * 4 = 4.
A region of E plants with price 13 * 18 = 234.
A region of I plants with price 14 * 22 = 308.
A region of M plants with price 5 * 12 = 60.
A region of S plants with price 3 * 8 = 24.

  0123456789
0 RRRRIICCFF
1 RRRRIICCCF
2 VVRRRCCFFF
3 VVRCCCJFFF
4 VVVVCJJCFE
5 VVIVCCJJEE
6 VVIIICJJEE
7 MIIIIIJJEE
8 MIIISIJEEE
9 MMMISSJEEE


TODO: calcPerimeter
TODO: calcArea
TODO: calcPrice
*/
import { getMatrixFromString, getDirections } from "../utils/index.js"
const input = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`

const matrix = getMatrixFromString(input)

const adjecencyList = []

for (let y = 0; y < matrix.length; y++) {
  const row = matrix[y]
  for (let x = 0; x < matrix[y].length; x++) {
    const col = matrix[y][x]
    const [top, bottom, left, right] = getDirections(matrix, y, x)
    adjecencyList.push({
      node: matrix[y][x],
      coords: { y, x },
      adj: [
        { dir: "top", node: top, coords: { y: y - 1, x } },
        { dir: "bottom", node: bottom, coords: { y: y + 1, x } },
        { dir: "left", node: left, coords: { y, x: x - 1 } },
        { dir: "right", node: left, coords: { y, x: x + 1 } },
      ],
    })
  }
}
const availableLetters = new Set(adjecencyList.map((node) => node.node))

// console.log(availableLetters)
const groups = []
const getRecursiveAdj = (adj, i, group = new Set()) => {
  if (!adj) {
    return group
  }
  const { y: oy, x: ox } = adj.coords
  group.add(`${oy}/${ox}`)
  //   console.log(adj)
  const allAdj = adj.adj.filter((el) => el.node === adj.node)
  if (allAdj.length > 0) {
    console.log("Found matching in adj", allAdj)
    for (const {
      coords: { y, x },
    } of allAdj) {
      group.add(`${y}/${x}`)
    }
    getRecursiveAdj(adjecencyList[i + 1], i + 1, group)
  } else {
    console.log("No adjecency found")
    groups.push(group)
  }

  return group
}

// for (let i = 0; i < adjecencyList.length; i++) {
getRecursiveAdj(adjecencyList[0], 0)
// }

console.log(groups)

console.log(adjecencyList)

// const findNextPlant = (mtrx, cy, cx, plant) => {
//     for (let y = cy; y < mtrx.length; y++) {
//         // console.log("Row", y)
//         for (let x = 0; x < mtrx[y].length; x++) {
//             console.log("Looking for next in coords", y, x)
//             console.log("Content is:", mtrx[y][x])
//             console.log("Conditions: ", x === cx, y === cy)
//             if (y === cy && x < cx) {
//                 // se la riga e' la stessa
//                 //ma la x e' minore
//                 console.log("Skipping")
//                 continue

//             }
//             if (x === cx && y === cy) {
//                 console.log("Skipping bc of coords");
//                 continue
//             }
//             if (mtrx[y][x] === plant) {
//                 console.log("next found at", y, x)
//                 return { y, x }
//             }
//         }
//         console.log("Nothing found in row", y)
//     }
//     return false
// }

// const isAdj = (mtrx, y, x, ny, nx) => {
//     // console.log(`Diff 1: ${oy}-${ny}`, oy - ny)
//     // console.log(`Diff 2: ${ox}-${nx}`, ox - nx)
//     const rowIsAdj = Math.abs(y - ny) <= 1
//     const colIsAdj = Math.abs(x - nx) <= 1
//     if (y === ny && x === nx) {
//         //same coords, not adj
//         console.log("Coords are equal")
//         return false
//     }
//     const directions = getDirections(mtrx, y, x)
//     const nextDirections = getDirections(mtrx, y, x)
//     //check surroundings
//     if (directions.every(el => el !== mtrx[y][x]) || nextDirections.every(el => el !== mtrx[y][x])) {
//         console.log("No surrounding item was found", directions)
//         // return false
//         const next = findNextPlant(mtrx, ny, nx, mtrx[ny][nx])
//         console.log("Moving to next...", ny, nx)
//         if (next) isAdj(mtrx, ny, nx, next.y, next.x)
//     }
//     if ((rowIsAdj && colIsAdj)) {
//         console.log("Coords", y, x, "and", ny, nx, "are okay for case 1")
//         // console.log("is adj")
//         /*Easiest cases,
//         row and columns are adj
//         AAA => col is same, but row is adj
//         AAA
//         BBA => row is not same, but col is
//         */
//         return true
//     }
//     /*
//     Missing cases:
//     AAA
//     ABB => checking from 0 2 to 1 0 => should actually check 0 0 with 1 0

//     AAA
//    AABB => should check if next is adj
//     */
//     console.log("FINDING NEXT")
//     const next = findNextPlant(mtrx, ny, nx, mtrx[ny][nx])
//     //if not easiest case, check if next
//     if (next) {
//         const { y: nny, x: nnx } = next

//         if (mtrx[nny][nnx] === mtrx[ny][nx]) {
//             //il prossimo elemento (dopo quello controllato) e' uguale a quello corrente
//             /* es. AAA
//                   AABB
//                   ^^
//                    questo
//             */
//             console.log("RECURSING FOR", nny, nnx, ny, nx)
//             //controlliamo il prossimo elemento con quello dopo ancora
//             return isAdj(mtrx, ny, nx, nny, nnx)
//         }
//     } else return false
//     /*
//           0123456789
//         0 RRRRIICCFF
//         1 RRRRIICCCF
//         2 VVRRRCCFFF
//         3 VVRCCCJFFF
//         4 VVVVCJJCFE
//         5 VVIVCCJJEE
//         6 VVIIICJJEE
//         7 MIIIIIJJEE
//         8 MIIISIJEEE
//         9 MMMISSJEEE

//     */

// }

// const letters = []
// const plots = []
// const findByLetters = () => {
//     const visited = new Array(matrix.length).fill(new Array(matrix[0].length).fill(0))
//     console.log(visited)
//     for (let y = 0; y < matrix.length; y++) {
//         const row = matrix[y];
//         for (let x = 0; x < matrix[y].length; x++) {

//         }
//     }
// }
// findByLetters()

// const findAllAdj = (mtrx, y, x, group = []) => {
//     const next = findNextPlant(mtrx, y, x, mtrx[y][x])
//     console.log("Next", next)
//     if (!next) {
//         console.log('exiting')
//         return group
//     }
//     if (group.length === 0) group.push({ y, x })
//     console.log("Checking adj", y, x, "with", next.y, next.x)
//     // console.log("Is", y, x, "adj with", next.y, next.x, isAdj(mtrx, y, x, next.y, next.x))
//     if (next && isAdj(mtrx, y, x, next.y, next.x)) {
//         // console.log("Checking")
//         group.push({ y: next.y, x: next.x })
//         console.log(group)
//         findAllAdj(mtrx, next.y, next.x, group)
//     }
//     return group
// }
