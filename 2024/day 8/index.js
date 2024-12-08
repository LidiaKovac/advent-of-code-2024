// const input = `............
// ........0...
// .....0......
// .......0....
// ....0.......
// ......A.....
// ............
// ............
// ........A...
// .........A..
// ............
// ............`

import { getMatrixFromString } from "../utils/index.js"

/* 
TODO: findFrequency
TODO: isAntinode => case sensitive
Each antenna is tuned to a specific frequency indicated 
by a single lowercase letter, uppercase letter, or digit. 
You create a map (your puzzle input) of these antennas. 
For example: 
The signal only applies its nefarious effect at specific 
antinodes based on the resonant frequencies of the antennas. 
In particular, an antinode occurs at any point that is perfectly 
in line with two antennas of the same frequency - but only when 
one of the antennas is twice as far away as the other. 
This means that for any pair of antennas with the same frequency, 
there are two antinodes, one on either side of them.

So, for these two antennas with frequency a, they create the two 
antinodes marked with #:

......#....#
...#....0...
.....0......
..#....0....
....0....#..
......@.....
............
............
........A...
.........A..
............
............


......#....#
...#....0...
....#0....#.
..#....0....
....0....#..
.#....A.....
...#........
#......#....
........A...
.........A..
..........#.
..........#.

*/
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
// const input = `
// ............
// ........0...
// .....0......
// .......0....
// ....0.......
// ......A.....
// ............
// ............
// ........A...
// .........A..
// ............
// ............`
const input = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")

const antennas = []
const findAntinodes = (mtrx) => {
  for (let y = 0; y < mtrx.length; y++) {
    const row = mtrx[y]
    for (let x = 0; x < mtrx.length; x++) {
      const el = mtrx[y][x]
      if (el !== "." && el !== "#") {
        //isAntenna
        antennas.push({
          key: el,
          coords: [y, x],
        })
      }
    }
  }
  console.log(antennas)
  const pairs = new Map()
  // key, value
  for (const { key: pk, coords: pc } of antennas) {
    console.log("Currently checking: ", pk, pc, "against all other antennas")
    for (const { key: sk, coords: sc } of antennas) {
      if (sk !== pk) {
        // console.log("Not a pair")
        continue
      }
      //prende la prima antenna
      const prevCoords = pairs.get(pk)
      //check se nella map si trova gia' quell'antenna
      if (prevCoords && prevCoords.firstCoords.length > 0) {
        if (
          prevCoords.firstCoords[0] === sc[0] &&
          prevCoords.firstCoords[1] === sc[1]
        ) {
          continue
        }
        console.log("'" + pk + "'", " was already in the map")
        pairs.set(pk, calcCoordDiff(prevCoords.firstCoords, sc))
        console.log("Calculated diff: ", pairs.get(pk))
        //   }
        console.log("Writing antenodes")
        mtrx = writeAntenodes(pairs.get(pk), mtrx)
        pairs.set(pk, {
          firstCoords: pc, //!
          secondCoords: [],
          diff: [],
        })
      } else {
        console.log("Adding antenna to map")
        pairs.set(pk, { firstCoords: pc, secondCoords: [], diff: [] })
      }
    }
  }
  console.log(pairs)

  console.log(mtrx.map((r) => r.join("")).join("\n") + "\n")
  //   console.log(mtrx)
  return mtrx.map((r) => r.join("")).join("\n") + "\n"
}

const writeAntenodes = (coords, mtrx) => {
  const {
    firstCoords: [fy, fx],
    secondCoords: [sy, sx],
    diff: [y, x],
  } = coords
  const nyp = sy + y
  const nxp = sx + x
  console.log(nyp, nxp, mtrx[0].length)
  if (nyp < mtrx.length && nxp < mtrx[0].length && nyp >= 0 && nxp >= 0) {
    mtrx[nyp][nxp] = "#"
  }
  const nyn = fy - y
  const nxn = fx - x
  if (nyn < mtrx.length && nxn < mtrx[0].length && nyn >= 0 && nxn >= 0) {
    mtrx[nyn][nxn] = "#"
  }
  return mtrx
}

const calcCoordDiff = ([fy, fx], [sy, sx]) => {
  console.log("Checking ", [fy, fx], "with", [sy, sx])
  return {
    firstCoords: [fy, fx],
    secondCoords: [sy, sx],
    diff: [sy - fy, sx - fx],
  }
}

const matrix = getMatrixFromString(input)
const str = findAntinodes(matrix)

writeFileSync(join(import.meta.dirname, "./output.txt"), str)
console.log([...str.matchAll(new RegExp("\\#", "g"))].length)
