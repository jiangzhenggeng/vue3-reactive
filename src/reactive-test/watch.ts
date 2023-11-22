import watchEffect from './watchEffect.ts'

export default function watch(source, callback, options = {}) {
  let newValue, oldValue
  let isFirst = true

  let { immediate } = options || {}
  watchEffect(() => {
    oldValue = newValue
    newValue = source()
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
