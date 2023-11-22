// import { ref, reactive, computed, watchEffect, watch } from 'vue'
import ref from './ref.ts'
import watchEffect from './watchEffect.ts'
import reactive from './reactive.ts'
import computed from './computed.ts'
import watch from './watch.ts'

// 0.封装ref
// let a = ref(0)
// console.log('ref：', a)
// setTimeout(() => {
//   a.value = 1
// }, 1000)

// // 1.测试ref响应
// let a = ref(0)
// watchEffect(() => {
//   console.log('watchEffect：a变化了', a.value)
// })
// setTimeout(() => {
//   a.value = 1
// }, 1000)


// 2.测试reactive
// let b = reactive({
//   v: 0
// })
// watchEffect(() => {
//   console.log('watchEffect：b.v的值变化了', b.v)
// })
// setTimeout(() => {
//   b.v = 1
// }, 1000)

// // 3.测试computed
// let a = ref(0)
// let b = reactive({
//   v: 0
// })
// let c = computed(() => a.value + b.v)
// watchEffect(() => {
//   console.log('watchEffect：c的值变化了', c.value)
// })
// setTimeout(() => {
//   a.value = 1
//   setTimeout(() => {
//     b.v = 1
//   }, 1000)
// }, 1000)

// // 4.测试watch
let a = ref(0)
let b = reactive({
  v: 0
})
let c = computed(() => a.value + b.v)
watch(() => a.value + b.v + c.value, (val, old) => {
  console.log(`watch监听函数值变化了：新值：${ val }，旧值：${ old }`)
}, {
  immediate: false
})

setTimeout(() => {
  a.value = 1
  setTimeout(() => {
    b.v = 1
  }, 1000)
}, 1000)



