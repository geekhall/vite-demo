<template>
  <div class="center">
    <h1>Minesweeper Game</h1>

    <div v-for="(row, y) in state" :key="y">
      <button
        v-for="(item, x) in row"
        :key="x"
        class="box"
        @click="onClickBox(x, y)"
      >
        {{ item.mine ? 'X' : item.adjacentMines }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { update } from 'lodash'
import { reactive } from 'vue'

interface BlockState {
  x: number
  y: number
  revealed?: boolean
  mine?: boolean
  flagged?: boolean
  adjacentMines: number
}
const WIDTH = 10
const HEIGHT = 10

const state = reactive(
  Array.from({ length: WIDTH }, (_, y) =>
    Array.from(
      { length: HEIGHT },
      (_, x): BlockState =>
        <BlockState>{
          x,
          y,
          adjacentMines: 0
        }
    )
  )
)

function onClickBox(x: number, y: number) {
  console.log(`clicked at ${x}, ${y}`)
}

function generateMines() {
  for (const row of state) {
    for (const block of row) {
      block.mine = Math.random() < 0.1
    }
  }
}

const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1]
]

function updateNumbers() {
  state.forEach((raw, y) => {
    raw.forEach((block, x) => {
      if (block.mine) {
        return
      }
      directions.forEach(([dx, dy]) => {
        const x2 = x + dx
        const y2 = y + dy
        if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT) {
          return
        }
        if (state[y2][x2].mine) {
          block.adjacentMines += 1
        }
      })
    })
  })
  // for (const row of state) {
  //   for (const block of row) {
  //     if (block.mine) {
  //       continue
  //     }
  //     block.adjacentMines = 0
  //   }
  // }
}

generateMines()
updateNumbers()
</script>

<style lang="less" scoped>
.box {
  width: 40px;
  height: 40px;
  border: 1px solid;
  margin: 1px;
  background-color: gray;
}
.box:hover {
  background-color: lightgray;
}
.center {
  align: center;
}
</style>
