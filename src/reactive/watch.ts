import watchEffect from './watchEffect.ts'

export default function watch(source, callback, options: { immediate?: boolean } = {}) {
  let getter = () => void 0;
  if (typeof source === 'function') {
    getter = () => source()
  } else {
    getter = () => source.value
  }
  let immediate = options?.immediate
  let first = true
  let old = void 0;
  watchEffect(() => {
    let val = getter()
    if (first) {
      immediate && callback(val, old)
    } else {
      callback(val, old)
    }
    old = val
    first = false
  })

  return () => {

  }
}
