import track from './track.ts';
import trigger from './trigger.ts';

export default function ref(value) {
  let wrapValue = {
    get value() {
      track(wrapValue, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(wrapValue, 'value')
    }
  }

  return wrapValue
}
