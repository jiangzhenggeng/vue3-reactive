import watchEffect from './watchEffect.ts'

export default function watch(fn, callback, options = {}) {
  let newValue, oldValue
  let isFirst = true

  let { immediate } = options || {}
  watchEffect(() => {
    oldValue = newValue
    newValue = fn()
    if (isFirst) {
      if (immediate) {
        callback(newValue, oldValue)
      }
    } else {
      callback(newValue, oldValue)
    }
    isFirst = false
  })

  return () => {

  }
}
