<template>
  <div @click="data.title = Math.random()">{{ title }}</div>
  <div>{{ table.bg }}</div>
  <hr />
  <h1>sub</h1>
  <sub-component
    :title="data.title"
    :title2="title"
  />
  <hr />
  <app2 />
</template>
<script lang="ts">
import { ref, Ref, toRef, toRefs, reactive } from 'vue'
import SubComponent from './sub.vue'
import App2 from './App2.vue'

export default {
  components: {
    SubComponent,
    App2
  },
  setup() {
    let data = reactive({
      title: {
        c: 'sdsds'
      },
      table: {
        bg: 'sdbdf',
        list: [1, 2]
      }
    })
    let title = toRef(data, 'title')
    return {
      data,
      title,
      table: data.table
    }
  }
}
</script>
