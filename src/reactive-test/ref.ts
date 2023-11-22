import track from './track'
import trigger from './trriger';

export default function ref(value) {
  let newObj = {
    value
  }
  return new Proxy(newObj, {
    get(target, prototype) {
      track(target, 'value')
      return target[prototype]
    },
    set(target, prototype, newValue) {
      target[prototype] = newValue
      trigger(target, prototype)
      return true
    }
  })
}
