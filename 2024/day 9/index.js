import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
// const input = `2333133121414131402`
const input = readFileSync(
  join(import.meta.dirname, "./input.txt"),
  "utf-8"
).trim()
const map = new Map()
//          id / {repeat: y, space: x}

const parseInput = (str) => {
  let id = 0
  for (let i = 0; i < str.length; i++) {
    const num = parseInt(str.at(i))
    if (i % 2 === 0) {
      map.set(id, { repeat: num, ...map.get(id) })
      id++
      //even numbers or 0, files
    } else {
      map.set(id - 1, { ...map.get(id - 1), space: num })
      //odd numbers, spaces
    }
  }

  writeFileSync(
    join(import.meta.dirname, "./output.txt"),
    getStringFromMap(map)
  )
  return getStringFromMap(map)
}

const getStringFromMap = (map) => {
  let mapOutput = ""
  map.forEach((value, key) => {
    mapOutput +=
      (key.toString() + "/").repeat(value.repeat) + ".".repeat(value.space)
  })
  return mapOutput
}

const findId = (str, prev, i = 0) => {
  let id = ""
  if (str[i] === ".") return "."
  if (str[i] === "/") return null
  if (prev === "/" || prev === ".") {
    id = str.slice(i).split("/")[0].replaceAll(".", "")
  } else {
    id = findId(str, str.at(i - 2), i - 1)
  }
  return id
}

const sortInput = (str) => {
  const amountOfPoints = [...str.matchAll(new RegExp("\\.", "g"))].length
  const ids = []
  const idCopy = []
  for (let i = 0; i <= str.length; i++) {
    // console.log("Looking for ids...", i, "out of ", str.length)
    const id = findId(str, str.at(i - 1), i)
    if (id) {
      idCopy.push(id)
      ids.push(id)
    }
  }
  const total = idCopy.length - amountOfPoints
  let arr = []
  //   console.log(idCopy)
  for (let i = 0; i < total; i++) {
    let char = idCopy[i]

    if (char === ".") {
      //needs filling
      //   console.log("Sorting...", i, "out of ", total)

      const lastID = idCopy.findLast((el) => el !== ".")
      const lastIDIndex = idCopy.lastIndexOf(lastID)
      idCopy[i] = lastID
      idCopy[lastIDIndex] = "."
      ids.pop()
    } else {
      arr.push(char)
    }
  }
  writeFileSync(join(import.meta.dirname, "./output.txt"), idCopy.join(""))
  return idCopy
}
const calcChecksum = (arr) => {
  console.log(arr)
  console.log("Calc")
  let tot = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ".") {
      continue
    }
    const num = parseInt(arr[i])

    tot += num * i
  }
  console.log(tot)
  return tot
}

const sorted = sortInput(parseInput(input))
calcChecksum(sorted)
