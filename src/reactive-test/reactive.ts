import track from './track'
import trigger from './trriger';

export default function reactive(obj) {
  return new Proxy(obj, {
    get(target, prototype, receiver) {
      track(target, prototype)
      let res = Reflect.get(target, prototype, receiver)
      if (res !== null && typeof res === 'object') {
        return reactive(res)
      }
      return target[prototype]
    },
    set(target, prototype, newValue) {
      target[prototype] = newValue
      trigger(target, prototype)
      return true
    }
  })
}
