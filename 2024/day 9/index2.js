import { readFileSync } from "fs"
import { join } from "path"

function parseInput(input) {
  const files = []
  const spaces = []

  // Parse input, allowing for multi-digit IDs
  for (let i = 0; i < input.length; i++) {
    const num = parseInt(input[i])
    if (i % 2 === 0) {
      files.push({ length: num, id: files.length })
    } else {
      spaces.push(num)
    }
  }

  return { files, spaces }
}

function compactDisk(files, spaces) {
  // Create initial disk representation
  let disk = []

  files.forEach((file, index) => {
    // Add file blocks
    disk.push(...Array(file.length).fill(file.id))

    // Add space blocks if not the last file
    if (index < spaces.length) {
      disk.push(...Array(spaces[index]).fill(null))
    }
  })

  // Compact the disk
  for (let i = 0; i < disk.length; i++) {
    const freeSpaceIndex = disk.indexOf(null)
    if (freeSpaceIndex === -1) break

    // Find the rightmost non-null block
    const lastBlockIndex = disk.lastIndexOf(
      disk.findLast((block) => block !== null)
    )

    // Move the last block to the first free space
    disk[freeSpaceIndex] = disk[lastBlockIndex]
    disk[lastBlockIndex] = null
  }

  return disk
}

function calculateChecksum(disk) {
  return disk.reduce((sum, block, index) => {
    // Skip null (free space) blocks
    if (block === null) return sum

    // Multiply block's file ID by its position
    return sum + block * index
  }, 0)
}

function solve(input) {
  const { files, spaces } = parseInput(input)
  const compactedDisk = compactDisk(files, spaces)
  const checksum = calculateChecksum(compactedDisk)

  console.log("Compacted Disk:", compactedDisk)
  console.log("Filesystem Checksum:", checksum)

  return checksum
}

// Read input from file
const input = readFileSync(
  join(import.meta.dirname, "./input.txt"),
  "utf-8"
).trim()
solve(input)
