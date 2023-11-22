import track from './track'
import trigger from './trriger';

export default function ref(value) {
  let newObj = {
    value
  }
  return new Proxy(newObj, {
    get(target, prototype) {
      track(newObj, 'value')
      return newObj.value
    },
    set(target, prototype, newValue) {
      target[prototype] = newValue
      trigger(target, prototype)
      return true
    }
  })
}
