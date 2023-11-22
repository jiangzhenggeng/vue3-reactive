import track from './track.ts';
import trigger from './trigger.ts';

export default function reactive(target) {
  let proxy = new Proxy(target, {
    get(target, key, receiver) {
      track(target, key)
      let res = Reflect.get(target, key, receiver)
      if (res !== null && typeof res === 'object') {
        return reactive(res)
      }
      return res
    },
    set(target, key, newValue, receiver) {
      target[key] = newValue
      trigger(target, key)
      return true
    }
  })
  return proxy
}
