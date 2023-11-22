import watchEffect from './watchEffect.ts'
import watch from './watch.ts'
import ref from './ref.ts'
import computed from './computed.ts';
import reactive from './reactive.ts';

let a = ref(0)
let b = ref(0)
let c = reactive({
  a: 0
})
let newValue = computed(() => a.value + b.value + c.a)
watchEffect(() => {
  console.log('watchEffect', newValue.value)
})
let stop = watch(() => newValue.value + a.value + b.value + c.a, (val, old) => {
  console.log('watch', val, old)
}, {
  immediate: true
})

setTimeout(() => {
  a.value = 1
  stop()
  setTimeout(() => {
    b.value = 1
    setTimeout(() => {
      c.a = 1
    }, 1000)
  }, 1000)
}, 1000)



