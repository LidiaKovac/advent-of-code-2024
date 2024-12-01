/* The Elves resume water filtering operations! Clean water starts flowing over the edge of Island Island.

They offer to help you go over the edge of Island Island, too! 
Just hold on tight to one end of this impossibly long rope and they'll lower you down a safe distance 
from the massive waterfall you just created.

As you finally reach Snow Island, you see that the water isn't really reaching the ground: 
it's being absorbed by the air itself. It looks like you'll finally have a little downtime while the moisture 
builds up to snow-producing levels. Snow Island is pretty scenic, even without any snow; why not take a walk?

There's a map of nearby hiking trails (your puzzle input) 
that indicates paths (.), forest (#), and steep slopes (^, >, v, and <).

For example:

#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#

You're currently on the single path tile in the top row; 
your goal is to reach the single path tile in the bottom row.
Because of all the mist from the waterfall, the slopes are 
probably quite icy; if you step onto a slope tile, your next 
step must be downhill (in the direction the arrow is pointing). 
To make sure you have the most scenic hike possible, never step onto the same tile twice. 
What is the longest hike you can take?

In the example above, the longest hike you can take is marked with O, and your starting position is marked S:

#S#####################
#OOOOOOO#########...###
#######O#########.#.###
###OOOOO#OOO >.###.#.###
###O#####O#O#.###.#.###
###OOOOO#O#O#.....#...#
###v###O#O#O#########.#
###...#O#O#OOOOOOO#...#
#####.#O#O#######O#.###
#.....#O#O#OOOOOOO#...#
#.#####O#O#O#########v#
#.#...#OOO#OOO###OOOOO#
#.#.#v#######O###O###O#
#...#.>.#...> OOO#O###O#
#####v#.#.###v#O#O###O#
#.....#...#...#O#O#OOO#
#.#########.###O#O#O###
#...###...#...#OOO#O###
###.###.#.###v#####O###
#...#...#.#.>.>.#.> O###
#.###.###.#.###.#.#O###
#.....###...###...#OOO#
#####################O#
This hike contains 94 steps. (The other possible hikes you could have taken were 90, 86, 82, 82, and 74 steps long.)

Find the longest hike you can take through the hiking trails listed on your map.How many steps long is the longest hike ?*/

// import { readFileSync } from "fs"
// import { join } from "path"

// const txt = readFileSync(join(import.meta.dirname, "./input.txt"), "utf-8")
// const lines = txt.split("\n")

const txt = `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`

const matrix = txt.split("\n").map((line) => line.split(""))

const isPath = (char) => char === "."
const isForest = (char) => char === "#"
const isSlope = (char) =>
    char === "^" || char === ">" || char === "<" || char === "v"
const getRight = (mtrx, y, x) => {
    if (x >= mtrx[y].length - 1) {
        return null
    } else return mtrx[y][x + 1]
}
const getLeft = (mtrx, y, x) => {
    if (x === 0) {
        return null
    } else return mtrx[y][x - 1]
}
const getTop = (mtrx, y, x) => {
    if (y === 0) {
        return null
    } else return mtrx[y - 1][x]
}
const getBottom = (mtrx, y, x) => {
    if (y >= mtrx.length - 1) {
        return null
    } else return mtrx[y + 1][x]
}

const getSurrounding = (mtrx, y, x) => {
    // return {
    //     top: getTop(mtrx, y, x),
    //     bottom: getBottom(mtrx, y, x),
    //     left: getLeft(mtrx, y, x),
    //     right: getRight(mtrx, y, x)
    // }
    return [
        getRight(mtrx, y, x),
        getBottom(mtrx, y, x),
        getLeft(mtrx, y, x),
        getTop(mtrx, y, x),
    ]
}
console.log(matrix)
for (let y = 0; y < matrix.length; y++) {
    const line = matrix[y]
    const nextLine = matrix[y + 1]
    for (let x = 0; x < line.length; x++) {
        const col = matrix[y][x]
        if (isPath(col)) {
            console.log(col, y, x)
            // isPath(col) ? matrix[y][x] = "O" : null

            const surrounding = getSurrounding(matrix, y, x)
            const pathIndex = surrounding.findIndex((char) => isPath(char))
            if (isPath(getRight(matrix, y, x))) {
                matrix[y][x] = "O"
                continue
            }
            if (isPath(getBottom(matrix, y, x))) {
                matrix[y][x] = "O"
                matrix[y + 1][x] = "O"
                y++
            }
            if (isPath(getLeft(matrix, y, x))) {
                matrix[y][x] = "O"
                matrix[y][x - 1] = "O"
                x--
            }
        }
    }
}

console.log(matrix.map((line) => line.join("")).join("\n"))
