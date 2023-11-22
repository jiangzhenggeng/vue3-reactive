<template>
  <div>
    测试A
    <div @click="testA">{{ a }}</div>
    <div @click="testAA">{{ a }}</div>
  </div>
  <div>
    <div>测试B</div>
    b：
    <div @click="testB">{{ b }}</div>
    b.bb：
    <div @click="testBB">{{ b.bb }}</div>
  </div>
</template>
<script lang="ts">
import { ref, Ref, toRef, toRefs, reactive } from 'vue'

export default {
  data() {
    return {
      a: 1,
      b: {
        bb: 2
      }
    }
  },
  methods: {
    testA() {
      this.a = Math.random()
    },
    testAA() {
      let a = this.a
      a = Math.random()
    },
    testB() {
      this.b.bb = Math.random()
    },
    testBB() {
      let b = this.b
      let bb = b.bb
      // b = Math.random()

      // b.bb = Math.random()
      bb = Math.random()
    }
  }
}
</script>
