import { getEffectForTargetByPrototype } from './track.ts'

export default function trigger(target, prototype) {
  let effects = getEffectForTargetByPrototype(target, prototype)
  effects.forEach(effect => effect())
}
