import track from './track.ts';

export default function computed(fn) {
  let wrapValue = {
    get value() {
      track(wrapValue, 'value')
      return fn()
    }
  }
  return wrapValue
}
