import track from './track'

export default function computed(fn) {
  let obj = {
    get value() {
      track(obj, 'value')
      return fn()
    }
  }
  return obj
}
